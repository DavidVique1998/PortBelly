import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/observable';
import { retry} from 'rxjs/operators';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://portbelly2.azurewebsites.net/api/Usuario';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  create(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.url, usuario, this.httpOptions);;
  }
  list(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  retrive(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.url + '/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  delete(usuario: Usuario): Observable<any> {
    return this.http.delete<any>(this.url + '/' + usuario.uso_id,
      this.httpOptions).pipe(retry(1));
  }
  getUsuario(): Usuario{
    if ( localStorage.getItem('token') ){
      const usuario = new Usuario();
      const payLoad = JSON.parse(
        window.atob(localStorage.getItem('token').split('.')[1])
      );
      usuario.uso_id = payLoad.id;
      usuario.uso_cor = payLoad.email;
      usuario.uso_nom = payLoad.Nombres;
      usuario.uso_rol = payLoad.rol;
      usuario.uso_usu = payLoad.unique_name;
      if (usuario.uso_id !== null) {
        return usuario;
      }
    }
  }
}
