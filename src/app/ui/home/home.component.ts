import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../service/user-api.service';
import { UserEntity } from '../../entity/UserEntity';
import { AuthApiService } from '../../service/auth-api.service';
import { ControlDatabaseService } from '../../service/control-database.service';
import { Router } from '@angular/router';
import { ComponentMainComponent } from '../main/component-main/component-main.component';
import Swal from 'sweetalert2';
import { QueryResponseModel } from '../../entity/QueryResponseModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent extends ComponentMainComponent implements OnInit {
  listDataBase: any[] = [];
  listDataBaseTable: any[] = [];
  permisos: boolean = false;
  responseQuery: QueryResponseModel[] = [];
  basedatosname = '';
  validButton: boolean = false;

  ngOnInit(): void {
    this.getDataBaseList();
  }

  getDataBaseList() {
    this.servicecontrol.getListDataBase().subscribe((res) => {
      if (res.code == '400') {
        this.permisos = false;
      } else {
        console.log(this.listDataBase)
        this.listDataBase = res.entity;
        this.permisos = this.listDataBase.length > 0;
      }
    });
  }

  clickEdit = (dbName: any) => {
    this.router.navigate(['/action-db'], {
      queryParams: { database: dbName.databaseName },
    });
  };

  actionClickEjecutar(name: any, type: boolean) {
    if (!type) {
      Swal.fire({
        title: 'Estas seguro de eliminar ' + name,
        text: 'Ya no abra vuelta Atrás',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.actionClickEjecutarService(name, type);
        }
      });
    } else {
      this.actionClickEjecutarService(name, type);
      const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
      if (closeButton) {
        (closeButton as HTMLElement).click();
      }
      this.basedatosname = '';
    }
  }
  actionClickEjecutarService(name: any, type: boolean) {
    this.servicecontrol.ejecutarQueryMain(name, type).subscribe(
      (res) => {
        if (res.code === '400') {
          Swal.fire({
            title: 'Error!',
            text: res?.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        } else {

          console.log(res);
          this.responseQuery = res.entity;
          this.responseQuery.map((res) => {
            if (res.type === 'CREATE' || res.type === 'DROP') {
              this.getDataBaseList();
            }
          });

          Swal.fire({
            title: 'Success!',
            text: res.entity[0]?.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        }
      },
      (err) => {
        console.error(err.error);
        Swal.fire({
          title: 'Error!',
          text: err.error.entity,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }

  onChangeValues() {
    this.validButton = this.validActiveButton();
  }

  validActiveButton(): boolean {
    return this.basedatosname.trim() != '' && this.basedatosname != null;
  }
}
