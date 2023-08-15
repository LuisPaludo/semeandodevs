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
  last,
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
  private isAccessInProgress = false;
  private isRefreshInProgress = false;

  private lastVerified: Date | null = null;
  private cacheDuration = 1 * 60 * 1000; // 5 minutos

  constructor(private http: HttpClient, private router: Router) {
  }

  access(): void {
    if (this.isCacheStillValid()) {
      this.userVerified.next(true);
      return;
    }
    if (this.isAccessInProgress) return;

    const accessToken: string = localStorage.getItem('token');
    if (!accessToken) {
      this.userVerified.next(false);
      return;
    }

    this.isAccessInProgress = true;

    this.http
      .post(this.verifyUrl, accessToken, {
        headers: this.httpHeaders,
      })
      .subscribe({
        next: () => {
          this.lastVerified = new Date();
          this.userVerified.next(true);
          this.isAccessInProgress = false;
        },
        error: (error) => {
          this.isAccessInProgress = false;
          if (error.status === 401 && !this.isRefreshInProgress) {
            this.userVerified.next(false);
            this.refresh();
          } else {
            localStorage.setItem(
              'isVerified',
              JSON.stringify({ isVerified: false })
            );
            this.router.navigate(['login']);
          }
        },
      });
  }

  refresh(): void {
    if (this.isRefreshInProgress) return;

    const refreshToken: string = localStorage.getItem('refresh');
    if (!refreshToken) {
      this.userVerified.next(false);
      return;
    }

    this.isRefreshInProgress = true;

    this.http
      .post(this.refreshUrl, refreshToken, {
        headers: this.httpHeaders,
      })
      .subscribe({
        next: (data: any) => {
          this.isRefreshInProgress = false;
          localStorage.setItem('token', JSON.stringify({ token: data.access }));
          localStorage.setItem(
            'isVerified',
            JSON.stringify({ isVerified: true })
          );
          this.userVerified.next(true);
        },
        error: (error) => {
          this.isRefreshInProgress = false;
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
    return this.userVerified.asObservable().pipe(catchError(() => of(false)));
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
          localStorage.clear();
          this.userVerified.next(false);
          this.router.navigate(['login']);
        },
        error: (error) => {},
      });
  }

  private isCacheStillValid(): boolean {
    if (!this.lastVerified) {
      return false;
    }
    const now = new Date();
    return now.getTime() - this.lastVerified.getTime() <= this.cacheDuration;
  }
}

