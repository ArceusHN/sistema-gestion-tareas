import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const tokenInfo: any = this.authenticationService.token || this.authenticationService.getJwtToken();

    let changedReq;
    if (tokenInfo) {
      changedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenInfo.accessToken}`,
        },
      });
    } else {
      changedReq = req;
    }

    return next.handle(changedReq);
  }

}
