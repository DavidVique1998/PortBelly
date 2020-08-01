import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { faUserPlus, faListAlt, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  faUserPlus = faUserPlus;
  faListAlt = faListAlt;
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.list();
  }

  delete(p: Product): void {
    swal.fire({
      title: '¿Está seguro de continuar?',
      text: 'El producto: ' + p.prd_nom + ' con id: ' + p.prd_id + ' será eliminado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.productService.delete(p).subscribe(result => console.log(result));
      }
    });
  }

  list(): void{
    this.productService.list().subscribe(result => {this.products = result; });
  }

}
