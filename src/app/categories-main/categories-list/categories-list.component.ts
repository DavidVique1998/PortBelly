import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../models/categoria';
import { faListAlt, faEye, faPencilAlt, faUserPlus, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  faListAlt = faListAlt;
  faUserPlus = faUserPlus;
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  categories: Categoria[];

  @Input() flagToReload;
  @Output() productoToUpdate = new EventEmitter<Categoria>();
  @Output() reloadComplete = new EventEmitter<boolean>();
  constructor(private categoriasService: CategoriaService) {}

  ngOnInit(): void {
    this.list();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.flagToReload.currentValue){
      if (this.flagToReload){
        this.list();
      }
    }
  }
  list(): void {
    this.categoriasService.list().subscribe((result) => {
      this.categories = result;
      this.reloadComplete.emit(true);
    });
  }
  update(p: Categoria): void {
    this.productoToUpdate.emit(p);
    console.log(this.productoToUpdate.emit(p));
  }

  delete(categoria: Categoria): void {
    swal
      .fire({
        title: '¿Está seguro de continuar?',
        text: 'La categoría ' + categoria.cat_nom + 'será eliminado.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.value) {
          this.categoriasService.delete(categoria).subscribe((result) => {
            console.log(result);
            this.ngOnInit();
          });
        }
      });
  }
}
