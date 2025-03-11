import { Component } from '@angular/core';
import { AuthApiService } from '../../service/auth-api.service';
import { UserEntity } from '../../entity/UserEntity';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userRequest: UserEntity;
  validButton:boolean = false;
  public myProperty: boolean = false;

  constructor(private authService: AuthApiService, public router: Router) {
    this.userRequest = new UserEntity();
  }

  onChangeValues(){
    this.validButton = this.validActiveButton();
  }

  validActiveButton():boolean{
    return this.userRequest.username?.trim() != "" && this.userRequest.username != null &&
        this.userRequest.password?.trim() != "" && this.userRequest.password != null &&
        this.userRequest.name?.trim() != "" && this.userRequest.name != null &&
        this.userRequest.lastname?.trim() != "" && this.userRequest.lastname != null &&
        this.userRequest.email?.trim() != "" && this.userRequest.email != null
  }

  registerUser() {
    this.authService.register(this.userRequest).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
