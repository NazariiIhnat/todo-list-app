import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (user) {
          const modifiedRequest = req.clone({
            url: req.url + user.id + '.json',
          });
          return next.handle(modifiedRequest);
        }
        return next.handle(req);
      })
    );
  }
}
