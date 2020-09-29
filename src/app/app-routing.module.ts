import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGuard } from './guards/app.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'items',
    loadChildren: () => import('./modules/items/items.module')
      .then(m => m.ItemsModule),
    canActivate: [ AppGuard ]
  },
  {
    path: 'partners',
    loadChildren: () => import('./modules/partners/partners.module')
      .then(m => m.PartnersModule),
    canActivate: [ AppGuard ]
  },
  {
    path: 'invoices',
    loadChildren: () => import('./modules/invoices/invoices.module')
      .then(m => m.InvoicesModule),
    canActivate: [ AppGuard ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    canActivate: [ AppGuard ]
  },
  { 
    path: 'login', 
    loadChildren: () => import('./modules/login/login.module')
      .then(m => m.LoginModule),
    canActivate: [ LoginGuard ]
  },
  { 
    path: 'register', 
    loadChildren: () => import('./modules/register/register.module')
      .then(m => m.RegisterModule),
    canActivate: [ LoginGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
