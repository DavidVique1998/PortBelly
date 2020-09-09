import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-main/products-list/products-list.component';
import { ProductsMarketComponent } from './products-main/products-market/products-market.component';
import { ProductsViewComponent } from './products-main/products-view/products-view.component';
import { ProductsCreateComponent } from './products-main/products-create/products-create.component';
import { ProductsEditComponent } from './products-main/products-edit/products-edit.component';
import { CategoriesMainComponent } from './categories-main/categories-main.component';
import { PromotionMainComponent } from './promotion-main/promotion-main.component';
import { ProductInCartAddComponent } from './product-in-cart-main/product-in-cart-add/product-in-cart-add.component';
import { ProductInCartListComponent} from './product-in-cart-main/product-in-cart-list/product-in-cart-list.component';
import { UserMainComponent} from './user-main/user-main.component';
import {PaymentFormComponent} from './payment-main/payment-form/payment-form.component';
import {AuthGuard} from './guards/auth.guard';
import { ReportDetailsComponent} from './report-main/report-details/report-details.component';
import { BillFormComponent} from './bill-main/bill-form/bill-form.component';
const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'tienda',
    component: ProductsMarketComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Cliente'] },
  },
  {
    path: 'carritopersonal',
    component: ProductInCartListComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Cliente'] },
  },
  {
    path: 'productos',
    component: ProductsListComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Administrador'] },
  },
  {
    path: 'productos/ver/:id',
    component: ProductsViewComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Administrador'] },
  },
  {
    path: 'productos/crear',
    component: ProductsCreateComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Administrador'] },
  },
  {
    path: 'productos/editar/:id',
    component: ProductsEditComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Administrador'] },
  },
  {
    path: 'categorias',
    component: CategoriesMainComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Administrador'] },
  },
  {
    path: 'promociones',
    component: PromotionMainComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Administrador'] },
  },
  {
    path: 'productoencarrito/add/:id',
    component: ProductInCartAddComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Cliente'] },
  },
  { path: 'login', component: UserMainComponent },
  {
    path: '', redirectTo: 'tienda', pathMatch: 'full'
  },
  { path: 'pago',
    component: PaymentFormComponent,
    canActivate: [AuthGuard],
    data: {permittedRoles: ['Cliente']}
  },
  {
    path: 'informes',
    component: ReportDetailsComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Administrador'] },
  },
  {
    path: 'factura',
    component: BillFormComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Cliente']},
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
