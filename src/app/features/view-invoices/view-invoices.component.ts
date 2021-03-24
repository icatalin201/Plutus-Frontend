import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { Invoice } from 'src/app/shared/models/invoice';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { MessagingService } from 'src/app/core/services/messaging.service';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.sass']
})
export class ViewInvoicesComponent implements OnInit {

  public invoices: Invoice[] = [];
  public loading: boolean = true;
  public selectedInvoice: Invoice = null;
  public showCreateInvoice: boolean = false;
  public totalRecords: number = 300;
  public currentPage: number = 0;
  public pageSize: number = 50;
  public menuItems: MenuItem[] = [
    { 
      label: 'Creeaza factura', 
      icon: 'pi pi-fw pi-plus', 
      command: () => this.showCreateInvoice = true
    },
    { 
      label: 'Descarca arhiva', 
      icon: 'pi pi-fw pi-file', 
      command: () => this.downloadArchive()
    },
  ];
  public contextMenuItems: MenuItem[] = [
    { 
      label: 'Colecteaza', 
      icon: 'pi pi-fw pi-dollar', 
      command: () => this.collectInvoice(this.selectedInvoice)
    },
    { 
      label: 'Editeaza', 
      icon: 'pi pi-fw pi-pencil', 
      command: () => this.editInvoice(this.selectedInvoice)
    },
    {
      label: 'Sterge', 
      icon: 'pi pi-fw pi-times', 
      command: () => this.deleteInvoice(this.selectedInvoice)
    }
  ];
  public data = {
    labels: ['A','B','C'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
        ],
        hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
        ]
      }
    ]    
  };

  constructor(
    private invoiceService: InvoiceService,
    private currencyService: CurrencyService,
    private confirmationService: ConfirmationService,
    private messagingService: MessagingService
  ) { }

  ngOnInit(): void { }

  public fetchData(event: LazyLoadEvent): void {
    this.currentPage = event.first / this.pageSize;
    this.loadInvoices();
  }

  public loadInvoices(): void {
    this.loading = true
    this.invoiceService
      .getInvoices(this.currentPage, this.pageSize)
      .pipe(tap(() => this.loading = false))
      .subscribe(res => this.invoices = res)
  }

  public formatValue(value: number): string {
    return this.currencyService
      .formatWithDefaultCurrency(value);
  }

  public downloadArchive(): void {
    this.messagingService.sendInfo('Descarcare arhiva', 'Se descarca...')
    this.invoiceService
      .download()
      .subscribe(res => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const file = new Blob([res], {type: 'application/zip'});
        const url = window.URL.createObjectURL(file);
        a.href = url;
        a.download = `arhiva.zip`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.messagingService.sendSuccess('Descarcare arhiva', 'Descarcarea a luat sfarsit')
      }, 
      err => {
        this.messagingService.sendError('Descarcare arhiva', 'A aparut o eroare');
      })
  }

  public collectInvoice(invoice: Invoice): void {

  }

  public editInvoice(invoice: Invoice): void {
    this.selectedInvoice = invoice
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
