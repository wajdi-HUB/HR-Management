import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        let url: string = state.url;
        return this.checkUserLogin(next, url);
    }

    public checkToken() {
        return !!localStorage.getItem('token');
    }

    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        if (this.authService.getToken()) {
            const userRole = this.authService.getRole();
            if (
                route.data['role'] &&
                route.data['role'].indexOf(userRole) === -1
            ) {
                this.router.navigate(['/home']);
                return false;
            }
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
        window.location.reload();
    }
}
