import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth/auth.service';
import { StorageService } from '@core/services/storage/storage.service';
import { LoggerService } from '@core/logger.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  error!: string;
  isLoading!: boolean;
  loginForm!: UntypedFormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  private sub = new Subscription();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private loggerService: LoggerService
  ) {
    this.buildForm();
    this.loggerService.info('Log info initialized');
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.storageService.isLoggedIn$.subscribe((res) => {
      if (res) {
        this.isLoggedIn = true;
        // this.roles = this.storageService.getUser().roles;
        this.router.navigate(['/home']);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.value) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          // this.storageService.saveUser(data);
          this.storageService.saveToken(data.access_token);
          this.storageService.saveRefreshToken(data.refresh_token);
          this.storageService.saveTokenType(data.token_type);
          this.storageService.saveTokenExpiresIn(data.expires_in);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          // this.roles = this.storageService.getUser().roles;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.error = err.error.message;
          this.isLoginFailed = true;
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private buildForm(): void {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl(''),
      password: new UntypedFormControl(''),
    });
  }
}
