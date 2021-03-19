import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './core/guards/app.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'portal/login',
    pathMatch: 'full'
  },
  {
    path: 'portal',
    redirectTo: 'portal/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'portal',
    children: [
      { 
        path: 'dashboard', 
        loadChildren: () => import('./features/dashboard/dashboard.module')
          .then(m => m.DashboardModule) 
      },
      { 
        path: 'partners', 
        loadChildren: () => import('./features/view-partners/view-partners.module')
          .then(m => m.ViewPartnersModule) 
      },
      { 
        path: 'items', 
        loadChildren: () => import('./features/view-items/view-items.module')
          .then(m => m.ViewItemsModule) 
      },
      { 
        path: 'invoices', 
        loadChildren: () => import('./features/view-invoices/view-invoices.module')
          .then(m => m.ViewInvoicesModule) 
      },
      { 
        path: 'transactions', 
        loadChildren: () => import('./features/view-transactions/view-transactions.module')
          .then(m => m.ViewTransactionsModule) 
      },
      { 
        path: 'login', 
        canActivate: [LoginGuard],
        loadChildren: () => import('./features/login/login.module')
          .then(m => m.LoginModule) 
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
