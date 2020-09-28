import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'items',
    loadChildren: () => import('./modules/items/items.module')
      .then(m => m.ItemsModule)
  },
  {
    path: 'partners',
    loadChildren: () => import('./modules/partners/partners.module')
      .then(m => m.PartnersModule)
  },
  {
    path: 'invoices',
    loadChildren: () => import('./modules/invoices/invoices.module')
      .then(m => m.InvoicesModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
