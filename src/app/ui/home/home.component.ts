import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../service/user-api.service';
import { UserEntity } from '../../entity/UserEntity';
import { AuthApiService } from '../../service/auth-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  username: String = ""
  constructor(private serviceUser: UserApiService,private auth:AuthApiService) {}

  ngOnInit(): void {
    this.username = this.auth.getUserData().sub
  }


}
