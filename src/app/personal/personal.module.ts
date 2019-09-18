import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserManagementComponent } from './user-management/user-management.component';



@NgModule({
  declarations: [PersonalComponent, SidebarComponent, UserProfileComponent, UserManagementComponent],
  imports: [
    ReactiveFormsModule,
    PersonalRoutingModule,
    CommonModule,
    NgxSpinnerModule
  ]
})
export class PersonalModule { }
