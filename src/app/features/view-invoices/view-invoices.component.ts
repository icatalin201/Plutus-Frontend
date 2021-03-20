import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NumberFormatterService } from 'src/app/core/services/number-formatter.service';
import { Currency } from 'src/app/shared/models/currency';
import { Invoice } from 'src/app/shared/models/invoice';
import { GetInvoicesService } from './services/get-invoices.service';

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

  constructor(
    private getInvoicesService: GetInvoicesService,
    private numberFormatter: NumberFormatterService
  ) { }

  ngOnInit(): void {
    this.loadInvoices()
  }

  public loadInvoices(): void {
    this.loading = true
    this.getInvoicesService
      .getInvoices(this.first, this.rows)
      .pipe(tap(() => this.loading = false))
      .subscribe(res => {
        this.invoices = res
        this.now = new Date().toLocaleString();
      })
  }

  public formatValue(value: number): string {
    return this.numberFormatter
      .formatWithCurrency(value, 'RON');
  }

}
