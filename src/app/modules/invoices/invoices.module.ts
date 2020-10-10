import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { InvoiceService } from './services/invoice.service';
import { MaterialModule } from '../material/material.module';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnersModule } from '../partners/partners.module';
import { ItemsModule } from '../items/items.module';


@NgModule({
  declarations: [InvoicesComponent, CreateInvoiceComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PartnersModule,
    ItemsModule
  ],
  providers: [
    InvoiceService
  ]
})
export class InvoicesModule { }