import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { faUserPlus, faListAlt, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { ImageService } from 'src/app/service/image.service';
import { error } from '@angular/compiler/src/util';
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
  products: Product[] = [];

  constructor(private productService: ProductService, private imageService: ImageService,) { }

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
        this.imageService.deleteFile(p.prd_img).subscribe(res => {console.log(res),
          this.productService.delete(p).subscribe(respuesta => console.log(respuesta)),
          this.ngOnInit(),
          this.OnReset();
        }, e => {
          console.log(e);
        }
        );
      }
    });
  }

  list(): void{
    this.productService.list().subscribe(result => {this.products = result; });
  }

  OnReset(): void{
    // this.products = [];
    this.ngOnInit();
  }
}
