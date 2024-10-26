import { BrowserModule } from '@angular/platform-browser';

import { DxHttpModule } from 'devextreme-angular/http';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SingleCardModule } from './ui/layouts';
import {
  AppFooterModule,
} from './ui/components';

import { AuthService, ScreenService, AppInfoService } from './core/services';
import { UnauthenticatedContentModule } from './ui/layouts/unauthenticated-content/unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { ThemeService } from './core/services';
import { HomeModule } from './features/home/home.component';
import { NgModule } from '@angular/core';
import { AuthModule } from './features/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DxHttpModule,
    SideNavOuterToolbarModule,
    SingleCardModule,
    AppFooterModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    HomeModule,
    AuthModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule { }
