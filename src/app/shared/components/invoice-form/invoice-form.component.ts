import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InvoiceLineForm } from '../../models/invoice.line.form';
import { InvoiceForm } from '../../models/invoice.form';
import { Invoice } from '../../models/invoice';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { Observable } from 'rxjs';
import { PartnerService } from 'src/app/core/services/partner.service';
import { ItemService } from 'src/app/core/services/item.service';
import { Partner } from '../../models/partner';
import { Item } from '../../models/item';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { Currency } from '../../models/currency';
import { SerialService } from 'src/app/core/services/serial.service';
import { Serial } from '../../models/serial';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.sass']
})
export class InvoiceFormComponent implements OnInit {

  public invoice: InvoiceForm = new InvoiceForm();
  public invoiceLine: InvoiceLineForm = new InvoiceLineForm();
  public loading: boolean = false;
  public serial: string;
  public partners: Partner[] = [];
  public items: Item[] = [];
  public currencies: any[] = [
    { label: this.currencyService.USD, value: 2 },
    { label: this.currencyService.EUR, value: 1 },
    { label: this.currencyService.RON, value: 0 },
  ];
  public date: Date = new Date();
  public dueDate: Date = new Date();

  @Input()
  public existingInvoice: Invoice;

  @Output()
  public closed: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private invoiceService: InvoiceService,
    private messagingService: MessagingService,
    private partnerService: PartnerService,
    private itemService: ItemService,
    private currencyService: CurrencyService,
    private serialService: SerialService
  ) { }

  ngOnInit(): void {
    if (this.existingInvoice) {
      this.useExistingInvoice(this.existingInvoice)
    } else {
      this.serialService
        .getSerial()
        .subscribe(res => this.setSerial(res))
    }
    this.partnerService
      .getPartners(0, 50)
      .subscribe(res => this.partners = res.partners
        .filter((p: Partner) => p.type === 'CLIENT'));
    this.itemService
      .getItems(0, 50)
      .subscribe(res => this.items = res.items);
  }

  public cancel(): void {
    this.closed.emit(false);
  }

  public save(): void {
    this.loading = true;
    this.invoice.date = this.date.toLocaleDateString("sv-SE");
    this.invoice.dueDate = this.dueDate.toLocaleDateString("sv-SE");
    var observable: Observable<any>;
    this.invoice.lines = [this.invoiceLine];
    if (this.existingInvoice) {
      observable = this.invoiceService
        .update(this.existingInvoice.id, this.invoice);
    } else {
      observable = this.invoiceService
        .create(this.invoice);
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

  private useExistingInvoice(invoice: Invoice): void {
    if (invoice.currency.value === this.currencyService.USD) {
      this.invoice.currency = Currency.USD;
    } else if (invoice.currency.value === this.currencyService.EUR) {
      this.invoice.currency = Currency.EUR;
    } else {
      this.invoice.currency = Currency.RON;
    }
    this.date = new Date(invoice.date);
    if (invoice.dueDate) {
      this.dueDate = new Date(invoice.dueDate);
    }
    this.invoice.partnerId = invoice.customer.id;
    this.serial = invoice.name;
    const line = invoice.lines[0];
    this.invoiceLine.itemId = line.item.id;
    this.invoiceLine.quantity = line.quantity;
    this.invoiceLine.uom = line.uom;
    this.invoiceLine.vat = line.vat;
    this.invoiceLine.details = line.details;
    this.invoiceLine.unitPrice = line.currency.total;
  }

  private setSerial(serial: Serial): void {
    const name = ("000" + serial.nextNumber).slice(-4);
    this.serial = `${serial.name}${name}`
  }

}
