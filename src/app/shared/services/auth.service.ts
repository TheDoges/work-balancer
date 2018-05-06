import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { CredentialService } from './credential.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {

  private token: string;

  constructor(private apiService: ApiService, private credentialService: CredentialService, private snackBar: MatSnackBar) { }

    login(email: string, password: string): Observable<{token: string}> {
      return this.apiService
      .post('login', {email, password})
      .do((response) => {
        this.credentialService.setToken(response.data.token);
        this.credentialService.setUsername(email);
      });
    }

    register(name: string, email: string, password: string, c_password: string) {
      return this.apiService
      .post('register', {name, email, password, c_password})
      .do(() => {
        this.snackBar.open(`Pomyślnie zarejestrowano użytkownika "${name}.`, null, {duration: 3000});
      })
    }

    isLoggedIn(): boolean {
      return !!this.credentialService.getToken();
    }
}
