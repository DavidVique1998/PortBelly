import { Component, OnInit } from '@angular/core';
import { ProductInCart } from '../../models/product-in-cart';
import { ProductInCartService } from '../../service/product-in-cart.service';
import { faCartPlus, faList, faUserPlus, faListAlt, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { BillService } from '../../service/bill.service';
import { Bill } from 'src/app/models/bill';
import { BodyBillService } from 'src/app/service/body-bill.service';
import { Bodybill } from 'src/app/models/bodybill';
@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent implements OnInit {
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
  bodyBill: Bodybill;
  constructor(
    private productInCartService: ProductInCartService,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private billService: BillService,
    private bodyBillService: BodyBillService
  ) { }

  ngOnInit(): void {
    this.onReset();
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
                this.recibo(element);
              });
            }
          }
        });
        // -----------------------------------------------------------------------
      }
    });
  }

  onReset(): void {
    this.productsPrice = [];
    this.precioTotal = 0;
    this.productsInCart = [];
    this.bodyBill = new Bodybill();
    this.getProductosEnCarrito();
  }

  setFacturaCompleta(): void{
    if (this.cliente != null){
      this.bodyBill = new Bodybill();
      this.bodyBill.CabezaFactura = new Bill();
      this.bodyBill.CabezaFactura.cln_id = this.cliente.cln_id;
      this.bodyBill.car_id = this.productsInCart[0].car_id;
      this.bodyBillService.create(this.bodyBill).subscribe(result => {
        console.log(result);
      }, error => {
        console.log(error);
      });
    }
    else{
      console.log(' No se a enviado nada');
    }
  }

  setFactura(): void{
    if ( this.clienteService != null){

    }
  }
}
