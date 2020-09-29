import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { Invoice } from './classes/invoice';
import { FindInvoicesResponse } from './interfaces/find.invoices.response';
import { InvoiceService } from './services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  public displayedColumns: string[] = ['id', 'name', 'total'];
  public data: Invoice[] = [];
  public dataSize: number = 100;
  public loading: boolean = true;

  public constructor(
    private invoiceService: InvoiceService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          const page = {
            number: this.paginator.pageIndex,
            size: this.paginator.pageSize
          };
          return this.invoiceService.findAll(page);
        }),
        map((data) => {
          this.loading = false;
          return data;
        }),
        catchError((error) => {
          console.error(error);
          this.loading = false;
          return of({});
        })
      )
      .subscribe((res: FindInvoicesResponse) => {
        this.data = res.invoices;
        this.dataSize = res.size;
      });
  }

  public addInvoice(): void {
    // this.dialog.open(CreateInvoiceComponent);
  }

}
