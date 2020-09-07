import { Component, OnInit } from '@angular/core';
import { ProductInCart } from '../../models/product-in-cart';
import { ProductInCartService } from '../../service/product-in-cart.service';
import { faCartPlus, faList, faUserPlus, faListAlt, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { ImageService } from '../../service/image.service';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from 'src/app/models/cliente';
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
  productsInCart: Array<ProductInCart> = [];
  productsInCartImages: Array<SafeUrl> = [];
  productsPrice: Array<number> = [];
  contador = 0;
  precioTotal = 0;
  cliente: Cliente;
  constructor(
    private productInCartService: ProductInCartService,
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private clienteService: ClienteService,
  ) {}

  ngOnInit(): void {
    this.productsInCartImages = [];
    this.productsPrice = [];
    this.precioTotal = 0;
    this.productsInCart = [];
    this.getProductosEnCarrito();
  }

  recibo(productInCart: ProductInCart): void{
    const product = productInCart.Producto;
    const valor = Number(product.prd_prc);
    let total = 0.0;
    if (product.Promocion.prm_tip){
      // Número de productos fuera de la promoción
      const cantidadPromocion =  productInCart.pcr_cnt % Number(product.Promocion.prm_can);
      // Cantidad de productos con la promoción
      const dividir = (productInCart.pcr_cnt - cantidadPromocion) / Number(product.Promocion.prm_can);
      // Resultado total sumado al precio final
      total = (dividir + cantidadPromocion) * valor;
    }
    else{
      // Total por porcentaje de descuento sobre 100 sumado al precio final
      total = (productInCart.pcr_cnt * valor) * ((100 - Number(product.Promocion.prm_por)) / 100);
    }
    this.productsPrice.push(total);
    this.precioTotal += total;
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
          this.productInCartService.delete(p).subscribe((res) => {
            this.ngOnInit();
          });
            // window.location.reload();
        }
      });
  }

  getImageFromServiceEject(nombre: string): any{
    this.imageService.getProfileImage(nombre).subscribe(
      (data: any) => {
        const objectURL = 'data:image/jpeg;base64,' + data;
        this.productsInCartImages.push( this.sanitizer.bypassSecurityTrustUrl(objectURL));
        return this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      (error) => {
        return '/assets/img/UploadImage.png';
      }
    );
  }

  getProductosEnCarrito(): void{
    this.clienteService.getCliente().subscribe((param) => {
      this.cliente = param;
      if (this.cliente != null){
        // ----------------------------------------------------------------------
        this.productInCartService.getProductPenInCartByCli(this.cliente.cln_id).subscribe((parametro) => {
          this.productsInCart = parametro;
          if (this.productsInCart != null){
            this.contador = this.productsInCart.length;
            if (this.contador !== 0){
              this.productsInCart.forEach(element => {
                this.getImageFromServiceEject(element.Producto.prd_img);
                this.recibo(element);
              });
            }
          }
        });
        // -----------------------------------------------------------------------
      }
    });
  }
}
