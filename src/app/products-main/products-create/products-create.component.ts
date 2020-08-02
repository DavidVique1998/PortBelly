import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
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
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { Promocion } from '../../models/promocion';
import { PromocionService } from '../../service/promocion.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css'],
  providers: [ImageService],
})
export class ProductsCreateComponent implements OnInit {
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
  categorias: Categoria[];
  promociones: Promocion[];
  constructor(
    private imageService: ImageService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private promocionService: PromocionService
  ) {}

  ngOnInit(): void {
    this.listCategoria();
    this.listPromocion();
    this.product = new Product();
    this.formProduct = this.formBuilder.group({
      prd_img: ['', [Validators.required]],
      cat_id: ['', [Validators.required]],
      prm_id: ['', [Validators.required]],
      prd_nom: ['', [Validators.required]],
      prd_tal: ['', [Validators.required]],
      prd_crt: ['', [Validators.required]],
      prd_cnt: ['', [Validators.required]],
      prd_prc: ['', [Validators.required]],
    });
    // this.buildForm();
  }
  private buildForm(): void {
    const prdCat = 1;
    const prdPrm = 1;
    const prdNom = '';
    const prdImg = File;
    const prdTal = '';
    const prdCrt = '';
    const prdCnt = 1;
    const prdPrc = 0.01;
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    const name = 'JOHN DOE';
    this.formProduct = this.formBuilder.group({
      prdCat: prdCat.toString(),
      prdPrm: prdPrm.toString(),
      prdNom: prdNom.toLowerCase(),
      prdTal: prdTal.toLowerCase(),
      prdCrt: prdCrt.toLowerCase(),
      prdCnt: prdCnt.toString(),
      prdPrc: prdPrc.toString(),
      registeredOn: today,
      name: name.toLowerCase(),
      email: 'john@angular.io',
      password: '',
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
      return;
    }
    this.imageService
      .postFile(this.product.prd_nom, this.fileToUpload)
      .subscribe((data) => {
        this.product.prd_img = data;
        console.log(data);
        this.productService.create(this.product).subscribe((result) => {
          this.submitted = false;
          console.log(result);
          this.flagToReload.emit(true);
        });
      });
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
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
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
