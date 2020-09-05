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

}