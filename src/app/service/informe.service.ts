import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PestadosProductosPorCategoriaResult } from '../models/pestados-productos-por-categoria-result';
import { PestadosProductosPorPromocionResult} from '../models/pestados-productos-por-promocion-result';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InformeService {
  url = 'http://portbelly2.azurewebsites.net/api/Informes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    })
  };
  constructor(private http: HttpClient) { }
  getCategorias(estado: string): Observable<PestadosProductosPorCategoriaResult[]>{
    return this.http.get<PestadosProductosPorCategoriaResult[]>(this.url + '/' + 'GetCategorias?estado=' + estado ).pipe(retry(1));
  }
  getPromociones(estado: string): Observable<PestadosProductosPorPromocionResult[]>{
    return this.http.get<PestadosProductosPorPromocionResult[]>(this.url + '/' + 'GetPromociones?estado=' + estado ).pipe(retry(1));
  }
}
