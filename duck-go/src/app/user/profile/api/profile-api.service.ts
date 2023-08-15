import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileApiService {
  userUrl: string = 'http://127.0.0.1:8000/accounts/user/';
  userInfoUrl: string = 'http://127.0.0.1:8000/user-info/';
  userHistoryUrl: string = 'http://127.0.0.1:8000/historico/';

  private userData = new BehaviorSubject<object>(null);
  public userData$ = this.userData.asObservable();

  public user:User;
  private isLoading = false;

  private verified: boolean = false;

  private userVerifiedSubscription: Subscription;

  constructor(private http: HttpClient, private api: ApiService) {
    this.userVerifiedSubscription = this.api
      .isUserVerified()
      .subscribe((isVerified) => {
        if (isVerified) {
          this.verified = true;
          if(isVerified && !this.user){
          this.getUser();
          }
        }
        else {
          this.verified = false;
        }
      });
  }

  getUser() {
    if (!this.verified || this.isLoading) {
      return;
    }
    const accessToken: string = JSON.parse(localStorage.getItem('token')).token;
    const VerifiedHttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    });

    this.isLoading = true;

    this.http
      .get(this.userUrl, {
        headers: VerifiedHttpHeaders,
      })
      .subscribe({
        next: (data: User) => {
          this.isLoading = false;
          this.user = data;
          console.log(this.user)
          this.userData.next(data);
        },
        error: (e) => {
          this.isLoading = false;
          this.api.isUserVerified();
        },
      });
  }


  // Chame isso quando este serviço não for mais necessário
  // (por exemplo, quando o usuário sair da página).
  destroy() {
    if (this.userVerifiedSubscription) {
      this.userVerifiedSubscription.unsubscribe();
    }
  }
}
