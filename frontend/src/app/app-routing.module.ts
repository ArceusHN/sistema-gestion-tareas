import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { SideNavOuterToolbarComponent, UnauthenticatedContentComponent } from './ui/layouts';
import { HomeComponent } from './features/home/home.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { RoleGuardService } from './core/guards/role-guard.service';
import { NoAuthGuardService } from './core/guards/no-auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: UnauthenticatedContentComponent,
    children: [
      { 
        path: 'auth', 
        loadChildren: () => import('../app/features/auth/auth.module').then(m => m.AuthModule), 
        canActivate: [NoAuthGuardService]
      },
    ]
  },
  {
    path: '',
    component: SideNavOuterToolbarComponent,
    children: [
      { 
        path: 'task', 
        loadChildren: () => import('../app/features/task/task.module').then(m => m.TaskModule), 
        canActivate: [AuthGuardService]
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'forbidden',
        component: ForbiddenComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ]
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, }),
    BrowserModule,
  ],
  providers: [AuthGuardService, RoleGuardService, NoAuthGuardService],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
