import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url = 'https://localhost:44386/api/Categorias';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  // list(): Observable<Categoria[]> {
  //   return this.http.get<Categoria[]>(this.url, this.httpOptions)
  //     .pipe(
  //       retry(1)
  //     );
  // }
  // delete(a: Categoria): Observable<any> {
  //   return this.http.delete<Categoria[]>(this.url + '/' + a.cat_id,
  //     this.httpOptions);
  // }
  // view(c: Categoria): Observable<Categoria[]>{
  //   return this.http.get<Categoria[]>(this.url + '/' + c.cat_id, this.httpOptions)
  //   .pipe(
  //     retry(1)
  //   );
  // }
  // create(c: Categoria): Observable<any>{
  //   return this.http.post<Categoria[]>(this.url, c, this.httpOptions);
  // }
  // retrive(id: number): Observable<Categoria>{
  //   return this.http.get<Categoria>(this.url + '/' + id, this.httpOptions)
  //   .pipe(
  //     retry(1)
  //   );
  // }
  // update(c: Categoria): Observable<any>{
  //   const alumnoBody = JSON.stringify(c);
  //   console.log(c);
  //   return this.http.put<any>(this.url, c, this.httpOptions);
  // }

  create(categorias: Categoria): Observable<any> {
    const categoriasBody = JSON.stringify(categorias);
    if (categorias.cat_id === undefined){
      return this.http.post<any>(this.url, categoriasBody, this.httpOptions).pipe(retry(1));
    }
    return this.http.put<any>(this.url, categoriasBody, this.httpOptions).pipe(retry(1));
  }


  list(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.url, this.httpOptions)
    .pipe(
      retry(1)
    )
  }
  retrive(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(this.url + '/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  delete(categoria: Categoria): Observable<any> {
    return this.http.delete<any>(this.url + '/' + categoria.cat_id,
      this.httpOptions).pipe(retry(1));
  }
}
