import { NgModule } from '@angular/core';
import { PersonalComponent } from './personal.component';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BeverageManagementComponent } from './beverage-management/beverage-management.component';
import { BeverageDetailComponent } from './beverage-management/beverage-detail/beverage-detail.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { OrderDetailComponent } from './order-management/order-detail/order-detail.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AuthGuard } from '../auth.guard';
const routes: Routes = [
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
    { path: 'user-management/user', component: UserManagementComponent, canActivate: [AuthGuard]},
    // Beverage
    { path: 'beverage-management', component: BeverageManagementComponent, canActivate: [AuthGuard] },
    { path: 'beverage-management/:mode', component: BeverageDetailComponent, canActivate: [AuthGuard]},
    { path: 'beverage-management/:mode/:code', component: BeverageDetailComponent, canActivate: [AuthGuard]},
    // My Order
    { path: 'order-management', component: OrderManagementComponent, canActivate: [AuthGuard] },
    { path: 'order-management/:mode', component: OrderDetailComponent, canActivate: [AuthGuard]},
    { path: 'order-management/:mode/:id', component: OrderDetailComponent, canActivate: [AuthGuard]},

    // My Order
    { path: 'my-order', component: MyOrderComponent, canActivate: [AuthGuard] },
    // { path: 'order-management/:mode', component: OrderDetailComponent},
    // { path: 'order-management/:mode/:id', component: OrderDetailComponent}
  ];

@NgModule({
imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
