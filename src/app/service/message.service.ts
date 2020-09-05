import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Correo} from '../Models/correo';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url = 'https://localhost:44386/api/Correos';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  enviar( a: Correo): Observable<any>{
    return this.http.post<Correo>(this.url, a , this.httpOptions)
   ;
  }
}
