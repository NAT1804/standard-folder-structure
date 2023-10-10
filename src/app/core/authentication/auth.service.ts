import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';

import { User } from '@data/schema/user';

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

  login(loginContext: LoginContextInterface): Observable<User> {
    const isDefaultUser =
      loginContext.username === defaultUser.username &&
      loginContext.password === defaultUser.password;

    if (isDefaultUser) {
      return of(defaultUser);
    }

    return throwError('Invalid username or password');
  }

  logout(): Observable<boolean> {
    return of(false);
  }
}
