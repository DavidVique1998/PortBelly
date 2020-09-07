import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, onErrorResumeNext } from 'rxjs';
import 'rxjs/add/operator/do';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    // nex: HttpHandler,
    response: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const token = localStorage.token;
    // if (!token){
    //   return nex.handle(request);
    // }
    // const req1 = request.clone({
    //   headers: request.headers.set('Authorization', 'Bearer ' + token)
    // });

    return response.handle(request).do(
      (next) => {
        if (next instanceof HttpResponse) {
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
      },
      (error) => {
        switch (error.status) {
          case 400:
            Swal.fire({
              title: 'Error 400',
              text: error.error.Message,
              icon: 'error',
            });
            break;
          case 401:
            Swal.fire({
              title: 'Acceso Denegado',
              text:
                'No esta autorizado para realizar esta petición' +
                error.error.Message,
              icon: 'error',
            });
            this.router.navigateByUrl('/login');
            break;
          case 409:
            Swal.fire({
              title: 'Error 409',
              text: 'La petición entro en conflicto' + error.error.Message,
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
        }
      }
    );
  }
}
