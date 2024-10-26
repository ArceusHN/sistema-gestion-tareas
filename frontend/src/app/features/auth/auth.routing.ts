import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login-form/login-form.component";
import { RegisterComponent } from "./components/register-form/register-form.component";

export const authRoutes: Routes =[
    {path: 'login', component: LoginComponent},
    {path: 'create-account', component: RegisterComponent}
]