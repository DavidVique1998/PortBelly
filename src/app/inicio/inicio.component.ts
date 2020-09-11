import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  constructor(private usuarioServicie: UsuarioService) { }

  ngOnInit(): void {
    this.getusuario();
  }

  getusuario(): void{
    this.usuario = this.usuarioServicie.getUsuario();
  }

  isAdmin(): boolean{
    return this.usuario && this.usuario.uso_rol === 'Administrador';
  }
  isClien(): boolean{
    return this.usuario && this.usuario.uso_rol === 'Cliente';
  }

}
