import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-main/products-list/products-list.component';
import { ProductsMarketComponent } from './products-main/products-market/products-market.component';
import { ProductsViewComponent } from './products-main/products-view/products-view.component';
import { ProductsCreateComponent } from './products-main/products-create/products-create.component';
import { ProductsEditComponent } from './products-main/products-edit/products-edit.component';

const routes: Routes = [
{path: '', redirectTo: '/', pathMatch: 'full'},
{path: 'tienda', component: ProductsMarketComponent},
{path: 'productos', component: ProductsListComponent},
{path: 'productos/ver/:id', component: ProductsViewComponent},
{path: 'productos/crear', component: ProductsCreateComponent},
{path: 'productos/editar/:id' , component: ProductsEditComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
