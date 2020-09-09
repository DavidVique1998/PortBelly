import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { GoogleMapsModule } from '@angular/google-maps';
registerLocaleData(localeEs);
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesMainComponent } from './categories-main/categories-main.component';
import { CategoriesListComponent } from './categories-main/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories-main/categories-form/categories-form.component';
import { PromotionMainComponent } from './promotion-main/promotion-main.component';
import { PromotionFormComponent } from './promotion-main/promotion-form/promotion-form.component';
import { PromotionListComponent } from './promotion-main/promotion-list/promotion-list.component';
import { TipoPromocionPipe } from './shared/tipo-promocion.pipe';
import { ProductInCartMainComponent } from './product-in-cart-main/product-in-cart-main.component';
import { ProductInCartListComponent } from './product-in-cart-main/product-in-cart-list/product-in-cart-list.component';
import { ProductInCartCreateComponent } from './product-in-cart-main/product-in-cart-create/product-in-cart-create.component';
import { ProductInCartAddComponent } from './product-in-cart-main/product-in-cart-add/product-in-cart-add.component';
import { UsuarioMainComponent } from './usuario-main/usuario-main.component';
import { UserMainComponent } from './user-main/user-main.component';
import { UserSignInMainComponent } from './user-main/user-sign-in-main/user-sign-in-main.component';
import { UserSignUpMainComponent } from './user-main/user-sign-up-main/user-sign-up-main.component';
import { UserSignInFormComponent } from './user-main/user-sign-in-main/user-sign-in-form/user-sign-in-form.component';
import { UserSignUpFormComponent } from './user-main/user-sign-up-main/user-sign-up-form/user-sign-up-form.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { PaymentMainComponent } from './payment-main/payment-main.component';
import { PaymentFormComponent } from './payment-main/payment-form/payment-form.component';
import {NgxStripeModule} from 'ngx-stripe';
import { BillMainComponent } from './bill-main/bill-main.component';
import { BillFormComponent } from './bill-main/bill-form/bill-form.component';
import { ChartsModule } from 'ng2-charts';
import { ReportMainComponent } from './report-main/report-main.component';
import { ReportDetailsComponent } from './report-main/report-details/report-details.component';
import { BarChartComponent } from './report-main/bar-chart/bar-chart.component';
import { PieChartComponent } from './report-main/pie-chart/pie-chart.component';
import { ProductInCartViewComponent } from './product-in-cart-main/product-in-cart-view/product-in-cart-view.component';
// import {} from '@stripe/stripe-js';

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
    CategoriesFormComponent,
    PromotionMainComponent,
    PromotionFormComponent,
    PromotionListComponent,
    TipoPromocionPipe,
    ProductInCartMainComponent,
    ProductInCartListComponent,
    ProductInCartCreateComponent,
    ProductInCartAddComponent,
    UsuarioMainComponent,
    UserMainComponent,
    UserSignInMainComponent,
    UserSignUpMainComponent,
    UserSignInFormComponent,
    UserSignUpFormComponent,
    ContactanosComponent,
    PaymentMainComponent,
    PaymentFormComponent,
    BillMainComponent,
    BillFormComponent,
    ReportMainComponent,
    ReportDetailsComponent,
    BarChartComponent,
    PieChartComponent,
    ProductInCartViewComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    NgxFileDropModule,
    NgxStripeModule.forRoot('pk_test_51HOS6pLhIET9gHWLGJdFB5a8UfCdZknGfi7HgfieaXSznHII8HMGHm4jngswuBvmEFU5SCt9LXH2dBUYpRfxjCkT00z0d52cND'),
    ChartsModule,
    // Stripe,
  ],
  providers: [
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor,
      multi: true,
    },
    ImageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-EC',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
