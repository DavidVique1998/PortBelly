import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faDollarSign,
  faRuler,
  faPager,
  faSave,
  faTimes,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTag,
  faGripVertical,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { ProductInCart } from '../../models/product-in-cart';
import { ProductInCartService } from '../../service/product-in-cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { ImageService } from '../../service/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { Promocion } from '../../models/promocion';
import { PromocionService } from '../../service/promocion.service';
import {
  NgxFileDropEntry,
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
} from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-product-in-cart-view',
  templateUrl: './product-in-cart-view.component.html',
  styleUrls: ['./product-in-cart-view.component.css'],
  providers: [ImageService],
})
export class ProductInCartViewComponent implements OnInit, OnChanges {
  faTimes = faTimes;
  faSave = faSave;
  faTag = faTag;
  faGripVertical = faGripVertical;
  faDollarSign = faDollarSign;
  faRuler = faRuler;
  faPager = faPager;
  faCartPlus = faCartPlus;
  faList = faList;
  image: Variable;
  caption: Variable;

  @Input() productInCart: ProductInCart = new ProductInCart();
  cantidadPasada: number;
  public formProductInCart?: FormGroup;
  imageUrl = '/assets/img/UploadImage.png';
  fileToUpload: File = null;
  base64data: string;
  imageToShow: any = '/assets/img/UploadImage.png';
  lastImagen: string;
  categoria: Categoria;
  promocion: Promocion;
  submitted = false;
  IntPosiPattern = '0+.[0-9]*[1-9][0-9]*$';
  constructor(
    private imageService: ImageService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private categoriaService: CategoriaService,
    private promocionService: PromocionService,
    private http: HttpClient,
    private productInCartService: ProductInCartService
  ) {}

  ngOnChanges(changes: SimpleChanges): void{
    if (changes.productInCart){
      this.getImageFromService(changes.productInCart.currentValue);
      console.log('Productos en carrito cargados');
    }
  }
  ngOnInit(): void {
    this.formProductInCart = this.formBuilder.group({
      pcr_cnt: ['', [Validators.required]],
    });
    // this.getImageFromService();
  }
  get f(): any {
    return this.formProductInCart.controls;
  }
  onReset(): void {
    this.submitted = false;
    this.formProductInCart.reset();
  }

  getImageFromService(prd: ProductInCart): void {
    if (prd != null) {
      this.cantidadPasada = Number(prd.pcr_cnt);
      this.imageService
        .getProfileImage(prd.Producto.prd_img)
        .subscribe(
          (data: any) => {
            const objectURL = 'data:image/jpeg;base64,' + data;
            this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          },
          (e) => {
            console.log(e);
          }
        );
    }
  }

  onSubmit(): void {
    if (this.formProductInCart.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Error en formulario',
        icon: 'error',
      });
      return;
    }
    console.log(this.cantidadPasada);
    if (
      this.productInCart.pcr_cnt > 0 &&
      this.productInCart.pcr_cnt <=
        (Number(this.productInCart.Producto.prd_cnt) + this.cantidadPasada)
    ) {
      this.productInCartService.update(this.productInCart).subscribe(
        (result) => {
          this.submitted = false;
          this.cantidadPasada = this.productInCart.pcr_cnt;
          console.log(result);
          this.ngOnInit();
        },
        (e) => {
          console.log(e);
        }
      );
    } else {
      Swal.fire({
        title: 'Error',
        text:
          'Error la cantidad debe ser mayor a 0 y menor a ' +
          (Number(this.productInCart.Producto.prd_cnt) + this.cantidadPasada),
        icon: 'error',
      });
      return;
    }
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
