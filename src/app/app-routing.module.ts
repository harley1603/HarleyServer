import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonalComponent } from './personal/personal.component';
import { UserProfileComponent } from './personal/user-profile/user-profile.component';
import { UserManagementComponent } from './personal/user-management/user-management.component';
import { ContactCompoment } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';



const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'menu', component: MenuComponent},
      { path: 'contact', component: ContactCompoment}
    ] },
  { path: 'personal', component: PersonalComponent, 
    children: [
      { path: 'profile', component: UserProfileComponent},
      { path: 'user-management/user', component: UserManagementComponent}
    ] 
  },
  { path: 'contact', component: ContactCompoment},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
