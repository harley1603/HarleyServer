import { NgModule } from '@angular/core';
import { PersonalComponent } from './personal.component';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BeverageManagementComponent } from './beverage-management/beverage-management.component';
import { BeverageDetailComponent } from './beverage-management/beverage-detail/beverage-detail.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { OrderDetailComponent } from './order-management/order-detail/order-detail.component';
import { MyorderDetailComponent } from './my-order/order-detail/order-detail.component';
import { MyOrderComponent } from './my-order/my-order.component';
const routes: Routes = [
    { path: 'profile', component: UserProfileComponent},
    { path: 'user-management/user', component: UserManagementComponent},
    // Beverage
    { path: 'beverage-management', component: BeverageManagementComponent },
    { path: 'beverage-management/:mode', component: BeverageDetailComponent},
    { path: 'beverage-management/:mode/:code', component: BeverageDetailComponent},
    // My Order
    { path: 'order-management', component: OrderManagementComponent },
    { path: 'order-management/:mode', component: OrderDetailComponent},
    { path: 'order-management/:mode/:id', component: OrderDetailComponent},

    // My Order
    { path: 'my-order', component: MyOrderComponent },
    { path: 'my-order/:mode', component: MyorderDetailComponent},
    { path: 'my-order/:mode/:id', component: MyorderDetailComponent}
  ];

@NgModule({
imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
