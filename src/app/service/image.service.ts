import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  url = 'https://localhost:44386/api/Imagen';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      // 'multipart/form-data'
    }),
  };
  constructor(private http: HttpClient) {}
  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, this.httpOptions).pipe(retry(1));
  }

  getProfileImage(name: string): Observable<Blob> {
    return this.http
      .get<Blob>(this.url + '?name=' + name, this.httpOptions)
      .pipe(retry(1));
  }

  postFile(image: File): Observable<any> {
    console.log(image.type);
    console.log(image);
    let formData = new FormData();
    formData.append('image', image, image.name);
    formData.append('ImageCaption', image.name);
    return this.http
      .post<any>(this.url, formData, {
        headers: {
          // 'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Origin': '*',
          'Content-Disposition': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          enctype: 'multipart/form-data'
        },
        reportProgress: true,
        observe: 'events',
      })
      .pipe(retry(1));
  }
  // postFile(caption: string, fileToUpload: File): Observable<string> {
  //   const formData: FormData = new FormData();
  //   console.log(fileToUpload.name);
  //   formData.append('Image', fileToUpload, fileToUpload.name);
  //   formData.append('ImageCaption', caption);
  //   return this.http
  //     .post<string>(this.url, formData, this.httpOptions).pipe(retry(1));
  // }
  deleteFile(name: string): Observable<any> {
    return this.http
      .delete<any>(this.url + '?name=' + name, {headers: {
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*',
        'Content-Disposition': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        enctype: 'multipart/form-data'
      },
    })
      .pipe(retry(1));
  }
}
