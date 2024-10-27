import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DxFormModule, DxLoadIndicatorModule, DxButtonModule, DxDataGridModule, DxDropDownButtonModule, DxSelectBoxModule, DxTextBoxModule, DxToolbarModule, DxTabsModule, DxPopupModule, DxValidatorModule, DxTextAreaModule } from "devextreme-angular";
import { LoginOauthModule } from "src/app/ui/components/library/login-oauth/login-oauth.component";
import { GestionarTareasAdminComponent } from "./components/gestionar-tareas-admin/gestionar-tareas-admin.component";
import { MisTareasComponent } from "./components/mis-tareas/mis-tareas-admin.component";
import { taskRoutes } from "./task.routing";
import { HttpClientModule } from "@angular/common/http";
import { StatusIndicatorModule } from "src/app/ui/components";
import { CardComponent } from "src/app/shared/components/card/card.component";
import { TaskAddPopupComponent } from "./components/gestionar-tareas-admin/task-add-popup/task-add-popup.component";

@NgModule({
    declarations: [
        GestionarTareasAdminComponent,
        MisTareasComponent,
        TaskAddPopupComponent
    ],
    imports: [
        CardComponent,
        RouterModule.forChild(taskRoutes),
        CommonModule,
        LoginOauthModule,
        DxFormModule,
        DxLoadIndicatorModule,
        DxButtonModule,
        DxDataGridModule,
        DxDropDownButtonModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxToolbarModule,
        StatusIndicatorModule,
        HttpClientModule,
        DxTabsModule,
        DxPopupModule,
        DxValidatorModule,
        DxTextAreaModule
    ],
    exports: [
        GestionarTareasAdminComponent,
        MisTareasComponent,
        TaskAddPopupComponent
    ]
})
export class TaskModule{}