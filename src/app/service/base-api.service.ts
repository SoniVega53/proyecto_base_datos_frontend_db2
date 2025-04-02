import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  public userKey = 'usuario';

  public urlService: string = "http://localhost:9090/api/proyecto/"

  constructor(public http: HttpClient, public router: Router) {}

  protected getService(url: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get(this.urlService.concat(url))
      .pipe(catchError(async (e) => console.log(e)));
  }

  protected deleteService(url: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .delete(this.urlService.concat(url))
      .pipe(catchError(async (e) => console.log(e)));
  }

  protected putServiceBody(url: string, body: any): Observable<any> {
    return this.http
      .put(this.urlService.concat(url), body)
      .pipe(catchError(async (e) => console.log(e)));
  }

  protected postServiceBody(url: string, params?: any, body?: any): Observable<any> {
    const token = localStorage.getItem('token');
    const data = JSON.parse(this.getData());
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if(!params)
      params = {};
    if(!body)
      body = {};

    body.username = data?.user;
    body.password = data?.password;

    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http
      .post(this.urlService.concat(url), body, {
        headers: headers,
        params: httpParams,
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }

  getData(): any {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.userKey);
    }else {
      return null;
    }
  }

  getRootAccess():boolean{
    const data = JSON.parse(this.getData());
    if(!data)return false;
    return data.user == 'root';
  }

  post(url: string, body: any): Observable<any> {
    return this.http
      .post(this.urlService.concat(url), body)
      .pipe(catchError(async (e) => console.log(e)));
  }
}
