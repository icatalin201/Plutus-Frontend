import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { PartnerService } from 'src/app/core/services/partner.service';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { Currency } from '../../models/currency';
import { Partner } from '../../models/partner';
import { Transaction } from '../../models/transaction';
import { TransactionForm } from '../../models/transaction.form';
import { TransactionMethod } from '../../models/transaction.method';
import { TransactionType } from '../../models/transaction.type';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.sass']
})
export class TransactionFormComponent implements OnInit {

  public transaction: TransactionForm = new TransactionForm();
  public loading: boolean = false;
  public partners: Partner[] = [];
  public currencies: any[] = [
    { label: this.currencyService.USD, value: 2 },
    { label: this.currencyService.EUR, value: 1 },
    { label: this.currencyService.RON, value: 0 },
  ];
  public types: any[] = [
    { label: "Cheltuieli", value: 1 },
    { label: "Incasari", value: 0 },
  ];
  public methods: any[] = [
    { label: "Banca", value: 1 },
    { label: "Cash", value: 0 },
  ];

  @Input()
  public existingTransaction: Transaction;

  @Output()
  public closed: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private transactionService: TransactionService,
    private messagingService: MessagingService,
    private partnerService: PartnerService,
    private currencyService: CurrencyService,
  ) { }

  ngOnInit(): void {
    if (this.existingTransaction) {
      this.useExistingTransaction(this.existingTransaction)
    }
    this.partnerService
      .getPartners(0, 50)
      .subscribe(res => this.partners = res);
  }

  public cancel(): void {
    this.closed.emit(false);
  }

  public save(): void {
    this.loading = true;
    var observable: Observable<any>;
    if (this.existingTransaction) {
      observable = this.transactionService
        .update(this.existingTransaction.id, this.transaction);
    } else {
      observable = this.transactionService
        .create(this.transaction);
    }
    observable.subscribe(
      res => {
        this.loading = false
        this.messagingService.sendSuccess('Succes', 
          `Factura a fost salvata!`);
        this.closed.emit(true);
      },
      err => {
        this.loading = false
        this.messagingService.sendError('Eroare', 
          `A aparut o eroare!`);
      }
    )
  }

  private useExistingTransaction(transaction: Transaction): void {
    this.transaction.date = new Date(transaction.date);
    this.transaction.deductible = transaction.deductible;
    this.transaction.details = transaction.details;
    this.transaction.document = transaction.document;
    this.transaction.value = transaction.value;
    this.transaction.partnerId = transaction.partner.id;
    if (transaction.type === 'INCOME') {
      this.transaction.type = TransactionType.INCOME
    } else {
      this.transaction.type = TransactionType.EXPENSE;
    }
    if (transaction.method === 'BANK') {
      this.transaction.method = TransactionMethod.BANK
    } else {
      this.transaction.method = TransactionMethod.CASH
    }
    if (transaction.currency) {
      if (transaction.currency.currency === this.currencyService.USD) {
        this.transaction.currency = Currency.USD;
      } else if (transaction.currency.currency === this.currencyService.EUR) {
        this.transaction.currency = Currency.EUR;
      } else {
        this.transaction.currency = Currency.RON;
      }
    } else {
      this.transaction.currency = Currency.RON;
    }
  }

}
