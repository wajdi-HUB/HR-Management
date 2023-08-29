import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in
        const account = this.authService.getToken();
        const isLoggedIn = account!;
        if (isLoggedIn) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${account}`,
                },
            });
        }
        console.log(request.headers); //display headers  into entries
        //console.log(request.headers.get("Authorization"));

        return next.handle(request);
    }
}
