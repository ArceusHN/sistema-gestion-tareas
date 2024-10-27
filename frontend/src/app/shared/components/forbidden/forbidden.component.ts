import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  template: `
    <div class="forbidden-container">
      <h2>Acceso Denegado</h2>
      <p>No tienes permiso para acceder a esta página.</p>
      <dx-button
        text="Regresar al Inicio"
        icon="home"
        type="default"
        stylingMode="contained"
        (onClick)="navigateToHome()"
      ></dx-button>
    </div>
  `,
  styles: [`
    .forbidden-container { 
      width: 100%; 
      text-align: center; 
      padding: 20px;
    }
    h2 { 
      color: red; 
      margin-bottom: 10px; 
    }
    p { 
      font-size: 16px; 
      margin-bottom: 20px; 
    }
    dx-button {
      margin-top: 20px;
    }
  `]
})
export class ForbiddenComponent {
  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
