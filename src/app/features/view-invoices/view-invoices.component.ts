import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { Invoice } from 'src/app/shared/models/invoice';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MessagingService } from 'src/app/core/services/messaging.service';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.sass']
})
export class ViewInvoicesComponent implements OnInit {

  public invoices: Invoice[] = [];
  public loading: boolean = true;
  public first: number = 0;
  public rows: number = 50;
  public now: string = new Date().toLocaleString();
  public selectedInvoice: Invoice = null;
  public showCreateInvoice: boolean = false;
  public contextMenuItems: MenuItem[] = [
    {label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.editInvoice(this.selectedInvoice)},
    {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteInvoice(this.selectedInvoice)}
  ];

  constructor(
    private invoiceService: InvoiceService,
    private currencyService: CurrencyService,
    private confirmationService: ConfirmationService,
    private messagingService: MessagingService
  ) { }

  ngOnInit(): void {
    this.loadInvoices()
  }

  public loadInvoices(): void {
    this.loading = true
    this.invoiceService
      .getInvoices(this.first, this.rows)
      .pipe(tap(() => this.loading = false))
      .subscribe(res => {
        this.invoices = res
        this.now = new Date().toLocaleString();
      })
  }

  public formatValue(value: number): string {
    return this.currencyService
      .formatWithDefaultCurrency(value);
  }

  public editInvoice(Invoice: Invoice): void {
    this.selectedInvoice = Invoice;
    this.showCreateInvoice = true;
  }

  public deleteInvoice(invoice: Invoice): void {
    this.confirmationService.confirm({
      message: `Esti sigur ca vrei sa stergi factura ${invoice.name}?`,
      header: 'Confirmare',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.invoiceService
          .delete(invoice.id)
          .subscribe(
            res => {
              this.invoices = this.invoices.filter((i) => i.id !== invoice.id);
              this.messagingService
                .sendSuccess('Factura stearsa', `${invoice.name}`);
              this.selectedInvoice = null;
            },
            err => {
              this.messagingService
                .sendError('Eroare', `Factura ${invoice.name} nu a fost stearsa`);
              this.selectedInvoice = null;
            }
          )
      }
    })
  }

  public onCloseInvoiceDialog(result: boolean): void {
    if (result) {
      this.loadInvoices();
    }
    this.selectedInvoice = null;
    this.showCreateInvoice = false;
  }

}
