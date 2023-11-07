import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

import { DynamicEnvironmentService } from '../configure/dynamic-environment.service';
import { LoginContextInterface } from '@data/interfaces/login-context.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AUTH_API: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dynamicEnvironmentService: DynamicEnvironmentService
  ) {
    this.AUTH_API = this.dynamicEnvironmentService.getConfig().authAPIUrl;
  }

  login(loginContext: LoginContextInterface): Observable<any> {
    const { username, password } = loginContext;

    const params = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password)
      .set('client_id', 'web_client_core_dev');

    return this.http.post(this.AUTH_API, params.toString(), {
      headers: this.createDefaultHeaders(),
    });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      this.AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      { headers: this.createDefaultHeaders() }
    );
  }

  logout(): Observable<any> {
    return this.http
      .post(
        this.AUTH_API + 'signout',
        {},
        { headers: this.createDefaultHeaders() }
      )
      .pipe(switchMap((_) => this.router.navigate(['auth/login'])));
  }

  refreshToken(token: string): Observable<any> {
    const params = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set(
        'scope',
        'api_emir_core api_emir_invest offline_access openid profile'
      )
      .set('refresh_token', token);

    return this.http.post(this.AUTH_API, params.toString(), {
      headers: this.createDefaultHeaders(),
    });
  }

  private createDefaultHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'text/plain',
    });
  }
}
