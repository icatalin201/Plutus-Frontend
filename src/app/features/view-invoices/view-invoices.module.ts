import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewInvoicesRoutingModule } from './view-invoices-routing.module';
import { ViewInvoicesComponent } from './view-invoices.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoiceChartService } from './services/invoice-chart.service';


@NgModule({
  declarations: [ViewInvoicesComponent],
  imports: [
    CommonModule,
    ViewInvoicesRoutingModule,
    SharedModule
  ],
  providers: [
    InvoiceChartService
  ]
})
export class ViewInvoicesModule { }
