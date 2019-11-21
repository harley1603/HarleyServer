import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonalComponent } from './personal/personal.component';
import { ContactCompoment } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';
import { AboutCompoment } from './about/about.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'menu', component: MenuComponent},
      { path: 'about', component: AboutCompoment},
      { path: 'contact', component: ContactCompoment}
    ] },
  // { path: 'dashboard/menu', component: MenuComponent },
  { path: 'personal', component: PersonalComponent, loadChildren: './personal/personal.module#PersonalModule' },
  { path: 'contact', component: ContactCompoment},
  { path: 'about', component: AboutCompoment},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
