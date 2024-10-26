import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services";
import { LocalStoreService } from "../services/local-store.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private localStore: LocalStoreService ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    const token = this.localStore.getItem('JWT_TOKEN');
    if (token) {
      if (!this.isTokenExpired(token)) {
        return true;
      } else {
        this.navigate(state);
        return false;
      }
    }
    this.navigate(state);
    return false;
  }

  isTokenExpired(token: any): boolean {
    const { expiresAt } = token;

    if (!expiresAt) {
      return true;
    }

    return new Date() > new Date(expiresAt);
  }

  private navigate(state: RouterStateSnapshot) {
    this.router.navigate(['/auth/login']);
  }

}