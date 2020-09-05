import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from '../models/cart';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from 'src/app/models/cliente';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  url = 'https://localhost:44386/api/Carritos';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    })
  };
  constructor(private http: HttpClient,  private clienteService: ClienteService) { }
  // Apartado para los carritos de manera normal

  retrive(id: number): Observable<Cart>{
    return this.http.get<Cart>(this.url + '/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  update(c: Cart): Observable<any>{
    const alumnoBody = JSON.stringify(c);
    return this.http.put<any>(this.url, c, this.httpOptions);
  }
  // ----------------------------------------
  // Apartado para los carritos ya funcionales con el login
  getCartPendByCli(id: number): Observable<Cart>{
    return this.http.get<Cart>(this.url + '/' + 'MiCarritoPendiente?id=' + id, this.httpOptions).pipe(retry(1));
  }

  getCartPagByCli(id: number): Observable<Cart>{
    return this.http.get<Cart>(this.url + '/' + 'MisCarritosPagados?id=' + id, this.httpOptions).pipe(
        retry(1)
    );
  }
}
