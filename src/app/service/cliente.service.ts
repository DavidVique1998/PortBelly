import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = 'http://portbelly2.azurewebsites.net/api/Clientes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };
  constructor(private http: HttpClient) { }

  delete(a: Cliente): Observable<any> {
    return this.http.delete<Cliente[]>(this.url + '/' + a.cln_id,
      this.httpOptions);
  }
  update(c: Cliente): Observable<any>{
    const alumnoBody = JSON.stringify(c);
    console.log(c);
    return this.http.put<any>(this.url, c, this.httpOptions);
  }
  getCliente(): Observable <Cliente>{
    if (localStorage.getItem('token')){
      const cliente = new Cliente();
      const payLoad = JSON.parse(
        window.atob(localStorage.getItem('token').split('.')[1])
      );
      cliente.uso_id = payLoad.id;
      if (cliente.uso_id !== null) {
        return this.http.get<Cliente>(this.url + '/' + 'GetCliente?id=' + cliente.uso_id, this.httpOptions);
      }
    }
  }
}
