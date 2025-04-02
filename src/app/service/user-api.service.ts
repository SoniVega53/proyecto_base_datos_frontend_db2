import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntity } from '../entity/UserEntity';
import { AuthApiService } from './auth-api.service';
import { UserEntityRequest } from '../entity/UserEntityRequest';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends AuthApiService{


  getAllUsers(): Observable<any>{
    return this.postServiceBody("verUsuarios");
  }
  getInfoUser(): Observable<any>{
    const user = this.getUserName()
    return this.postServiceBody(`user/usuario?usuario=${user}`,null);
  }

  deleteUsuario(name:any): Observable<any>{
    const param = { nombre:name}

    return this.postServiceBody(`eliminarUsurio`,param);
  }

  updateUserPassword(validPass:any, newpas:any):Observable<any>{
    const param = { validPassword:validPass, newPassword:newpas}
    return this.postServiceBody(`cambiarPassword`,param);
  }

  updateUser(body:UserEntityRequest,idUser:Number):Observable<any>{
    return this.postServiceBody(`user/usuario/update/${idUser}`,body);
  }


}
