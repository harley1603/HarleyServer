import { NgModule } from '@angular/core';
import { PersonalComponent } from './personal.component';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserManagementComponent } from './user-management/user-management.component';
const routes: Routes = [
    // { path: 'profile', component: UserProfileComponent},
    // { path: 'user-management/user', component: UserManagementComponent}
  ];

@NgModule({
imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
