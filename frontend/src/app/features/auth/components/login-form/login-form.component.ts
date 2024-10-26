import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import notify from 'devextreme/ui/notify';
import { AuthService, IResponse, ThemeService } from 'src/app/core/services';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginComponent {

  btnStylingMode: DxButtonTypes.ButtonStyle;
  passwordMode = 'password';
  loading = false;
  formData: any = {};

  passwordEditorOptions = {
    placeholder: 'Contraseña',
    stylingMode:'filled',
    mode: this.passwordMode,
  }

  constructor(private authService: AuthService, private router: Router) {}

  changePasswordMode() {
    this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
  };

  async onSubmit(e: Event) {
    e.preventDefault();

    const { username, password } = this.formData;
    this.loading = true;

    (await this.authService.logIn({username, password})).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        this.loading = false;
      },
      error: (err) =>{
        notify(err.message, 'error', 2000);
        this.loading = false;
      }
    });
    
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/auth/create-account']);
  };
}
