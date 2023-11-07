import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicEnvironmentService } from '@app/core/services/configure/dynamic-environment.service';
import { catchError, mergeMap, of, throwError } from 'rxjs';

export class BaseService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private dynamicEnvironmentService = inject(DynamicEnvironmentService);
  protected BASE_URL = '';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    this.BASE_URL = this.dynamicEnvironmentService.getConfig().baseAPIUrl;
  }

  public requestPost(body: any, url: string) {
    let url_ = this.BASE_URL + url;
    url_ = url_.replace(/[?&]$/, '');
    const content = JSON.stringify(body);
    const options = {
      headers: this.createDefaultHeaders(),
    };

    return this.http
      .post(url_, content, options)
      .pipe(
        mergeMap((response: any) => {
          return of(response);
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(() => new Error(error.message));
        })
      );
  }

  private createDefaultHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'text/plain',
    });
  }
}
