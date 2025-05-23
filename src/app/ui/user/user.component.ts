import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../../entity/UserEntity';
import { ComponentMainComponent } from '../main/component-main/component-main.component';
import Swal from 'sweetalert2';
import { UserRequest } from '../../entity/UserRequest';
import { UserEntityRequest } from '../../entity/UserEntityRequest';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent extends ComponentMainComponent implements OnInit {
  userRequest!: UserRequest;
  validButton: boolean = false;

  usersList: UserEntity[] = [];

  ngOnInit(): void {
    this.userRequest = new UserRequest();
    this.getAllServiceUsers();
  }

  getAllServiceUsers() {
    this.serviceUser.getAllUsers().subscribe((res) => {
      const list = res?.entity || [];

      this.usersList = list.filter((value: any) => value.host !== 'localhost');
    });
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
        Swal.fire({
          title: 'Success!',
          text: 'Usuario creado exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        if (closeButton) {
          (closeButton as HTMLElement).click();
        }
        this.userRequest = new UserRequest();
        this.getAllServiceUsers();
      }
    });
  }

  eliminarUser(name:any) {
    Swal.fire({
      title: "Estas seguro de eliminar el usuario?",
      text: "Ya no abra vuelta Atrás",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceUser.deleteUsuario(name).subscribe((res) => {
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
            this.getAllServiceUsers();
          }
        });
      }
    });

  }

  editarUsuario(user:any){
    this.router.navigate(['/user-edit'], {
      queryParams: user
    });
  }
}
