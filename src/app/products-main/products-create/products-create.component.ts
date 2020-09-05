import { Component, OnInit, Input } from '@angular/core';
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
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { ImageService } from '../../service/image.service';
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
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css'],
  providers: [ImageService],
})
export class ProductsCreateComponent implements OnInit {
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
  @Input() product: Product;
  @Input() title: string;
  public formProduct: FormGroup;
  submitted = false;
  llave = false;
  imageUrl = '/assets/img/UploadImage.png';
  fileToUpload: File = null;
  categorias: Categoria[];
  promociones: Promocion[];
  public files: NgxFileDropEntry[] = [];
  constructor(
    private imageService: ImageService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private promocionService: PromocionService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.product = new Product();
    this.formProduct = this.formBuilder.group({
      // prd_img: ['', [Validators.required]],
      cat_id: ['', [Validators.required]],
      prm_id: ['', [Validators.required]],
      prd_nom: ['', [Validators.required]],
      prd_tal: ['', [Validators.required]],
      prd_crt: ['', [Validators.required]],
      prd_cnt: ['', [Validators.required]],
      prd_prc: ['', [Validators.required]],
    });
    this.listCategoria();
    this.listPromocion();
    // this.buildForm();
  }
  get f(): any {
    return this.formProduct.controls;
  }
  public register(): void {
    const user = this.formProduct.value;
    console.log(user);
  }
  async onSubmit(image): Promise<void> {
    this.submitted = true;

    if (this.formProduct.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Error en formulario',
        icon: 'error',
      });
      console.error('Error en formulario');
      return;
    }
    // Imagen y producto funcioanl porfinnnnn!!!!
    const fd = new FormData();
    fd.append('image', this.fileToUpload, this.fileToUpload.name);
    this.http
      .post('https://localhost:44386/api/Imagen', fd, {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.product.prd_img = res.toString();
          this.productService.create(this.product).subscribe((result) => {
            this.onReset();
            this.ngOnInit();
            this.submitted = false;
          });
        },
        (error) => {
          console.log(error);
        }
        // -------------------------------------------
      );
  }
  onReset(): void {
    this.submitted = false;
    this.formProduct.reset();
    this.imageUrl = '/assets/img/UploadImage.png';
    this.product = new Product();
    this.llave = false;
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

  // --------------------------------------------------------------------------------------
  // Drop File Beta

  public dropped(files: NgxFileDropEntry[]): void {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          const reader = new FileReader();
          reader.onload = (event: any) => {
            this.imageUrl = event.target.result;
          };
          this.fileToUpload = file;
          reader.readAsDataURL(file);
          this.llave = true;
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event): void {
    console.log(event);
  }

  public fileLeave(event): void {
    console.log(event);
  }
  // ----------------------Metodo mandar imagen funcionando
  onUpLoad(): void {
    const fd = new FormData();
    fd.append('image', this.fileToUpload, this.fileToUpload.name);
    this.http
      .post('https://localhost:44386/api/Imagen', fd, {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
