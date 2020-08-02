import { Component, OnInit, Input, Output, EventEmitter   } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { faUserPlus, faListAlt, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import {faDollarSign, faRuler, faPager, faSave, faTimes, faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faTag, faAlignJustify, faGripVertical, faImage, faList} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { ImageService } from '../../service/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { error } from '@angular/compiler/src/util';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { Promocion } from '../../models/promocion';
import { PromocionService } from '../../service/promocion.service';
@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css'],
  providers: [ImageService],
})
export class ProductsEditComponent implements OnInit {
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
  @Input() product: Product;
  @Input() title: string;
  @Output() flagToReload = new EventEmitter<boolean>();
  public formProduct: FormGroup;
  submitted = false;
  imageUrl = '/assets/img/UploadImage.png';
  fileToUpload: File = null;
  base64data: string;
  imageToShow: any = '/assets/img/UploadImage.png';
  cambio = false;
  lastImagen: string;
  categorias: Categoria[];
  promociones: Promocion[];
  constructor(
    private imageService: ImageService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private categoriaService: CategoriaService,
    private promocionService: PromocionService
  ) {}

  ngOnInit(): void {
    this.listCategoria();
    this.listPromocion();
    this.product = new Product();
    this.getProductFromService();
    this.formProduct = this.formBuilder.group({
      cat_id: ['', [Validators.required]],
      prm_id: ['', [Validators.required]],
      prd_nom: ['', [Validators.required]],
      prd_tal: ['', [Validators.required]],
      prd_crt: ['', [Validators.required]],
      prd_cnt: ['', [Validators.required]],
      prd_prc: ['', [Validators.required]],
    });
  }
  public register(): void {
    const user = this.formProduct.value;
    console.log(user);
  }
  onSubmit(image): void {
    this.submitted = true;
    if (this.formProduct.invalid) {
      console.error('Error en formulario');
      swal
        .fire({
          title: 'Error en el formulario',
          text: 'El formulario debe contener todos los datos',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        })
        .then((result) => {
          if (result.value) {
            return;
          }
        });
      return;
    }
    console.log(this.product);
    // Si la Imagen Cambió
    if (this.cambio) {
      console.log(this.cambio);
      console.log(this.lastImagen);
      // Elimino el archivo
      this.imageService.deleteFile(this.lastImagen).subscribe(
        (data) => {
          // Subo la imagen
          this.imageService
            .postFile(this.product.prd_nom, this.fileToUpload)
            .subscribe((data2) => {
              this.product.prd_img = data2;
              console.log(data2);
              // Actualizo el producto
              this.productService.update(this.product).subscribe((result) => {
                this.submitted = false;
                console.log(result);
                this.flagToReload.emit(true);
              });
            });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log(this.cambio);
      // Actualizo el producto
      this.productService.update(this.product).subscribe((result) => {
        this.submitted = false;
        console.log(result);
        this.flagToReload.emit(true);
      });
    }
  }
  onReset(): void {
    this.submitted = false;
    this.formProduct.reset();
    this.product = new Product();
  }
  handleFileInput(file: FileList): void {
    this.fileToUpload = file.item(0);
    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageToShow = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    this.cambio = true;
  }

  // Obtiene el producto segun la id
  getProductFromService(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.product = new Product();
        if (params['id']) {
          this.productService.retrive(params['id']).subscribe((result) => {
            (this.product = result), this.getImageFromService();
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // Obtiene la imagen respecto a ese producto
  getImageFromService(): void {
    this.imageService.getProfileImage(this.product.prd_img).subscribe(
      (data: any) => {
        const objectURL = 'data:image/jpeg;base64,' + data;
        this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        // Guarda el nombre de la imagen anterior si hay cambio
        this.lastImagen = this.product.prd_img;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  listCategoria(): void {
    this.categoriaService
      .list()
      .subscribe((result) => (this.categorias = result));
  }
  listPromocion(): void {
    this.promocionService
      .list()
      .subscribe((result) => (this.promociones = result));
  }
}
