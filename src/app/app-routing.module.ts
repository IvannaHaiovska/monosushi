import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { AboutComponent } from './pages/about/about.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { OffertaComponent } from './pages/offerta/offerta.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminActionComponent } from './admin/admin-action/admin-action.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'discount/:id', component: DiscountInfoComponent },
  { path: 'product/:category', component: ProductComponent },
  { path: 'product/:path', component: ProductComponent },
  { path: 'offerta', component: OffertaComponent },
  { path: 'about', component: AboutComponent },
  { path: 'delivery-payment', component: DeliveryPaymentComponent},
  { path: 'admin', component: AdminComponent, children: [
     { path: 'action', component: AdminActionComponent }, 
     { path: 'category', component: AdminCategoryComponent },
    { path: 'product', component: AdminProductComponent },
    { path: 'order', component: AdminOrderComponent },
    { path: '', pathMatch: 'full', redirectTo: 'action' }
  ] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })
],
  exports: [RouterModule]
})

export class AppRoutingModule { }
