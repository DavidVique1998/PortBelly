import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = 'https://localhost:44386/api/Clientes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
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
    const cliente = new Cliente();
    const payLoad = JSON.parse(
      window.atob(localStorage.getItem('token').split('.')[1])
    );
    cliente.uso_id = payLoad.id;
    if (cliente.uso_id !== null) {
      return this.http.get<Cliente>(this.url + '/' + 'GetCliente?id=' + cliente.uso_id, this.httpOptions)
      .pipe(
        retry(1)
      );
    }
  }
}
