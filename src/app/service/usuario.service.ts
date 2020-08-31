import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/observable';
import {map, retry} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import { Usuario } from '../models/usuario';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { stringify } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'https://localhost:44386/api/Usuario';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  setUser(user: Usuario): void {
    // tslint:disable-next-line: variable-name
    const user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
  }

  setToken(token: Token): void{
    localStorage.setItem('accesToken', JSON.stringify(token));
  }

  getToken(): any{
    return localStorage.getItem('accesToken');
  }

  getCurrentUser(): Observable<any>{
    // tslint:disable-next-line: variable-name
    const user_string = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(user_string)){
      const user = JSON.parse(user_string);
      return user;
    }
    else{
      return null;
    }
  }
  loginUser(criterio: string, password: string): Observable<any>{
    // api/Usuario?parametro={parametro}
    return this.http
      .post<any>(
        this.url + '?parametro={parametro}&password={password}',
        { criterio, password },
        this.httpOptions
      )
      .pipe(
        retry(1),
        map((data) => data)
      );
  }

  logOutUser(): void{
    localStorage.removeItem('currentUser');
  }
  create(usuario: Usuario): Observable<any> {
    const categoriasBody = JSON.stringify(usuario);
    if (usuario.uso_id === undefined){
      return this.http.post<any>(this.url, categoriasBody, this.httpOptions).pipe(retry(1), map(data => data));
    }
    return this.http.put<any>(this.url, categoriasBody, this.httpOptions).pipe(retry(1));
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

}
