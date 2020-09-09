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
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };
  constructor(private http: HttpClient) { }
  // list(): Observable<Promocion[]> {
  //   return this.http.get<Promocion[]>(this.url, this.httpOptions)
  //     .pipe(
  //       retry(1)
  //     );
  // }
  // delete(a: Promocion): Observable<any> {
  //   return this.http.delete<Promocion[]>(this.url + '/' + a.prm_id,
  //     this.httpOptions);
  // }
  // view(p: Promocion): Observable<Promocion[]>{
  //   return this.http.get<Promocion[]>(this.url + '/' + p.prm_id, this.httpOptions)
  //   .pipe(
  //     retry(1)
  //   );
  // }
  // create(p: Promocion): Observable<any>{
  //   return this.http.post<Promocion[]>(this.url, p, this.httpOptions);
  // }
  // retrive(id: number): Observable<Promocion>{
  //   return this.http.get<Promocion>(this.url + '/' + id, this.httpOptions)
  //   .pipe(
  //     retry(1)
  //   );
  // }
  // update(p: Promocion): Observable<any>{
  //   const alumnoBody = JSON.stringify(p);
  //   console.log(p);
  //   return this.http.put<any>(this.url, p, this.httpOptions);
  // }
  create(promocion: Promocion): Observable<any> {
    const categoriasBody = JSON.stringify(promocion);
    if (promocion.prm_id === undefined){
      return this.http.post<any>(this.url, categoriasBody, this.httpOptions).pipe(retry(1));
    }
    return this.http.put<any>(this.url, categoriasBody, this.httpOptions).pipe(retry(1));
  }
  list(): Observable<Promocion[]>{
    return this.http.get<Promocion[]>(this.url, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  retrive(id: number): Observable<Promocion>{
    return this.http.get<Promocion>(this.url + '/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  delete(promocion: Promocion): Observable<any> {
    return this.http.delete<any>(this.url + '/' + promocion.prm_id,
      this.httpOptions).pipe(retry(1));
  }
}
