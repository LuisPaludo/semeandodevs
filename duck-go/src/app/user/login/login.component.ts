import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginApiService } from './api/login-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  buttonDisable: boolean = false;
  verifyEmail: boolean = false;
  incorrect: boolean = false;
  success: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: LoginApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.login?.valid) {
      this.buttonDisable = true;
      this.api.Login(this.login.value).subscribe({
        next: (data) => {
          this.handleLoginSuccess(data);
        },
        error: (e) => {
          this.buttonDisable = false;
          console.log(e);
          this.verifyEmail = false;
          this.incorrect = false;
          if (e.error.email) {
            // this.emailAlreadyRegistered = true;
            this.login.get('email')?.setErrors({ incorrect: true });
            console.log(e);
          }
          if (
            e.error.non_field_errors ==
            'Unable to log in with provided credentials.'
          ) {
            this.login.get('password')?.setErrors({ incorrect: true });
            this.incorrect = true;
          }
          if (e.error.non_field_errors == 'E-mail is not verified.') {
            this.verifyEmail = true;
          }
        },
        complete: () => {
          this.handleLoginComplete();
        },
      });
    } else {
      this.login.markAllAsTouched();
    }
  }

  private handleLoginSuccess(data: any) {
    localStorage.setItem('token', JSON.stringify({ token: data.access }));
    localStorage.setItem('refresh', JSON.stringify({ refresh: data.refresh }));
  }

  private handleLoginComplete() {
    this.login.disable();
    this.buttonDisable = true;
    this.verifyEmail = false;
    this.incorrect = false;
    this.success = true;

    setTimeout(() => {
      this.router.navigate(['']);
    }, 2000);
  }

  redirect() {
    this.router.navigate(['reenviar-email-verificacao']);
  }
}
