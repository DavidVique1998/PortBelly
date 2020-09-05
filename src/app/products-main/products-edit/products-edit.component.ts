import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import swal from 'sweetalert2';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
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
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css'],
  providers: [ImageService],
})
export class ProductsEditComponent implements OnInit {
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
  @Output() flagToReload = new EventEmitter<boolean>();
  public formProduct: FormGroup;
  submitted = false;
  imageUrl = '/assets/img/UploadImage.png';
  fileToUpload: File = null;
  base64data: string;
  imageToShow: any = '/assets/img/UploadImage.png';
  lastImagen: string;
  categorias: Categoria[];
  promociones: Promocion[];
  llave = false;
  tallas: Array<string> = ['XL', 'L', 'M', 'S', 'XS'];
  public files: NgxFileDropEntry[] = [];
  constructor(
    private imageService: ImageService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private categoriaService: CategoriaService,
    private promocionService: PromocionService,
    private http: HttpClient
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

    // Si la Imagen Cambió
    if (this.llave) {
      // Elimino el archivo
      this.imageService.deleteFile(this.lastImagen).subscribe(
        (data) => {
          console.log('La imagen se actualizó correctamente');
        },
        (error) => {
          console.log(error);
        }
      );
      this.onUpdate();
    }
    else{
      // Actualizo el producto
      this.productService.update(this.product).subscribe((result) => {
        this.submitted = false;
        console.log(result);
        this.flagToReload.emit(true);
      });
    }
    console.log(this.llave);
  }
      // Imagen y producto funcioanl porfinnnnn!!!!
  onUpdate(): void{
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
          this.product.prd_img = res.toString();
          this.productService.update(this.product).subscribe((result) => {
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
    this.imageToShow  = '/assets/img/UploadImage.png';
    this.getProductFromService();
    this.product = new Product();
    this.llave = false;
  }
  // handleFileInput(file: FileList): void {
  //   this.fileToUpload = file.item(0);
  //   // Show image preview
  //   const reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imageToShow = event.target.result;
  //   };
  //   reader.readAsDataURL(this.fileToUpload);
  //   this.llave = true;
  // }

  // Obtiene el producto segun la id
  getProductFromService(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.product = new Product();
        if (params.id) {
          this.productService.retrive(params.id).subscribe((result) => {
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
        // Incluir el swat Alert
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
          const reader = new FileReader();
          reader.onload = (event: any) => {
            this.imageToShow = event.target.result;
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
}
