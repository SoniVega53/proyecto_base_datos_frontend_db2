import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { PermisosUsuario } from '../entity/PermisosUsuario';

@Injectable({
  providedIn: 'root',
})
export class ControlDatabaseService extends BaseApiService {

  getListDataBase(): Observable<any> {
    return this.postServiceBody(`obtenerTablasDeBaseAll`);
  }
  getListDataBaseTables(nameBase:any): Observable<any> {
    const params = { nameDataBase: nameBase };
    return this.postServiceBody(`obtenerTablasDeBase`,params);
  }

  getListDataBaseOnly(): Observable<any> {
    return this.postServiceBody(`obtenerBasesDeDatos`);
  }

  obtenerTablasDeBase(nameBase: String): Observable<any> {
    const params = { nombreBaseDeDatos: nameBase };
    return this.postServiceBody(`obtenerBasesDeDatos`, params);
  }

  addPermisos(name: any, perm: any) {
    const params = { nombre: name };
    return this.postServiceBody(`darPermisosUsuario`, params, perm);
  }

  verPermisos(name: any,nameDataBase: any) {
    if (nameDataBase === '-1') {
      const params = { nombre: name };
      return this.postServiceBody(`verPermisos`, params);
    }else{
      const paramsDb = { nombre: name, nameDataBase: nameDataBase};
      return this.postServiceBody(`verPermisosDataBase`, paramsDb);
    }

  }

  removePermisos(name: any, perm: any) {
    const params = { nombre: name };
    return this.postServiceBody(`revocarPermisosUsuario`, params, perm);
  }


  ejecutarQuery(query: any,nameDataBase:any) {
    const body = { query: query,nameDataBase: nameDataBase};
    return this.postServiceBody(`ejecutarQuery`, {}, body);
  }

  removeAddPermisos(name: any, nameDataBase: any,perm: any, revoque: boolean) {
    if (nameDataBase === '-1') {
      const params = { nombre: name };
      if (revoque) {
        return this.postServiceBody(`revocarPermisosUsuario`, params, perm);
      } else {
        return this.postServiceBody(`darPermisosUsuario`, params, perm);
      }
    }else{
      const paramsDb = { nombre: name, nameDataBase: nameDataBase, permiso: perm };
      if (revoque) {
        return this.postServiceBody(`revocarPermisosUsuarioBaseDatos`, paramsDb, perm);
      } else {
        return this.postServiceBody(`darPermisosUsuarioBaseDatos`, paramsDb, perm);
      }
    }
  }


  addPermisosDataBase(name: any, nameDataBase: any, perm: any) {
    const params = { nombre: name, nameDataBase: nameDataBase, permiso: perm };
    return this.postServiceBody(`darPermisosUsuarioBaseDatos`, params);
  }
}
