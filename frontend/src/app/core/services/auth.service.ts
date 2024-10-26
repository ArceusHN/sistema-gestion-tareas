import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStoreService } from './local-store.service';
import { catchError, map, throwError } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';

export interface IUser {
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface IResponse {
  isOk: boolean;
  data?: IUser;
  message?: string;
}

const defaultPath = '/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signingIn: boolean;
  isAuthenticated: boolean;
  token: any;
  user: any = {};
  apiUrl: string = 'http://localhost:3000';

  get loggedIn(): boolean {
    return this.signingIn;
  }

  constructor(private router: Router,
              private http: HttpClient,
              private localStore: LocalStoreService,
  ) { }

  async logIn(credentials: any) {

      return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
        map((data) => {

          this.signingIn = false;

          if (!data) {
            throw Error('Ocurrió un error al iniciar sesión. Intente nuevamente.');
          }
          
          this.signingIn = true;

          const { accessToken, expiresAt, userName, role  } = data;

          this.setUserAndToken({accessToken, expiresAt}, { userName, role });
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  private setUserAndToken(token: any, user: any) {
    this.token = token;
    this.user = user;

    this.localStore.setItem('JWT_TOKEN', token);
    this.localStore.setItem('APP_USER', user);
  }

  getJwtToken() {
    return this.localStore.getItem('JWT_TOKEN');
  }

  getUserInfo(){
    return this.localStore.getItem('APP_USER');
  }

  public logout() {
    return new Promise<void>((resolve) => {
      this.setUserAndToken(null, null);
      resolve();
    });
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request

      this.router.navigate(['/auth/create-account']);
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to create account',
      };
    }
  }

  async logOut() {
    this.router.navigate(['/auth/login']);
  }
}