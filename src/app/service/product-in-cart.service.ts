import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductInCart } from '../models/product-in-cart';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductInCartService {
  url = 'https://localhost:44386/api/ProductoEnCarritos';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    })
  };
  constructor(private http: HttpClient) { }
  list(): Observable<ProductInCart[]> {
    return this.http.get<ProductInCart[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
  delete(a: ProductInCart): Observable<any> {
    return this.http.delete<ProductInCart[]>(this.url + '/' + a.pcr_id,
      this.httpOptions);
  }
  view(p: ProductInCart): Observable<ProductInCart[]>{
    return this.http.get<ProductInCart[]>(this.url + '/' + p.prd_id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  create(p: ProductInCart): Observable<any>{
    return this.http.post<ProductInCart[]>(this.url, p, this.httpOptions);
  }
  retrive(id: number): Observable<ProductInCart>{
    return this.http.get<ProductInCart>(this.url + '/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  update(p: ProductInCart): Observable<any>{
    const alumnoBody = JSON.stringify(p);
    console.log(p);
    return this.http.put<any>(this.url, p, this.httpOptions);
  }
}
