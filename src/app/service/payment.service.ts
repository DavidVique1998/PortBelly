import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from '../models/payment';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ClienteService } from '../service/cliente.service';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  url = 'https://localhost:44386/api/Pagos';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    })
  };
  constructor(private http: HttpClient) { }
  create(p: Payment): Observable<any>{
    if (p.cln_id != null){
      return this.http.put<any>(this.url, p, this.httpOptions);
    }
    else{
      return this.http.post<any>(this.url, p, this.httpOptions);
    }
  }

  retrive(id: number): Observable<Payment>{
    return this.http.get<Payment>(this.url + '/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  update(p: Payment): Observable<any>{
    // const alumnoBody = JSON.stringify(c);
    return this.http.put<any>(this.url, p, this.httpOptions);
  }
  // ----------------------------------------
  // Apartado para los carritos ya funcionales con el login
  getPaymentByCli(id: number): Observable<Payment>{
    return this.http.get<Payment>(this.url + '/' + 'MiCarritoPendiente?id=' + id, this.httpOptions).pipe(retry(1));
  }
  getAllPayments(id: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.url + '/' + 'MisMetodosPago?id=' + id, this.httpOptions).pipe(retry(1))
      .pipe(
        retry(1)
      );
  }
  getUniquePayments(id: number): Observable<Payment> {
    return this.http.get<Payment>(this.url + '/' + 'MiUnicoMetodoPago?id=' + id, this.httpOptions).pipe(retry(1))
      .pipe(
        retry(1)
      );
  }

}
