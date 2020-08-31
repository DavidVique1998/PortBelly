import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: LoginService, private router: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.auth.estaAutenticado()){
    if (this.auth.estaAutenticado()){
      const roles =  next.data['permittedRoles'] as Array<string>;
      console.log(roles);
      if (roles){
        if (this.auth.roleMatch(roles)){
            return true;
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Acceso Denegado',
            text: 'No esta autorizado'
          });
          this.auth.verificarRol();
          this.router.navigateByUrl('/login');
          return false;
        }
      }
      return true;
    }else{
      console.log('Esta Prohibido');
      this.router.navigateByUrl('login');
      return false;
    }
  }

}
