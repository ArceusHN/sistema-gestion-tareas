import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuardService } from './core/services';

import { SideNavOuterToolbarComponent, UnauthenticatedContentComponent } from './ui/layouts';
import { HomeComponent } from './features/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: UnauthenticatedContentComponent,
    children: [
      {path: 'auth', loadChildren: () => import('../app/features/auth/auth.module').then(m => m.AuthModule)}
    ]
  },
  {
    path: '',
    component: SideNavOuterToolbarComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService],
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
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
