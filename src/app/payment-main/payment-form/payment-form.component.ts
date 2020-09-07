import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faDollarSign,
  faRuler,
  faPager,
  faSave,
  faTimes,
  faCartPlus,
  faUserPlus,
  faUser,
  faEnvelope,
  faSignInAlt,
  faKey,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTag,
  faGripVertical,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Payment } from '../../models/payment';
import { PaymentService } from '../../service/payment.service';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import {
  StripeService,
  StripeElementsService,
  StripeCardComponent,
} from 'ngx-stripe';
import {
  StripeElement,
  StripeCardElementOptions,
  StripeElementsOptions,
  StripeCardElement,
} from '@stripe/stripe-js';
@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#276fd3',
        color: '#000000',
        lineHeight: '40px',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#000000'
        },
      },
    },
  };
  element: StripeElement;
  cardi: StripeCardElement;
  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };
  faIdCard = faIdCard;
  faKey = faKey;
  faSignInAlt = faSignInAlt;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faUserPlus = faUserPlus;
  faTimes = faTimes;
  faSave = faSave;
  faTag = faTag;
  faGripVertical = faGripVertical;
  faDollarSign = faDollarSign;
  faRuler = faRuler;
  faPager = faPager;
  faCartPlus = faCartPlus;
  faList = faList;
  payment: Payment;
  cliente: Cliente;
  submitted = false;
  fecha: Date;
  public formPayment: FormGroup;
  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.payment = new Payment();
    this.formPayment = this.formBuilder.group({
      pgo_nom: ['', [Validators.required]],
      pgo_ntg: ['', [Validators.required]],
      pgo_fven_mes: ['', [Validators.required]],
      pgo_fven_year: ['', [Validators.required]],
      pgo_cseg: ['', [Validators.required]],
    });
    this.getCliente();

  }

  createToken(): void {
    const name = this.formPayment.get('pgo_nom').value;
    this.stripeService
      .createToken(this.card.element, { name,
        address_line1: '123 A Place',
        address_line2: 'Suite 100',
        address_city: 'Irving',
        address_state: 'BC',
        address_zip: 'VOE 1H0',
        address_country: 'CA'
      })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  get f(): any {
    return this.formPayment.controls;
  }
  public register(): void {
    const user = this.formPayment.value;
    console.log(user);
  }
  getCliente(): void {
    this.clienteService.getCliente().subscribe((param) => {
      this.cliente = param;
      console.log(this.cliente);
    });
  }

  onSubmit(): void {
    if (this.formPayment.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Error en formulario',
        icon: 'error',
      });
      return;
    }
    this.payment.cln_id = this.cliente.cln_id;
    const fecha = new Date();
    fecha.setMonth = this.formPayment.get('pgo_fven_mes').value;
    fecha.setFullYear = this.formPayment.get('pgo_fven_year').value;
    this.payment.pgo_fven = fecha.toString();
    console.log(this.payment);
    this.paymentService.create(this.payment).subscribe(
      (result) => {
       // this.ngOnInit();
       console.log(result);
      },
      (e) => {
        console.log(e);
      }
    );
  }
  onReset(): void {
    this.formPayment.reset();
    this.payment = new Payment();
  }
}
