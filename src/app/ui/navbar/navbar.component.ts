import { Component } from '@angular/core';
import { UserApiService } from '../../service/user-api.service';
import { AuthApiService } from '../../service/auth-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  username: String = ""

  constructor(
    private serviceUser: UserApiService,
    private auth: AuthApiService
  ) {
    this.username = auth.getUserData().sub
  }

  logout() {
    this.auth.logout();
  }

  isUserAdminAcces():boolean{
    return this.auth.getUserData().role == 'ADMIN'
  }
}
