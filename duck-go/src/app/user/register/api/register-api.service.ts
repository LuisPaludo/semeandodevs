import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterApiService {
  locationUrl: string = 'http://127.0.0.1:8000/accounts/registration/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  registerNewUser(userData): Observable<any> {

    const postData = {
    "username": userData.username,
    "email": userData.email,
    "password1": userData.senha,
    "password2": userData.confSenha,
    "first_name": userData.nome,
    "last_name": userData.sobrenome
};

    return this.http.post(
      this.locationUrl, postData,
      {
        headers: this.httpHeaders,
      }
    );
  }
}


