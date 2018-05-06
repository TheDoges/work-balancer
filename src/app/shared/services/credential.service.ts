import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class CredentialService {

  private token: string;
  private username: string;
  private usernameChange: Subject<string> = new Subject();

  constructor() { }

  getToken(): string {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }

  getUsername(): Observable<string> {
    return this.usernameChange.asObservable();
  }

  setUsername(username: string) {
    this.username = username;
    this.usernameChange.next(username);
  }

}
