import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DxButtonModule, DxToolbarModule } from 'devextreme-angular';
import dxButton from 'devextreme/ui/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,DxButtonModule,DxToolbarModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() IsClosable!: boolean;
  @Input() IsReturnable!: boolean;
  @Input() CardTitle!: string;
  // Emitimos eventos para que el componente padre pueda interceptarlos
  @Output() closeRequest = new EventEmitter<void>();
  @Output() returnRequest = new EventEmitter<void>();

  // Emite el evento cuando se intenta cerrar
  onClose() {
    this.closeRequest.emit();
  }

  // Emite el evento cuando se intenta regresar
  onReturn() {
    this.returnRequest.emit();
  }

}
