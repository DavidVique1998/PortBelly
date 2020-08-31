import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categoria } from '../../models/categoria';
import {  FormBuilder, FormGroup , Validators} from '@angular/forms';
import { faUserPlus, faIdCard, faSave, faTimes, faTag, faWindowRestore} from '@fortawesome/free-solid-svg-icons';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  faTimes = faTimes;
  faTag = faTag;
  faIdCard = faIdCard;
  faSave = faSave;
  @Input() categoria: Categoria;
  @Input() title: string;
  @Output() flagToReload = new EventEmitter<boolean>();
  form: FormGroup;
  submitted = false;
  constructor(private categoriasService: CategoriaService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.categoria = new Categoria();
    this.form = this.formBuilder.group({
      nombres: ['', [Validators.required]],
    });
  }
  get f(): any {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid){
      console.error('Error en formulario');
      return;
    }
    this.categoriasService.create(this.categoria).subscribe(
      result => {
        this.submitted = false;
        console.log(result);
        this.flagToReload.emit(true);
      }
    );
  }
  onReset(): void {
    this.submitted = false;
    this.ngOnInit();
    this.form.reset();
    this.categoria = new Categoria();
    this.flagToReload.emit(true);
  }
}
