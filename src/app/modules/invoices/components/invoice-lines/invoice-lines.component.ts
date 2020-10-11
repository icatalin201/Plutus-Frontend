import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from '../../classes/invoice';

@Component({
  selector: 'app-invoice-lines',
  templateUrl: './invoice-lines.component.html',
  styleUrls: ['./invoice-lines.component.scss']
})
export class InvoiceLinesComponent implements OnInit {

  @Input()
  public invoice: Invoice;

  public linesToDisplay: string[] = ['item', 'unitPrice', 'quantity', 'vat'];

  public constructor() { }

  public ngOnInit(): void { }

  public getInvoiceLinesTotalPrice(invoice: Invoice): number {
    return invoice.lines
      .map(l => l.unitPrice * l.quantity)
      .reduce((acc, value) => acc + value, 0)
  }

  public getTotal(): string {
    return `${this.invoice.currency} ${this.invoice.total.toFixed(2)}`;
  }

  public getSubtotal(): string {
    return `${this.invoice.currency} ${this.invoice.subtotal.toFixed(2)}`;
  }

  public getTaxes(): string {
    return `${this.invoice.currency} ${this.invoice.taxes.toFixed(2)}`;
  }

}
