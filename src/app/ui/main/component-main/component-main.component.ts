import { Component } from '@angular/core';
import { AuthApiService } from '../../../service/auth-api.service';
import { UserApiService } from '../../../service/user-api.service';
import { UserEntity } from '../../../entity/UserEntity';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ControlDatabaseService } from '../../../service/control-database.service';

@Component({
  selector: 'app-component-main',
  templateUrl: './component-main.component.html',
  styleUrl: './component-main.component.css',
})
export class ComponentMainComponent {
  userEntity!: UserEntity;
  username: String = ""
  rootAccess: boolean = false;

  constructor(
    public authService: AuthApiService,
    public router: Router,
    public route: ActivatedRoute,
    public serviceUser: UserApiService,
    public servicecontrol: ControlDatabaseService
  ) {
    this.getDataUserPerfile();
    this.rootAccess = this.serviceUser.getRootAccess();
  }
  getDataUserPerfile() {
    const data = JSON.parse(this.serviceUser.getData());
    if(data){
      this.userEntity = data;
      this.username = data?.user ?? '';
    }

  }
}
