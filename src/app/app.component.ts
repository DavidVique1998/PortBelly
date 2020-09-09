import { Component } from '@angular/core';
import { LoginService } from './service/login.service';
import { UserMainComponent } from './user-main/user-main.component';
import { UsuarioService } from './service/usuario.service';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PortBelly';
  // Paso 4 Cramos el usuario para validar los roles
  user: Usuario;
  constructor(private loginService: LoginService){
    // Paso 5 optenemos al usuario desde el servicio el cual ya se encuentra instanciado y cargado
      this.user = this.loginService.user;
  }
  public logAut(): void{
    this.loginService.logout();
    window.location.href = '/login';
  }
  // Paso 6 Comparamos en donde querramos muy importante hacer este paso para cada rol y apoyarse del guardian
  get isAdmin(): any {
    return this.user && this.user.uso_rol === 'Administrador';
  }
  get isClien(): any {
    return this.user && this.user.uso_rol === 'Cliente';
  }

}


