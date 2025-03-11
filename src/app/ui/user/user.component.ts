import { Component } from '@angular/core';
import { UserEntity } from '../../entity/UserEntity';
import { UserApiService } from '../../service/user-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user:UserEntity

  constructor(private serviceUser: UserApiService){
    this.user = new UserEntity();
  }

  usersList: UserEntity[] = [];

  ngOnInit(): void {
    this.getAllServiceUsers()
  }

  getAllServiceUsers() {
    this.serviceUser.getAllUsers().subscribe((res) => {
      this.usersList = res
    });
  }

  disableROl(user:UserEntity):boolean{
      return user.rol == "USER"
  }

}
