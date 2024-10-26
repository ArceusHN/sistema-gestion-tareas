import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SingleCardModule } from '../../layouts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthenticated-content',
  template: `
    <app-single-card [title]="title">
      <router-outlet></router-outlet>
    </app-single-card>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }
  `],
})
export class UnauthenticatedContentComponent {
  constructor(private router: Router) { }

  get title() {
    const path = this.router.url.split('/').at(-1);
    switch (path) {
      case 'login': return 'Iniciar sesión';
      case 'reset-password': return 'Reset Password';
      case 'create-account': return 'Crear cuenta';
      case 'change-password': return 'Change Password';
      default: return '';
    }
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SingleCardModule,
  ],
  declarations: [UnauthenticatedContentComponent],
  exports: [UnauthenticatedContentComponent],
})
export class UnauthenticatedContentModule { }
