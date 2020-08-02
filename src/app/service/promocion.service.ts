import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Promocion } from '../models/promocion';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  url = 'https://localhost:44386/api/Promociones';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  list(): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
  delete(a: Promocion): Observable<any> {
    return this.http.delete<Promocion[]>(this.url + '/' + a.prm_id,
      this.httpOptions);
  }
  view(p: Promocion): Observable<Promocion[]>{
    return this.http.get<Promocion[]>(this.url + '/' + p.prm_id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  create(p: Promocion): Observable<any>{
    return this.http.post<Promocion[]>(this.url, p, this.httpOptions);
  }
  retrive(id: number): Observable<Promocion>{
    return this.http.get<Promocion>(this.url + '/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  update(p: Promocion): Observable<any>{
    const alumnoBody = JSON.stringify(p);
    console.log(p);
    return this.http.put<any>(this.url, p, this.httpOptions);
  }
}
