import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url = "https://localhost:44386/api/Productos";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
  getProfileImage(name: string): Observable<Blob>{
    return this.http.get <Blob>(this.url + '?name=' + name , this.httpOptions )
      .pipe(
        retry(1)
      );
    }
}
