import { UserRequest } from './../../entity/UserRequest';
import { AfterViewInit, ChangeDetectorRef, Component, isDevMode, OnInit } from '@angular/core';
import { AuthApiService } from '../../service/auth-api.service';
import { UserEntity } from '../../entity/UserEntity';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent{
  userRequest: UserRequest;
  validButton:boolean = false;
  public myProperty: boolean = false;

  constructor(private authService: AuthApiService, public router: Router,private cdr: ChangeDetectorRef) {
    this.userRequest = new UserRequest();
  }

  login() {
    this.authService.login(this.userRequest).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      } else {
        localStorage.setItem('token', res.entity.token);
        this.router.navigate(['/home']);
      }
    });
  }

  onChangeValues(){
    this.validButton = this.validActiveButton();
  }

  validActiveButton():boolean{
    return this.userRequest.username?.trim() != "" && this.userRequest.username != null &&
        this.userRequest.password?.trim() != "" && this.userRequest.password != null
  }

}
