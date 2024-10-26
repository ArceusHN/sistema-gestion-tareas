import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import notify from 'devextreme/ui/notify';
import { AuthService, IResponse, ThemeService } from 'src/app/core/services';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterComponent {
  btnStylingMode: DxButtonTypes.ButtonStyle;
  loading = false;
  formData: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  confirmPassword = (e: ValidationCallbackData) => e.value === this.formData.password;

  async onSubmit(e: Event) {
    e.preventDefault();
    const { username, password } = this.formData;
    this.loading = true;

    // const result = await this.authService.logIn(username, password);
    // this.loading = false;
    // if (!result.isOk) {
    //   notify(result.message, 'error', 2000);
    // }
  }

  onLogInClick = () => {
    this.router.navigate(['/auth/login']);
  };
}
