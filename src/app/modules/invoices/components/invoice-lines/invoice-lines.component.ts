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
    return `RON ${this.invoice.total.toFixed(3)}`;
  }

  public getSubtotal(): string {
    return `RON ${this.invoice.subtotal.toFixed(3)}`;
  }

  public getTaxes(): string {
    return `RON ${this.invoice.taxes.toFixed(3)}`;
  }

}
