import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CredentialService } from './credential.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }

}
