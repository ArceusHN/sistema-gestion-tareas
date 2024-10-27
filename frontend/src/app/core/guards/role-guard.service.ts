import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services';
import { LocalStoreService } from '../services/local-store.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    
    
    const token = this.authService.getJwtToken();
    const user = this.authService.getUserInfo();

    if (token && !this.isTokenExpired(token)) {
      const userRole = user.role.id

      const allowedRoles = route.data['roles'] as Array<number>;
      
      if (allowedRoles.includes(userRole)) {
        return true; 
      } else {
        this.router.navigate(['/forbidden']);
        return false;
      }
    }

    this.router.navigate(['/auth/login']);
    return false;
  }

  isTokenExpired(token: any): boolean {
    const { expiresAt } = token;
    return !expiresAt || new Date() > new Date(expiresAt);
  }
}
