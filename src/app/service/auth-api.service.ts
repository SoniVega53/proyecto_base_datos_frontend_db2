import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { UserRequest } from '../entity/UserRequest';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { UserEntity } from '../entity/UserEntity';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends BaseApiService {

  private userKey = 'usuario';


  login(body: UserRequest): Observable<any> {
    return this.post(`noauth/login`, body);
  }

  register(body: UserEntity): Observable<any> {
    return this.post(`noauth/register`, body);
  }

  logout() {
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (this.isLocalStorageAvailable()){
      return !!localStorage.getItem(this.userKey)
    };
    return false;
  }

 

  getData(): any {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.userKey);
    }else {
      return null;
    }
  }

  // getDecodedToken(): any {
  //   const token = this.getToken();
  //   if (token) {
  //     return jwtDecode(token);
  //   }
  //   return null;
  // }

  // getUserRole(): string | null {
  //   const decodedToken = this.getDecodedToken();
  //   if (decodedToken && decodedToken.roles) {
  //     return decodedToken.roles;
  //   }
  //   return null;
  // }

  getUserName():String {
    const data = JSON.parse(this.getData());
    return data?.username;
  }

  getUserRole():String {
    const data = JSON.parse(this.getData());
    return data?.rol;
  }


  public isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
