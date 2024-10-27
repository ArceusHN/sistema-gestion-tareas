import { Component, OnInit, ViewChild } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { TaskModel } from "../../models/task.model";
import { TaskStatusModel } from "../../models/task-status.model";
import { GridsEditMode } from "devextreme-angular/common/grids";
import { UserService } from "src/app/shared/services/User.service";
import { User } from "src/app/shared/models/user.model";
import { DxDataGridComponent } from "devextreme-angular";
import { DxTextBoxTypes } from "devextreme-angular/ui/text-box";
import { exportDataGrid as exportToXLSX } from 'devextreme/excel_exporter';
import { Workbook } from "exceljs";
import { saveAs } from 'file-saver-es';
import notify from "devextreme/ui/notify";
import { UpdateStatusTaskModel } from "../../models/update-status-task.model";

@Component({
    selector: 'app-mis-tareas-admin-component',
    templateUrl: './mis-tareas-admin.component.html',
    styleUrls: ['./mis-tareas-admin.component.css'],
})

export class MisTareasComponent implements OnInit{
    @ViewChild('tasksgrid', { static: false }) dataGrid: DxDataGridComponent;

    taskStatusList: TaskStatusModel[];
    userList: User[];
    taskDataSource: TaskModel[];
    isWordWrapEnabled: boolean = false; 

    exportToXLSXButtonOptions = {
        text: 'Exportar a Excel',
        icon: 'exportxlsx',
        onClick: () => this.exportDataGridToXLSX(),
        stylingMode: 'text'
    };

    editingOptions = {
        mode: 'row' as GridsEditMode,
        allowUpdating: true,
        allowAdding: false,
        allowDeleting: false,
        texts: {
            saveRowChanges: "Guardar",
            cancelRowChanges: "Cancelar",
            editRow: "Editar",
        }
    };
    
    constructor(private readonly taskService: TaskService,
                private readonly userService: UserService
    ){}
    
    ngOnInit(): void {
        this.getTaskStatus();
        this.getTasksByUser();
    }

    getTaskStatus(): void{
        this.taskService.getAllTaskStatus().subscribe({
            next: (data) => {
                this.taskStatusList = data;
            },
            error: (err) =>{

            }
        })
    }
    
    getTasksByUser(): void{
        this.taskService.getByUser().subscribe({
            next: (data) => {
                this.taskDataSource = data;
            },
            error: (err) =>{

            }
        })
    }
    
    async onRowUpdating(event: any) {
        const updatedData = { ...event.oldData, ...event.newData };
        
        const updateStatusTask: UpdateStatusTaskModel = new UpdateStatusTaskModel();

        updateStatusTask.id = updatedData.id;
        updateStatusTask.status = updatedData.status;

        
        event.cancel = new Promise((resolve, reject) => {
            this.taskService.updateStatus(updateStatusTask).subscribe({
            next: (data) => {
                notify(`${data?.message ?? 'Tarea actualizada con éxito'}`, "success", 2000);
                this.refreshGridData();
                this.dataGrid.instance.cancelEditData();
                resolve(true);
            },
            error: (err) => {
                const errorMessage: string = err?.error?.message ?? "Error al actualizar la tarea";
                notify(errorMessage, "error", 2000);
                reject(false);
            },
            });
        });
    }
      
    refreshGridData = () => {
        this.getTasksByUser();
    };
    
    searchDataGridInputHandler = (e: DxTextBoxTypes.InputEvent) =>
        this.searchDataGrid(e.component.option('text'));

    searchDataGrid(text: string) {
        this.dataGrid.instance.searchByText(text);
    }

    exportDataGridToXLSX() {
        if (!this.dataGrid) {
            console.error("El componente DataGrid no está inicializado.");
            return;
        }

        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Tasks');

        exportToXLSX({
          component: this.dataGrid.instance,
          worksheet,
          autoFilterEnabled: true,
        }).then(() => {
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Tasks.xlsx');
          });
        });
    }
}