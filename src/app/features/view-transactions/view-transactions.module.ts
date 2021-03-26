import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTransactionsRoutingModule } from './view-transactions-routing.module';
import { ViewTransactionsComponent } from './view-transactions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransactionChartService } from './services/transaction-chart.service';


@NgModule({
  declarations: [ViewTransactionsComponent],
  imports: [
    CommonModule,
    ViewTransactionsRoutingModule,
    SharedModule
  ],
  providers: [
    TransactionChartService
  ]
})
export class ViewTransactionsModule { }
