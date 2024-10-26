import { Component, NgModule, OnInit } from '@angular/core';
import { DxButtonModule } from 'devextreme-angular';
import { AuthService } from 'src/app/core/services';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string;

  constructor(private authenticationService: AuthService) {}

  ngOnInit() {
    const userInfo = this.authenticationService.getUserInfo();
    this.username  = userInfo.userName;
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