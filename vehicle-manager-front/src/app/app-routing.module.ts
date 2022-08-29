import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './layouts/admin/admin.component';
import { MapComponent } from './pages/home/map/map.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '',  redirectTo: 'map', pathMatch: 'full' },
      {
        path: 'map',
        component: MapComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
