import { Component } from '@angular/core';
import { UserApiService } from '../../service/user-api.service';
import { AuthApiService } from '../../service/auth-api.service';
import { ComponentMainComponent } from '../main/component-main/component-main.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent extends ComponentMainComponent {

  logout() {
    this.authService.logout();
  }

}
