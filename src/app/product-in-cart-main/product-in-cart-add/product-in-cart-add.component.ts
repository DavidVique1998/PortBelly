import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { faUserPlus, faListAlt, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import {faDollarSign, faRuler, faPager, faSave, faTimes, faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faTag, faAlignJustify, faGripVertical, faImage, faList} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { ImageService } from '../../service/image.service';
import { ProductInCart } from '../../models/product-in-cart';
import { ProductInCartService } from '../../service/product-in-cart.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from '../../service/cart.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-product-in-cart-add',
  templateUrl: './product-in-cart-add.component.html',
  styleUrls: ['./product-in-cart-add.component.css'],
  providers: [ImageService]
})
export class ProductInCartAddComponent implements OnInit {
  faUserPlus = faUserPlus;
  faListAlt = faListAlt;
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  aPlus = faPlus;
  faTimes = faTimes;
  faSave = faSave;
  faIdCard = faIdCard;
  faTag = faTag;
  faAlignJustify = faAlignJustify;
  faGripVertical = faGripVertical;
  faImage = faImage;
  faDollarSign = faDollarSign;
  faRuler = faRuler;
  faPager = faPager;
  faCartPlus = faCartPlus;
  faList = faList;
  image: Variable;
  caption: Variable;
  product: Product;
  productInCart: ProductInCart;
  public formProductInCart: FormGroup;
  submitted = false;
  imageUrl = '/assets/img/UploadImage.png';
  fileToUpload: File = null;
  base64data: string;
  imageToShow: any = '/assets/img/UploadImage.png';
  carts: Cart[];
  constructor(
    private imageService: ImageService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private productInCartService: ProductInCartService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.listCarts();
    this.productInCart = new ProductInCart();
    this.formProductInCart = this.formBuilder.group({
      car_id: ['', [Validators.required]],
      pcr_cnt: ['', [Validators.required]],
    });
    this.getProductFromService();
  }
  get f(): any {
    return this.formProductInCart.controls;
  }
  public register(): void {
    const user = this.formProductInCart.value;
    console.log(user);
  }
  onSubmit(): void{
    if (this.formProductInCart.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Error en formulario',
        icon: 'error',
      });
      console.error('Error en formulario');
      return;
    }
    this.productInCart.prd_id = this.product.prd_id;
    this.productInCart.pcr_est = 'Agregado';
    console.log(this.productInCart);
    this.productInCartService.create(this.productInCart).subscribe((result) => {
      this.submitted = false;
      console.log(result);
    });
  }
  onReset(): void {
    this.submitted = false;
    this.formProductInCart.reset();
    this.productInCart = new ProductInCart();
  }

  // Obtiene el producto segun la id
  getProductFromService(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.product = new Product();
      if (params['id']) {
        this.productService.retrive(params['id']).subscribe((result) => {
          (this.product = result), this.getImageFromService();
        });
      }
    });
  }
  // Obtien la imagen respecto a ese producto
  getImageFromService(): void {
    this.imageService.getProfileImage(this.product.prd_img).subscribe(
      (data: any) => {
        const objectURL = 'data:image/jpeg;base64,' + data;
        this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listCarts(): void {
    this.cartService
      .list()
      .subscribe((result) => (this.carts = result));
  }

}
