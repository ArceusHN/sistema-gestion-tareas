import { Routes } from "@angular/router";
import { GestionarTareasAdminComponent } from "./components/gestionar-tareas-admin/gestionar-tareas-admin.component";
import { MisTareasComponent } from "./components/mis-tareas/mis-tareas-admin.component";
import { RoleGuardService } from "src/app/core/guards/role-guard.service";

export const taskRoutes: Routes =[
    {path: 'gestionar-tareas', component: GestionarTareasAdminComponent, canActivate: [RoleGuardService],  data: { roles: [1] },},
    {path: 'mis-tareas', component: MisTareasComponent, canActivate: [RoleGuardService],  data: { roles: [2] },}
]