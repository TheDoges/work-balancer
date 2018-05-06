
import { Component, OnInit } from '@angular/core';
import { CredentialService } from '../services/credential.service';
import { Router } from '@angular/router';

// import { UserService } from '../services';
// import { User } from '../models';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
  private username: string;

  constructor(private credentialService: CredentialService, private router: Router) {};

  ngOnInit() {
    this.credentialService.getUsername()
    .subscribe(username => this.username = username);
  }

  logout() {
    this.credentialService.setToken(null);
    this.credentialService.setUsername(null);
    this.router.navigateByUrl('/login');
  }
}
