import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import Swal from 'sweetalert2';
@Injectable()
export class ServiceInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, response: HttpHandler): Observable<HttpEvent<unknown>> {
    return response.handle(request).do(next => {
      if (next instanceof HttpResponse){
        console.info(next);
        switch (next.status) {
          case 201:
            Swal.fire({
              title: '¡Correcto!',
              text: next.body,
              icon: 'success',
            });
            break;
          case 202:
            Swal.fire({
              title: '¡Correcto!',
              text: next.body,
              icon: 'success',
            });
            break;
        }
      }
    }, error => {
      console.error(error);
      switch (error.status) {
        case 400:
          Swal.fire({
            title: 'Error',
            text: error.error.Message,
            icon: 'error',
          });
          break;
        case 500:
          Swal.fire({
            title: 'Error',
            text: error.error.Message,
            icon: 'error',
          });
          break;
        case 409:
          Swal.fire({
            title: 'Error',
            text: error.error.Message,
            icon: 'error',
          });
          break;
      }
    });
  }
}
