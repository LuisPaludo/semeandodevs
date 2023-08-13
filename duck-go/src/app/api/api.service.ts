import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  verifyUrl: string = 'http://127.0.0.1:8000/accounts/token/verify/';
  refreshUrl: string = 'http://127.0.0.1:8000/accounts/token/refresh/';
  logoutUrl: string = 'http://127.0.0.1:8000/accounts/logout/';


  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private userVerified = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  access(): void {
    const accessToken: string = localStorage.getItem('token');
    const accessTokenValue: string = JSON.parse(
      localStorage.getItem('token')
    ).token;

    if (accessTokenValue) {
      this.http
        .post(this.verifyUrl, accessToken, {
          headers: this.httpHeaders,
        })
        .subscribe({
          next: () => {
            this.userVerified.next(true);
          },
          error: (error) => {
            if (error.status === 401) {
              this.refresh();
            } else {
              this.userVerified.next(false);
              localStorage.setItem(
                'isVerified',
                JSON.stringify({ isVerified: false })
              );
              this.router.navigate(['login']);
            }
          },
        });
    }
  }

  refresh(): void {
    const refreshToken: string = localStorage.getItem('refresh');
    this.http
      .post(this.refreshUrl, refreshToken, {
        headers: this.httpHeaders,
      })
      .subscribe({
        next: (data: any) => {
          console.log('Deu Refresh ->', data);
          this.userVerified.next(true);
          localStorage.setItem('token', JSON.stringify({ token: data.access }));
          localStorage.setItem(
            'isVerified',
            JSON.stringify({ isVerified: true })
          );
        },
        error: (error) => {
          localStorage.setItem(
            'isVerified',
            JSON.stringify({ isVerified: false })
          );
          this.userVerified.next(false);
          this.router.navigate(['login']);
        },
      });
  }

  isUserVerified(): Observable<boolean> {
    this.access();
    // Chamar o refresh e retornar o Observable diretamente
    return this.userVerified.asObservable();
  }

  logout(): void {
    const accessToken: string = JSON.parse(localStorage.getItem('token')).token;
    const VerifiedHttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    });

    this.http
      .post(this.logoutUrl, '', {
        headers: VerifiedHttpHeaders,
      })
      .subscribe({
        next: () => {
          this.userVerified.next(false);
          localStorage.setItem('token', JSON.stringify({ token: '' }));
          localStorage.setItem(
            'isVerified',
            JSON.stringify({ isVerified: false })
          );
          localStorage.setItem('refresh', JSON.stringify({ refresh: '' }));
          location.reload();
        },
        error: (error) => {},
      });
  }
}
