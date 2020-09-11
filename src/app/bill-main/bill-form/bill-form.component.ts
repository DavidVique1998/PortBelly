import { Component, OnInit } from '@angular/core';
import { ProductInCart } from '../../models/product-in-cart';
import { ProductInCartService } from '../../service/product-in-cart.service';
import {
  faCartPlus,
  faList,
  faUserPlus,
  faListAlt,
  faEye,
  faPencilAlt,
  faTrash,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
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
  styleUrls: ['./bill-form.component.css'],
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
  fechCorreo = new Date().toLocaleDateString();
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
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.getUsuario();
    this.onReset();
  }
  recibo(productInCart: ProductInCart): void {
    const product = productInCart.Producto;
    const valor = Number(product.prd_prc);
    let total = 0.0;
    if (product.Promocion.prm_tip) {
      // Número de productos fuera de la promoción
      const cantidadPromocion =
        productInCart.pcr_cnt % Number(product.Promocion.prm_can);
      // Cantidad de productos con la promoción
      const dividir =
        (productInCart.pcr_cnt - cantidadPromocion) /
        Number(product.Promocion.prm_can);
      // Resultado total sumado al precio final
      total = (dividir + cantidadPromocion) * valor;
    } else {
      // Total por porcentaje de descuento sobre 100 sumado al precio final
      total =
        productInCart.pcr_cnt *
        valor *
        ((100 - Number(product.Promocion.prm_por)) / 100);
    }
    this.productsPrice.push(total);
    this.precioTotal += total;
  }

  getProductosEnCarrito(): void {
    this.productsInCart = [];
    this.clienteService.getCliente().subscribe((param) => {
      this.cliente = param;
      if (this.cliente != null) {
        // ----------------------------------------------------------------------
        this.productInCartService
          .getProductPenInCartByCli(this.cliente.cln_id)
          .subscribe(
            (parametro) => {
              this.productsInCart = parametro;
              if (this.productsInCart != null) {
                this.contador = this.productsInCart.length;
                if (this.contador !== 0) {
                  this.productsInCart.forEach((element) => {
                    this.recibo(element);
                  });
                }
              }
            },
            (err) => {
              console.log(err);
            }
          );

        this.billService.getBillByCli(this.cliente.cln_id).subscribe(
          (parametro) => {
            this.bill = parametro;
          },
          (err) => {
            console.log(err);
          }
        );
        // -----------------------------------------------------------------------
        this.getPayment();
      }
    });
  }

  getPayment(): void {
    this.paymentService.getUniquePayments(this.cliente.cln_id).subscribe(
      (result) => {
        if (result != null) {
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

  getUsuario(): void {
    this.usuario = this.usuarioService.getUsuario();
  }

  // Enviamos factura al backend
  setFacturaCompleta(): void {
    if (this.cliente != null) {
      if (this.payment != null) {
        this.bodyBill = new Bodybill();
        this.bodyBill.cbf_id = this.bill.cbf_id;
        this.bodyBill.car_id = this.productsInCart[0].car_id;
        this.bodyBillService.create(this.bodyBill).subscribe(
          (result) => {
            this.setFacturaACorreo();
            this.putCarrito();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Agregar Metodo de pago',
          icon: 'error',
        });
        return;
      }
    } else {
      console.log(' No se a enviado nada');
    }
  }

  getHeadFactura(): string {
    // const head =
    // '<head> <title>Enviar Email con Bootstrap Modal Popup Ajax & PHP</title><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script> <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> <style> .btn-success { margin: 10px;} </style> </head>';
    const head =
      '<head><meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous"><title>Hello, world!</title>  </head>';
    return head;
  }

  getBodyFactura(): string {
    const body1 =
      '  <body>' +
      '<div class="container"><div class="panel panel-default"> <div class="panel-heading"><ul class="nav nav-pills p-3 mb-2 bg-white text-dark"><li role="presentation" > <h4> PortBelly</h4> </li><svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-cart-check-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM4 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm7 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm.354-7.646a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/></svg></ul></div>';
    const body2 =
      '<div class="panel-body" ><div class="row"><div class="col-xl-12 col-md-12 col-sm-12 col-12" style="text-align: left;"><h4><b>Factura Portbelly</b></h4> <table border = "1" CELLPADDING=10 CELLSPACING=0 class="table table-bordered"><tbody><tr><th scope="row">Nombre:</th><td>' +
      this.usuario.uso_nom +
      '</td></tr><tr><th scope="row">Correo:</th><td>' +
      this.usuario.uso_cor +
      '</td></tr><tr><th scope="row">Metodo de pago:</th><td style="text-align: center;">' +
      this.payment.pgo_ntg.substring(0, 4) +
      '-xxxx-xxxx-xxxx' +
      '</td></tr><tr><th scope="row">Fecha:</th><td>' +
      new Date().toLocaleDateString() +
      '</td></tr>';
    // '</tbody></table>'
    const body3 =
      // '<table border = "1" CELLPADDING=10 CELLSPACING=0 class="table table-bordered"><thead class="thead-dark">'
      '<tr><th>N°</th><th>Nombre</th><th>Cantidad</th><th>Precio</th><th>Promoción</th><th>Total</th></tr></thead><tbody>';
    let body4 = ' <tr>';
    let i = 0;
    this.productsInCart.forEach((item) => {
      body4 =
        body4 +
        '<th scope="row">' +
        (i + 1) +
        '</th><td>' +
        item.Producto.prd_id +
        '  ' +
        item.Producto.prd_nom +
        '</td><td>' +
        item.pcr_cnt +
        '</td><td>' +
        item.Producto.prd_prc +
        'c/u</td><td>' +
        item.Producto.Promocion.prm_nom +
        '</td><td>' +
        this.productsPrice[i].toFixed(2) +
        '</td>';
      i += 1;
    });
    body4 = body4 + '</tr>';
    const body5 =
      '<tr><th> </th><th> </th><th> </th><th> </th> <th> Total: </th><td>' +
      this.precioTotal.toFixed(2) +
      '</td></tr></tbody></table></div></div></div><div class="panel-footer"><a href="http://localhost:4200/" target="_blank">PortBelly</a></div></div></div>';

    const body6 =
      ' <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script><script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script></body>';
    return body2 + body3 + body4 + body5 + body6;
  }
  setFacturaACorreo(): void {
    if (this.clienteService != null && this.usuario != null) {
      const correo = new Correo();
      correo.correo = this.usuario.uso_cor;
      correo.asunto = 'Factura Portbelly';
      correo.nombre = 'Portbelly Store';
      // correo.mensaje =
      //   '<h1>Nº Productos:</h1> ' +
      //   this.contador +
      //   '\n Total: ' +
      //   this.precioTotal +
      //   '\n Gracias por su compra vuelva pronto!!';
      correo.mensaje = this.getHeadFactura() + this.getBodyFactura();
      this.correoService.enviar(correo).subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  putCarrito(): void {
    const id = this.productsInCart[0].car_id;
    if (id != null) {
      const cart = new Cart();
      cart.car_id = id;
      cart.car_tipo = 'Pagado';
      cart.cln_id = this.cliente.cln_id;
      this.cartServicie.update(cart).subscribe(
        (result) => {
          // console.log( result );
          this.onReset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
