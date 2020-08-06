import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from '../models/cart';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  url = 'https://localhost:44386/api/Carritos';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  list(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
  delete(a: Cart): Observable<any> {
    return this.http.delete<Cart[]>(this.url + '/' + a.car_id,
      this.httpOptions);
  }
  view(c: Cart): Observable<Cart[]>{
    return this.http.get<Cart[]>(this.url + '/' + c.car_id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  create(c: Cart): Observable<any>{
    return this.http.post<Cart[]>(this.url, c, this.httpOptions);
  }
  retrive(id: number): Observable<Cart>{
    return this.http.get<Cart>(this.url + '/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  update(c: Cart): Observable<any>{
    const alumnoBody = JSON.stringify(c);
    console.log(c);
    return this.http.put<any>(this.url, c, this.httpOptions);
  }
}
