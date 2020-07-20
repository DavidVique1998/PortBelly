import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { ImageService } from '../../service/image.service';
import { faListAlt, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
@Component({
  selector: 'app-products-market',
  templateUrl: './products-market.component.html',
  styleUrls: ['./products-market.component.css'],
})
export class ProductsMarketComponent implements OnInit {
  products: Product[];
  constructor(
    private productService: ProductService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.list();
  }
  list(): void {
    this.productService.list().subscribe((result) => {
      this.products = result;
    });
  }
}
