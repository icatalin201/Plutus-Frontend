import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { InvoiceService } from './services/invoice.service';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [InvoicesComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    MaterialModule
  ],
  providers: [
    InvoiceService
  ]
})
export class InvoicesModule { }
