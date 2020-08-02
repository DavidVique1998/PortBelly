import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsMainComponent } from './products-main/products-main.component';
import { ProductsListComponent } from './products-main/products-list/products-list.component';
import { ProductsDeletComponent } from './products-main/products-delet/products-delet.component';
import { ProductsEditComponent } from './products-main/products-edit/products-edit.component';
import { ProductsMarketComponent } from './products-main/products-market/products-market.component';
import { ProductService } from './service/product.service';
import { ServiceInterceptor } from './service/service.interceptor';
import { ProductsViewComponent } from './products-main/products-view/products-view.component';
import { ProductMarketComponent } from './products-main/product-market/product-market.component';
import { ProductsCreateComponent } from './products-main/products-create/products-create.component';
import { ImageService } from './service/image.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesMainComponent } from './categories-main/categories-main.component';
import { CategoriesListComponent } from './categories-main/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories-main/categories-form/categories-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsMainComponent,
    ProductsListComponent,
    ProductsDeletComponent,
    ProductsEditComponent,
    ProductsMarketComponent,
    ProductsViewComponent,
    ProductMarketComponent,
    ProductsCreateComponent,
    CategoriesMainComponent,
    CategoriesListComponent,
    CategoriesFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ServiceInterceptor,
    multi: true
  },
  ImageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ServiceInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
