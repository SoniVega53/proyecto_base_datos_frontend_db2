import { Component, OnInit } from '@angular/core';
import { ComponentMainComponent } from '../../main/component-main/component-main.component';
import { UserEntityRequest } from '../../../entity/UserEntityRequest';
import { UserEntity } from '../../../entity/UserEntity';
import { PermisosUsuario } from '../../../entity/PermisosUsuario';
import Swal from 'sweetalert2';
import { ListadoPermisos } from './ListadoPermisos';

@Component({
  selector: 'app-permisos-usuarios',
  templateUrl: './permisos-usuarios.component.html',
  styleUrl: './permisos-usuarios.component.css',
})
export class PermisosUsuariosComponent
  extends ComponentMainComponent
  implements OnInit
{
  userEdit!: UserEntity;
  perm: PermisosUsuario = new PermisosUsuario();
  listCal = new ListadoPermisos();
  validButton = false;
  revoke = false;
  permisos = [];
  listDataBase: any[] = [];
  selectDataBase:string | number = '-1';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userEdit = params;
    });
    this.perm = new PermisosUsuario();
    this.verPermisos();
    this.getDataBaseList();
  }

  addPermisos() {
    this.perm.permisos = [];
    this.listCal.listadoPermisos.map((res) => {
      if (res.access) {
        this.perm?.permisos.push(res.nombre);
      }
    });

    if (this.perm?.permisos && this.perm?.permisos.length > 0) {
      this.servicecontrol
        .removeAddPermisos(this.userEdit.user,this.selectDataBase, this.perm, this.revoke)
        .subscribe((res) => {
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
            this.verPermisos();
            this.clearSwitch();
          }
        });
    }
  }

  verPermisos() {
    this.servicecontrol.verPermisos(this.userEdit.user,this.selectDataBase).subscribe((res) => {
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

  clearSwitch() {
    this.listCal.listadoPermisos.forEach((res) => {
      res.access = false;
    });
  }

  eliminarUser() {
    Swal.fire({
      title: 'Estas seguro de eliminar el usuario?',
      text: 'Ya no abra vuelta Atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceUser.deleteUsuario(this.userEdit.user).subscribe((res) => {
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
            this.router.navigate(['/users']);
          }
        });
      }
    });
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

  onChange(event: Event){
    // console.log(this.selectDataBase);
    // this.verPermisos();
  }
}
