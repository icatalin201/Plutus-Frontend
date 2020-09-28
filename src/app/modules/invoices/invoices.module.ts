import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { InvoiceService } from './services/invoice.service';


@NgModule({
  declarations: [InvoicesComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule
  ],
  providers: [
    InvoiceService
  ]
})
export class InvoicesModule { }
