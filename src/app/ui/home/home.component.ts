import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../service/user-api.service';
import { UserEntity } from '../../entity/UserEntity';
import { AuthApiService } from '../../service/auth-api.service';
import { ControlDatabaseService } from '../../service/control-database.service';
import { Router } from '@angular/router';
import { ComponentMainComponent } from '../main/component-main/component-main.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends ComponentMainComponent implements OnInit {
  listDataBase: any[] = [];
  listDataBaseTable: any[] = [];
  permisos: boolean = true;

  ngOnInit(): void {
   this.getDataBaseList();
  }

  getDataBaseList() {
    this.servicecontrol.getListDataBase().subscribe((res) => {
      if (res.code == '400') {
        this.permisos = false;
      } else {
        this.listDataBase = res.entity;
      }
    });
  }

  clickEdit = (dbName:any)=>{
    this.router.navigate(['/action-db'], { queryParams: { database: dbName.databaseName } });
  }

}
