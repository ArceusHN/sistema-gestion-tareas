// forbidden.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  template: `<h2>Acceso Denegado</h2><p>No tienes permiso para acceder a esta página.</p>`,
  styles: [`
    h2 { color: red; }
    p { font-size: 16px; }
  `]
})
export class ForbiddenComponent {}
