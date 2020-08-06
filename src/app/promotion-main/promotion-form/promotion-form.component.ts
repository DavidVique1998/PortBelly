import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Promocion } from '../../models/promocion';
import {  FormBuilder, FormGroup , Validators} from '@angular/forms';
import { faPercent, faUserPlus, faIdCard, faSave, faTimes, faTag} from '@fortawesome/free-solid-svg-icons';
import { PromocionService } from '../../service/promocion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.css']
})
export class PromotionFormComponent implements OnInit {
  faTimes = faTimes;
  faTag = faTag;
  faIdCard = faIdCard;
  faSave = faSave;
  faPercent = faPercent;
  @Input() promocion: Promocion;
  @Input() title: string ;
  @Output() flagToReload = new EventEmitter<boolean>();
  form: FormGroup;
  submitted = false;
  constructor(private promocionesService: PromocionService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.promocion = new Promocion();
    this.form = this.formBuilder.group({
      prm_nom: ['', [Validators.required]],
      prm_tip: ['', [Validators.required]],
      prm_can: [''],
      prm_por: [''],
    });
  }
  get f(): any {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.promocion.prm_por == null && this.promocion.prm_can == null){
      Swal.fire({
        title: 'Error',
        text: 'Especifica la catidad o porcentaje de promoción',
        icon: 'error',
      });
      console.error('Error en formulario');
      return;
    }
    if (this.form.invalid ){
      Swal.fire({
        title: 'Error',
        text: 'Error en formulario',
        icon: 'error',
      });
      console.error('Error en formulario');
      return;
    }
    if (this.promocion.prm_tip) {
      this.promocion.prm_por = '0';
    } else {
      this.promocion.prm_can = '1';
    }

    this.promocionesService.create(this.promocion).subscribe(
      result => {
        this.submitted = false;
        console.log(result);
        this.flagToReload.emit(true);
      }
    );
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.promocion = new Promocion();
    window.location.reload();
  }
}
