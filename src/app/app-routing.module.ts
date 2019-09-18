import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonalComponent } from './personal/personal.component';
import { UserProfileComponent } from './personal/user-profile/user-profile.component';
import { UserManagementComponent } from './personal/user-management/user-management.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'personal', component: PersonalComponent, 
    children: [
      { path: 'profile', component: UserProfileComponent},
      { path: 'user-management/user', component: UserManagementComponent}
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
