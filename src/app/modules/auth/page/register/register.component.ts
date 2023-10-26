import { Component } from '@angular/core';

import { LoggerService } from '@core/logger.service';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private loggerService: LoggerService
  ) {}

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        this.loggerService.info(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        this.loggerService.error(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }
}
