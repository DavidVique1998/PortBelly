import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {faSave, faTimes, faUser, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faTag, faKey, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../service/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-user-sign-up-form',
  templateUrl: './user-sign-up-form.component.html',
  styleUrls: ['./user-sign-up-form.component.css']
})
export class UserSignUpFormComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faKey = faKey;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faUserPlus = faUserPlus;
  faTimes = faTimes;
  faSave = faSave;
  faIdCard = faIdCard;
  faTag = faTag;
  public formUser: FormGroup;
  @Input() user: Usuario;
  submitted = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.user = new Usuario();
    this.formUser = this.formBuilder.group({
      uso_usu: ['', [Validators.required]],
      uso_con: ['', [Validators.required]],
      uso_nom: ['', [Validators.required]],
      uso_cor: ['', [Validators.required]],
    });
  }
  get f(): any{
    return this.formUser.controls;
  }
  public register(): void{
    // Puede causar conflictos de identidad
    const user = this.formUser.value;
    console.log(user);
  }
  onSubmit(): void{
    this.submitted = true;
    if (this.formUser.invalid){
      Swal.fire({
        title: 'Error',
        text: 'Error en formulario',
        icon: 'error',
      });
      console.error('Error en formulario');
      return;
    }
    // Actualizar en el backend
    this.user.uso_rol = 'Cliente';
    this.usuarioService.create(this.user).subscribe((result) => {
      console.log(result);
      this.submitted = false;
    });
  }
  onReset(): void {
    this.formUser.reset();
    this.user = new Usuario();
  }
}
