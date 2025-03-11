import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntity } from '../entity/UserEntity';
import { AuthApiService } from './auth-api.service';
import { UserEntityRequest } from '../entity/UserEntityRequest';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends AuthApiService{


  getAllUsers(): Observable<UserEntity[]>{
    return this.getService("admin/user/see");
  }
  getInfoUser(): Observable<any>{
    const user = this.getUserName()
    return this.postServiceBody(`user/usuario?usuario=${user}`,null);
  }

  deleteUsuario(idUsuario:Number): Observable<any>{
    return this.deleteService(`user/usuario/eliminar/${idUsuario}`);
  }

  updateUserPassword(body:UserEntityRequest,idUser:Number):Observable<any>{
    return this.postServiceBody(`user/usuario/update/password/${idUser}`,body);
  }

  updateUser(body:UserEntityRequest,idUser:Number):Observable<any>{
    return this.postServiceBody(`user/usuario/update/${idUser}`,body);
  }


}
