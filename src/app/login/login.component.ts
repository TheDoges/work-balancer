import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('');
    }
  }

  login(username: string, password: string) {
    this.authService.login(username, password).toPromise()
    .then(() => {
      this.router.navigateByUrl('');
    })
    .catch(() => {
      alert('Wrong credentials');
    });
  }

}
