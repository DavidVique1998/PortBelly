import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product';
import { faUserPlus, faListAlt, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import {faDollarSign, faRuler, faPager, faSave, faTimes, faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faTag, faAlignJustify, faGripVertical, faImage, faList} from '@fortawesome/free-solid-svg-icons';
import { ImageService } from '../../service/image.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
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
  product: Product;
  imageUrl = '/assets/img/UploadImage.png';
  base64data: string;
  imageToShow: any = '/assets/img/UploadImage.png';
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private imageService: ImageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getProductFromService();
  }
  // Obtiene el producto segun la id
  getProductFromService(): void{
    this.activatedRoute.params.subscribe(
      params => {
        this.product = new Product();
        if ( params[ "id" ]){
          this.productService.retrive(params["id"]).subscribe(
            result => {this.product = result,
              this.getImageFromService();
            }
          );
        }
      }
    );
  }
  // Obtien la imagen respecto a ese producto
  getImageFromService(): void{
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
}
