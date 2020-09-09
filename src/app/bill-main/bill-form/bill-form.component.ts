import { Component, OnInit } from '@angular/core';
import { ProductInCart } from '../../models/product-in-cart';
import { ProductInCartService } from '../../service/product-in-cart.service';
import { faCartPlus, faList, faUserPlus, faListAlt, faEye, faPencilAlt, faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { BillService } from '../../service/bill.service';
import { Bill } from 'src/app/models/bill';
import { BodyBillService } from 'src/app/service/body-bill.service';
import { Bodybill } from 'src/app/models/bodybill';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

import { EmailService } from 'src/app/service/email.service';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/service/cart.service';
import { Correo } from 'src/app/Models/correo';
import { PaymentService } from 'src/app/service/payment.service';
import { Payment } from 'src/app/Models/payment';
import Swal from 'sweetalert2';

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
  productsPrice: Array<number> = [];
  contador = 0;
  precioTotal = 0;
  faPlusSquare = faPlusSquare;
  bill = new Bill();
  cliente: Cliente;
  bodyBill: Bodybill;
  usuario: Usuario;
  payment: Payment;
  fecha = Date.now();
  llave = false;
  constructor(
    private productInCartService: ProductInCartService,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private billService: BillService,
    private bodyBillService: BodyBillService,
    private usuarioService: UsuarioService,
    private correoService: EmailService,
    private cartServicie: CartService,
    private paymentService: PaymentService,
  ) { }

  ngOnInit(): void {
    this.getUsuario();
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
    this.productsInCart = [];
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
        }, err => {
          console.log(err);
        } );

        this.billService.getBillByCli(this.cliente.cln_id).subscribe(parametro => {
          this.bill = parametro;
        }, err => {
          console.log(err);
        });
        // -----------------------------------------------------------------------
        this.getPayment();
      }
    });
  }

  getPayment(): void {
    this.paymentService.getUniquePayments(this.cliente.cln_id).subscribe(
      (result) => {
        console.log(result);
        if ( result != null){
          this.payment = result;
          this.llave = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onReset(): void {
    this.productsPrice = [];
    this.precioTotal = 0;
    this.productsInCart = [];
    this.bodyBill = new Bodybill();
    this.getProductosEnCarrito();
    this.llave = false;
  }

  getUsuario(): void{
    this.usuario = this.usuarioService.getUsuario();
  }

// Enviamos factura al backend
  setFacturaCompleta(): void{
    if (this.cliente != null){
      if (this.payment != null){
        this.bodyBill = new Bodybill();
        this.bodyBill.cbf_id = this.bill.cbf_id;
        this.bodyBill.car_id = this.productsInCart[0].car_id;
        this.bodyBillService.create(this.bodyBill).subscribe(result => {
          this.setFacturaACorreo();
          this.putCarrito();
        }, error => {
          console.log(error);
        });
      }
      else{
        Swal.fire({
          title: 'Error',
          text: 'Agregar Metodo de pago',
          icon: 'error',
        });
        return;
      }
    }
    else{
      console.log(' No se a enviado nada');
    }
  }

  setFacturaACorreo(): void{
    if ( this.clienteService != null && this.usuario != null){
      const correo = new Correo();
      correo.correo = this.usuario.uso_cor;
      correo.asunto = 'Factura Portbelly';
      correo.nombre = 'Portbelly Store';
      correo.mensaje = '<h1>Nº Productos:</h1> ' + this.contador + '\n Total: ' + this.precioTotal  + '\n Gracias por su compra vuelva pronto!!';
      this.correoService.enviar(correo).subscribe(result => {
        console.log(result);
      }, error => {
        console.log(error);
      });
    }
  }

  putCarrito(): void{
    const id = this.productsInCart[0].car_id;
    if (id != null){
      const cart = new Cart();
      cart.car_id = id;
      cart.car_tipo = 'Pagado';
      cart.cln_id = this.cliente.cln_id;
      this.cartServicie.update(cart).subscribe(result => {
        // console.log( result );
        this.onReset();
      }, error => {
        console.log(error);
      });
    }
  }
}
