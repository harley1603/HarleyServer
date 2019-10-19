import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonalComponent } from './personal/personal.component';
import { UserProfileComponent } from './personal/user-profile/user-profile.component';
import { UserManagementComponent } from './personal/user-management/user-management.component';
import { ContactCompoment } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';
import { AboutCompoment } from './about/about.component';
import { OrderManagementComponent } from './personal/order-management/order-management.component';
import { BeverageManagementComponent } from './personal/beverage-management/beverage-management.component';
import { BeverageDetailComponent } from './personal/beverage-management/beverage-detail/beverage-detail.component';



const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'menu', component: MenuComponent},
      { path: 'about', component: AboutCompoment},
      { path: 'contact', component: ContactCompoment}
    ] },
  { path: 'personal', component: PersonalComponent, loadChildren: './personal/personal.module#PersonalModule'
    // children: [
    //   { path: 'profile', component: UserProfileComponent},
    //   { path: 'user-management/user', component: UserManagementComponent},
    //   { path: 'order-management', component: OrderManagementComponent},
    //   { path: 'beverage-management', component: BeverageManagementComponent},
    //   // { path: 'beverage-detail', component: BeverageDetailComponent}
    // ] 
  },
  { path: 'contact', component: ContactCompoment},
  { path: 'about', component: AboutCompoment},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
