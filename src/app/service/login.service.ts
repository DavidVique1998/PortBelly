import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/observable';
import {map, retry} from 'rxjs/operators';
import { Login } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'https://localhost:44386/api/Login/Authenticate';
  userToken: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  constructor(private http: HttpClient, private router: Router) {
    this.leerToken();
   }

  login(usuario: Login): Observable<Login>{
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post<any>(this.url, authData, this.httpOptions).pipe(
      map((resp) => {
        this.guardarToken(resp.token);
        return resp;
      })
    );
  }

   logout(): void {
     localStorage.clear( );
   }

   leerToken(): any{
    if ( localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
    return this.userToken;
   }
   private guardarToken(idToken: string): void{
     this.userToken = idToken;
     localStorage.setItem('token', idToken);
     const hoy = new Date();
     hoy.setSeconds(600);
     localStorage.setItem('expira', hoy.getTime().toString());
   }
   roleMatch(allowedRoles: Array<string>): boolean{
     /*let isMatch = false;
    const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    const userRole = payLoad.rol;
    allowedRoles.forEach(element => {
      if (userRole === element){
        isMatch = true;
        return true;
      }
    });
    return isMatch;*/
     const payLoad = JSON.parse(
       window.atob(localStorage.getItem('token').split('.')[1])
     );
     const userRole = payLoad.rol;
     return allowedRoles.indexOf(userRole) !== -1;

     // const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
   }

   verificarRol(): void{
     let rol = '';
     const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
     rol = payLoad.rol;
     switch (rol){
       case 'Administrador':
         this.router.navigateByUrl('/productos');
         break;
       case 'Cliente':
         this.router.navigateByUrl('/tienda');
     }
   }
   estaAutenticado(): boolean{
      if (this.userToken.length < 2){
        return false;
      }
      const expira = Number(localStorage.getItem('expira'));
      const expiraDate = new Date();
      expiraDate.setTime(expira);
      if (expiraDate > new Date()){
        return true;
      } else{
        return false;
      }
    }
    sesionOpen(): void{
      if (this.estaAutenticado()){
        this.verificarRol();
      }
    }
}
