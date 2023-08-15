import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { ProfileApiService } from '../../api/profile-api.service';
import { userPatchModel } from '../../models/userPatchModel';

@Injectable({
  providedIn: 'root',
})
export class UserDataApiService {
  private postUrl: string = 'http://127.0.0.1:8000/accounts/user/';

  private userVerifiedSubscription: Subscription;

  verified: boolean = false;
  isLoading: boolean = false;
  postData: userPatchModel;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private apiUser: ProfileApiService
  ) {
    this.userVerifiedSubscription = this.api
      .isUserVerified()
      .subscribe((isVerified) => {
        if (isVerified) {
          this.verified = true;
          if (isVerified && !this.apiUser.user) {
          }
        } else {
          this.verified = false;
        }
      });
  }

  updateUserData(data, selectedFile) {
    if (!this.verified || this.isLoading) {
      return;
    }

    const accessToken: string = JSON.parse(localStorage.getItem('token')).token;
    const VerifiedHttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + accessToken,
    });

    this.isLoading = true;

    const formData: FormData = new FormData();

    formData.append('first_name', data.nome);
    formData.append('last_name', data.sobrenome);
    formData.append('email', data.email);
    formData.append('username', this.apiUser.user.username);
    formData.append('cep', data.cep);
    formData.append('cpf', data.cpf);
    formData.append('addres_rua', data.rua);
    formData.append('address_UF', data.uf);
    formData.append('address_cidade', data.cidade);
    formData.append('data_nascimento', this.apiUser.user.data_nascimento);

    if (data.foto) {
      formData.append(
        'profile_photo',
        selectedFile,
        selectedFile.name
      );
    }

    this.http
      .put(this.postUrl, formData, {
        headers: VerifiedHttpHeaders,
      })
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          this.apiUser.getUser();
        },
        error: (e) => {
          this.isLoading = false;
          this.api.isUserVerified();
        },
      });
  }
}
