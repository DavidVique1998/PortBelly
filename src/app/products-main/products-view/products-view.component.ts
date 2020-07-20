import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product';
@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  producto: Product;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params[ 'id' ]){
          this.productService.retrive(params[ 'id' ]).subscribe(
            result => this.producto = result
          );
        }
      }
    );
  }

}
