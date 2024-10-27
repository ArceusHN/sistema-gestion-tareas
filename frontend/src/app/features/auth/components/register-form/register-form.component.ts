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

    (await this.authService.registerIn({username, password})).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        this.loading = false;
      },
      error: (err) =>{
        notify(err?.error?.message ?? 'Ha ocurrido un error al registrar la cuenta. Intente nuevamente.', 'error', 5000);
        this.loading = false;
      }
    });
    
  }

  onLogInClick = () => {
    this.router.navigate(['/auth/login']);
  };
}
