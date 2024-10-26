import { Component, NgModule, OnInit } from '@angular/core';
import { DxButtonModule } from 'devextreme-angular';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string;

  constructor() {}

  ngOnInit() {
    this.username = "Desconocido";
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    CardComponent
  ],
  providers: [],
  exports: [],
  declarations: [HomeComponent],
})
export class HomeModule { }