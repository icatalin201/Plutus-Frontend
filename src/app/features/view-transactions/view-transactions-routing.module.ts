import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTransactionsComponent } from './view-transactions.component';

const routes: Routes = [{ path: '', component: ViewTransactionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTransactionsRoutingModule { }
