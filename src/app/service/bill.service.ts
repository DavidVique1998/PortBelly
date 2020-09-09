import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Bill } from '../models/bill';
@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = 'https://localhost:44386/api/CabezaFacturas';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    })
  };
  constructor(private http: HttpClient) { }
  delete(b: Bill): Observable<any> {
    return this.http.delete<any>(this.url + '/' + b.cbf_id,
      this.httpOptions);
  }
  view(b: Bill): Observable<Bill>{
    return this.http.get<Bill>(this.url + '/' + b.cbf_id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  create(b: Bill): Observable<any>{
    return this.http.post<any>(this.url, b, this.httpOptions);
  }
  retrive(id: number): Observable<Bill>{
    return this.http.get<Bill>(this.url + '/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  getBillByCli(id: number): Observable<Bill>{
    return  this.http.get<Bill>(this.url + '/' + 'GenerateFacturaByCli?id=' + id, this.httpOptions).pipe(retry(1));
  }
}
