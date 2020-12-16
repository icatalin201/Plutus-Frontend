import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { MaterialModule } from '../material/material.module';
import { TransactionsService } from './services/transactions.service';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnersModule } from '../partners/partners.module';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';
import { UploadTransactionsComponent } from './components/upload-transactions/upload-transactions.component';

@NgModule({
  declarations: [TransactionsComponent, CreateTransactionComponent, EditTransactionComponent, UploadTransactionsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionsRoutingModule,
    PartnersModule,
  ],
  providers: [
    TransactionsService
  ]
})
export class TransactionsModule { }
