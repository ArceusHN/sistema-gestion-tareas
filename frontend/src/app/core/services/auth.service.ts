import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStoreService } from './local-store.service';
import { environment } from 'src/environments/environment';
import { catchError, map, throwError } from 'rxjs';

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

@Injectable()
export class AuthService {
  signingIn: boolean;
  isAuthenticated: boolean;
  token: any;
  user: any = {};

  get loggedIn(): boolean {
    return this.signingIn;
  }

  private _lastAuthenticatedPath: string = defaultPath;

  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router,
              private http: HttpClient,
              private localStore: LocalStoreService,
  ) { }

  async logIn(credentials: any) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this.http.post(`${environment.apiURL}/auth/login`, credentials, { headers, observe: 'response' }).pipe(
        map((res: any) => {

          debugger;
          this.signingIn = false;
          if (!res.body.ok) {
            throw Error(res.body.message);
          }
          
          this.signingIn = true;
          const { id, token, username, roles, expiration } = res.body.data;
          this.setUserAndToken({token, expiration, attempt: 0}, { id, username, roles }, !!res);
          return res;
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  private setUserAndToken(token: any, user: any, isAuthenticated: Boolean) {
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
    return new Promise<void>((resolve, reject) => {
      this.setUserAndToken(null, null, false);
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

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode',
    ].includes(route.routeConfig?.path || defaultPath);

    if (!isLoggedIn && isAuthForm) {
      this.router.navigate(['/auth/login']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
