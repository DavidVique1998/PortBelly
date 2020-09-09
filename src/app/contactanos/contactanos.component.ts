import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MessageService } from '../service/message.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Correo } from '../Models/correo';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {
  center = {lat: -0.932474, lng: -78.619912};
  zoom = 15;
  // display?: google.maps.LatLngLiteral
  position = {
    lat: -0.932474, lng: -78.619912
  };
  public formCorreo: FormGroup;
  submitted = false;
  @Input() correo: Correo;
  @Output() flagToReload = new EventEmitter<boolean>();
  label = {
    color: 'red',
    text: 'Marcador'
  };
  constructor(private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.correo = new Correo();
    this.formCorreo = this.formBuilder.group({
    email: ['',[Validators.required]],
    asunto: ['',[Validators.required]],
    mensaje: ['',[Validators.required]]
  });
  }
  onSubmit(): void{
    this.submitted = true;
    if (this.formCorreo.invalid){
      console.log(this.correo);
      console.error('Error en formulario');
      return;
    }
    this.messageService.enviar(this.correo).subscribe(
      result => {
        this.submitted = false;
        console.log(result);
        this.flagToReload.emit(true);
    }
  );
 }
}
