import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

import { StorageService } from '../services/storage/storage.service';
import { AuthService } from '../services/auth/auth.service';
import { EventBusService } from '../services/event-bus/event-bus.service';
import { EventData } from '@data/classes/event.class';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // req = req.clone({
    //   withCredentials: true,
    // });

    const accessToken = this.storageService.getToken();
    const tokenType = this.storageService.getTokenType();
    if (accessToken && accessToken.length > 0) {
      const tokenExpiration: any = new Date(
        new Date().getTime() +
          Number(this.storageService.getTokenExpiresIn()) * 1000
      );
      if (tokenExpiration > new Date()) {
        req = req.clone({
          setHeaders: {
            Authorization: `${tokenType} ${accessToken}`,
          },
        });
      } else {
        this.authService.logout().subscribe({
          next: (response) => {
            localStorage.clear();
            this.router.navigate(['/auth/login']);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    } else {
      req = req.clone({
        setHeaders: {
          Authorization: '',
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/signin') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      const token = this.storageService.getRefreshToken();

      if (this.storageService.isLoggedIn()) {
        return this.authService.refreshToken(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.storageService.saveToken(token.accessToken);
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            if (error.status == '403') {
              this.eventBusService.emit(new EventData('logout', null));
            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }
}
