import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  template: `<div class="forbidden-container"><h2>Acceso Denegado</h2><p>No tienes permiso para acceder a esta página.</p><div>`,
  styles: [`
    .forbidden-container { width: 100%; text-align: center; }
    h2 { color: red; }
    p { font-size: 16px; }
  `]
})
export class ForbiddenComponent {}
