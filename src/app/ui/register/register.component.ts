import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../service/auth-api.service';
import { UserEntity } from '../../entity/UserEntity';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ComponentMainComponent } from '../main/component-main/component-main.component';
import { UserRequest } from '../../entity/UserRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent
  extends ComponentMainComponent
  implements OnInit
{
  userRequest!: UserRequest;
  validButton: boolean = false;
  public myProperty: boolean = false;

  ngOnInit(): void {
    this.userRequest = new UserRequest();
  }

  onChangeValues() {
    this.validButton = this.validActiveButton();
  }

  validActiveButton(): boolean {
    return (
      this.userRequest.username?.trim() != '' &&
      this.userRequest.username != null &&
      this.userRequest.password?.trim() != '' &&
      this.userRequest.password != null
    );
  }

  registerUser() {
    this.authService.register(this.userRequest).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        this.login();
      }
    });
  }

  login() {
    this.authService.login(this.userRequest).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        Swal.fire({
          title: 'Success!',
          text: res?.message,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        localStorage.setItem('usuario', JSON.stringify(res?.entity));
        this.router.navigate(['/home']);
      }
    });
  }
}
