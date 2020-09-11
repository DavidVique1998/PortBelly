import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Bodybill } from '../models/bodybill';
@Injectable({
  providedIn: 'root'
})
export class BodyBillService {
  url = 'http://portbelly2.azurewebsites.net/api/CuerpoFacturas';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    })
  };
  constructor(private http: HttpClient) { }
  delete(b: Bodybill): Observable<any> {
    return this.http.delete<any>(this.url + '/' + b.cbf_id,
      this.httpOptions);
  }
  view(b: Bodybill): Observable<Bodybill>{
    return this.http.get<Bodybill>(this.url + '/' + b.cbf_id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  create(b: Bodybill): Observable<any>{
    return this.http.post<any>(this.url, b, this.httpOptions);
  }
  retrive(id: number): Observable<Bodybill>{
    return this.http.get<Bodybill>(this.url + '/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
}
