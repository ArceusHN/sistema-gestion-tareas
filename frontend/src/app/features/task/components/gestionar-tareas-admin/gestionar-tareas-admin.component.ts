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
import { CreateTaskModel } from "../../models/create-task.model";
import notify from "devextreme/ui/notify";

@Component({
    selector: 'app-gestionar-tareas-admin-component',
    templateUrl: './gestionar-tareas-admin.component.html',
    styleUrls: ['./gestionar-tareas-admin.component.css'],
})

export class GestionarTareasAdminComponent implements OnInit{
    @ViewChild('tasksgrid', { static: false }) dataGrid: DxDataGridComponent;

    isAddTaskPopupVisible: boolean = false;
    taskStatusList: TaskStatusModel[];
    userList: User[];
    taskDataSource: TaskModel[];
    
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
        texts: {
            saveRowChanges: "Guardar",
            cancelRowChanges: "Cancelar",
            editRow: "Editar"
        }
      };

    constructor(private readonly taskService: TaskService,
                private readonly userService: UserService
    ){}
    
    ngOnInit(): void {
        this.getUsers();
        this.getTaskStatus();
        this.getTasks();
    }

    getUsers(): void{
        this.userService.getAll().subscribe({
            next: (data) => {
                this.userList = data;
            },
            error: (err) =>{

            }
        })
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
    
    getTasks(): void{
        this.taskService.getAll().subscribe({
            next: (data) => {
                this.taskDataSource = data;
            },
            error: (err) =>{

            }
        })
    }
    
    addTask = () => {
        this.isAddTaskPopupVisible = true;
    };
    
    onSaveTask(taskData: any) {
        this.isAddTaskPopupVisible = false;

        const createTask: CreateTaskModel = new CreateTaskModel()
        createTask.description = taskData.description;
        createTask.title = taskData.title;
        createTask.statusId = taskData.statusId;
        createTask.userId = taskData.userId;

        this.taskService.create(createTask).subscribe({
            next: (data) =>{
                notify(`${data.message ?? 'Tarea creada exitosamente'}`, 'success', 2000);
                this.refresh();
            },
            error: (err) =>{
                notify(`${err.error?.message ?? 'Ha ocurrido un error al crear la tarea'}` , 'error', 2000)
            }
        });
    }

    onCancel() {
        this.isAddTaskPopupVisible = false;
    }

    refresh = () => {
        this.getTasks();
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