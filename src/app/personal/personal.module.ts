import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserManagementComponent } from './user-management/user-management.component';
import { ShippingAddressDetailComponent } from './user-profile/shipping-address-detail/shipping-address-detail.component';
import { ShippingAddressComponent } from './user-profile/shipping-address/shipping-address.component';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';



@NgModule({
  declarations: [PersonalComponent, SidebarComponent, UserProfileComponent, UserManagementComponent, ShippingAddressDetailComponent, ShippingAddressComponent, UserDetailComponent],
  imports: [
    ReactiveFormsModule,
    PersonalRoutingModule,
    CommonModule,
    NgxSpinnerModule
  ]
})
export class PersonalModule { }
