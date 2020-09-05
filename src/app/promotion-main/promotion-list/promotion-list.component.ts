import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PromocionService } from '../../service/promocion.service';
import { Promocion } from '../../models/promocion';
import {
  faListAlt,
  faEye,
  faPencilAlt,
  faUserPlus,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.css'],
})
export class PromotionListComponent implements OnInit {
  faListAlt = faListAlt;
  faUserPlus = faUserPlus;
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  promociones: Array<Promocion> = [];
  @Input() flagToReload;
  @Output() productoToUpdate = new EventEmitter<Promocion>();
  @Output() reloadComplete = new EventEmitter<boolean>();
  constructor(private categoriasService: PromocionService) {}

  ngOnInit(): void {
    this.list();
  }
  list(): void {
    this.categoriasService.list().subscribe((result) => {
      this.promociones = result;
      this.reloadComplete.emit(true);
    });
  }
  update(p: Promocion): void {
    this.productoToUpdate.emit(p);
    console.log(this.productoToUpdate.emit(p));
  }
  delete(promocion: Promocion): void {
    swal
      .fire({
        title: '¿Está seguro de continuar?',
        text: 'La promoción ' + promocion.prm_nom + ' será eliminada.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.value) {
          this.categoriasService.delete(promocion).subscribe((result) => {
            this.ngOnInit();
          });
        }
      });
  }
}
