import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login-form/login-form.component";
import { RouterModule } from "@angular/router";
import { authRoutes } from "./auth.routing";
import { CommonModule } from "@angular/common";
import { DxFormModule, DxLoadIndicatorModule, DxButtonModule } from "devextreme-angular";
import { LoginOauthModule } from "src/app/ui/components/library/login-oauth/login-oauth.component";
import { RegisterComponent } from "./components/register-form/register-form.component";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        RouterModule.forChild(authRoutes),
        CommonModule,
        LoginOauthModule,
        DxFormModule,
        DxLoadIndicatorModule,
        DxButtonModule,
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthModule{}