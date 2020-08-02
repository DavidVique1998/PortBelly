import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { ImageService } from '../../service/image.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-product-market',
  templateUrl: './product-market.component.html',
  styleUrls: ['./product-market.component.css'],
})
export class ProductMarketComponent implements OnInit {
  @Input() product: Product;
  base64data: string;
  imageToShow: any;
  constructor(
    private productService: ProductService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getImageFromService(this.product.prd_img);
  }
  getImageFromService(name: string): void {
    this.imageService.getProfileImage(name).subscribe(
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
