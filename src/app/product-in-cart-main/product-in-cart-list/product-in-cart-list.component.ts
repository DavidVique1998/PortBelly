import { Component, OnInit } from '@angular/core';
import { ProductInCart } from '../../models/product-in-cart';
import { ProductInCartService } from '../../service/product-in-cart.service';
import { faCartPlus, faList, faUserPlus, faListAlt, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { ImageService } from '../../service/image.service';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-product-in-cart-list',
  templateUrl: './product-in-cart-list.component.html',
  styleUrls: ['./product-in-cart-list.component.css'],
})
export class ProductInCartListComponent implements OnInit {
  faUserPlus = faUserPlus;
  faCartPlus = faCartPlus;
  faListAlt = faListAlt;
  faList = faList;
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  productsInCart: ProductInCart[];
  productsInCartImages: Array<SafeUrl> = [];
  constructor(
    private productInCartService: ProductInCartService,
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.productInCartService.list().subscribe((result) => {
      this.productsInCart = result;
      this.productsInCart.forEach(element => {
        console.log(element.Producto.prd_img);
        this.getImageFromServiceEject(element.Producto.prd_img);
      });
    });
  }

  delete(p: ProductInCart): void {
    swal
      .fire({
        title: '¿Está seguro de continuar?',
        text:
          'El producto: ' +
          p.Producto.prd_nom +
          ' con id: ' +
          p.Producto.prd_id +
          ' será eliminado de su carrito.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.value) {
          this.productInCartService
            .delete(p)
            .subscribe((result) => console.log(result)),
            window.location.reload();
        }
      });
  }

  getImageFromServiceEject(nombre: string): void {
    this.imageService.getProfileImage(nombre).subscribe(
      (data: any) => {
        const objectURL = 'data:image/jpeg;base64,' + data;
        this.productsInCartImages.push( this.sanitizer.bypassSecurityTrustUrl(objectURL));
        console.log(this.sanitizer.bypassSecurityTrustUrl(objectURL));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
