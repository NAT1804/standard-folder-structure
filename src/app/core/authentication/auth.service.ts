import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';

import { User } from '@data/schemas/user';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponseBase,
} from '@angular/common/http';

interface LoginContextInterface {
  username: string;
  password: string;
  token: string;
}

const defaultUser = {
  username: 'admin',
  password: '123456',
  token: '123456',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token!: string;

  constructor(private http: HttpClient) {}

  login(loginContext: LoginContextInterface): Observable<User> {
    // const isDefaultUser =
    //   loginContext.username === defaultUser.username &&
    //   loginContext.password === defaultUser.password;

    // if (isDefaultUser) {
    //   return of(defaultUser);
    // }
    this.testAPILogin(loginContext);

    return throwError('Invalid username or password');
  }

  logout(): Observable<boolean> {
    return of(false);
  }

  private testAPILogin(loginContext: LoginContextInterface) {
    loginContext.username = 'admin';
    loginContext.password = 'qưeasdzxcăâêÂÂ';

    const content_ = JSON.stringify(loginContext);
    const contentParse_ = JSON.parse(content_);

    const params = new HttpParams()
      .set('grant_type', 'password')
      .set('username', contentParse_.username)
      .set('password', contentParse_.password)
      .set('client_id', 'web_client_core_dev');

    const options_: any = {
      body: params.toString(),
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'text/plain',
      }),
    };

    return this.http
      .request(
        'post',
        'https://api-authen-dev.emirgroup.vn/connect/token',
        options_
      )
      .pipe(
        _observableMergeMap((response_: any) => {
          // return this.processAuthenticate(response_);
          console.log(1);
          return of(1);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              console.log(2);
              return of(2);
            } catch (e) {
              console.log(3);
              return of(3);
            }
          } else {
            console.log(4);
            return of(4);
          }
        })
      )
      .subscribe();
  }
}
