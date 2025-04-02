import { UserRequest } from './../../entity/UserRequest';
import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../service/user-api.service';
import { AuthApiService } from '../../service/auth-api.service';
import { UserEntity } from '../../entity/UserEntity';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserEntityRequest } from '../../entity/UserEntityRequest';
import { error } from 'console';
import { ComponentMainComponent } from '../main/component-main/component-main.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent extends ComponentMainComponent implements OnInit {
  userRequest!: UserEntityRequest;
  validButton: boolean = false;
  permisos = '';
  listDataBase: any[] = [];
  selectDataBase: string | number = '-1';

  // constructor(
  //   public override authService: AuthApiService,
  //   public override router: Router,
  //   public override serviceUser: UserApiService
  // ) {
  //   super(authService,router,serviceUser);
  // }

  ngOnInit(): void {
    this.getDataUserPerfile();
    this.userRequest = new UserEntityRequest();
    this.verPermisos();
    //this.getDataBaseList();
  }

  verPermisos() {
    const local = this.userEntity.host == 'localhost' ? '@localhost' : '';

    this.servicecontrol
      .verPermisos(this.username.concat(local), this.selectDataBase)
      .subscribe((res) => {
        if (res.code == '400') {
          Swal.fire({
            title: 'Error!',
            text: res?.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        } else {
          const ent = res.entity.split(',');
          this.permisos = ent;
        }
      });
  }

  createUpdatePasswordChange() {
    this.serviceUser
      .updateUserPassword(
        this.userRequest?.password,
        this.userRequest.passwordChange
      )
      .subscribe((res) => {
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
    const request = new UserRequest();
    request.password = this.userRequest.passwordChange;
    request.username = this.userEntity.user;
    this.authService.login(request).subscribe((res) => {
      if (res.code == '400') {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        localStorage.setItem('usuario', JSON.stringify(res?.entity));
        Swal.fire({
          title: 'Success!',
          text: 'Se cambio la contraseña correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.userRequest = new UserEntityRequest();
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        if (closeButton) {
          (closeButton as HTMLElement).click();
        }
      }
    });
  }

  clearDataModel() {
    this.userRequest = new UserEntityRequest();
  }

  onChangeValuesPassword() {
    this.validButton = this.validActiveButton();
  }

  onChangeValues() {
    this.validButton = this.validActiveButtonEdit();
  }

  validActiveButton(): boolean {
    return (
      this.userRequest.password?.trim() != '' &&
      this.userRequest.password != null &&
      this.userRequest.passwordChange?.trim() != '' &&
      this.userRequest.passwordChange != null
    );
  }

  validActiveButtonEdit(): boolean {
    return (
      this.userRequest.username?.trim() != '' &&
      this.userRequest.username != null &&
      this.userRequest.name?.trim() != '' &&
      this.userRequest.name != null &&
      this.userRequest.lastname?.trim() != '' &&
      this.userRequest.lastname != null &&
      this.userRequest.email?.trim() != '' &&
      this.userRequest.email != null
    );
  }

  logout() {
    this.serviceUser.logout();
  }
  onChange(event: Event) {
    // this.verPermisos();
  }

  getDataBaseList() {
    this.servicecontrol.getListDataBaseOnly().subscribe((res) => {
      if (res.code != '400') {
        this.listDataBase = res.entity;
      } else {
        Swal.fire({
          title: 'Error!',
          text: res?.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  }
}
