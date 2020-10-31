import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { Invoice } from './classes/invoice';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { FindInvoicesResponse } from './interfaces/find.invoices.response';
import { InvoiceService } from './services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InvoicesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  public columnsToDisplay: string[] = ['select', 'name', 'date', 'client', 'total', 'currencyTotal', 'currency'];
  public dataSource = new MatTableDataSource<Invoice>([]);
  public dataSize: number = 100;
  public loading: boolean = true;
  public expandedElement: Invoice | null;
  public selection = new SelectionModel<Invoice>(true, []);

  public constructor(
    private invoiceService: InvoiceService,
    private dialog: MatDialog,
    private appService: AppService,
    private snackbar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.appService
      .shouldReload(AppService.RELOAD_INVOICES)
      .subscribe(
        _ => this.paginator.page.emit()
      )
  }

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
        this.dataSource.data = res.invoices;
        this.dataSize = res.total;
      });
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle(): void {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public checkboxLabel(row?: Invoice): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  public addInvoice(): void {
    this.dialog.open(CreateInvoiceComponent);
  }

  public printInvoice(invoice: Invoice): void {
    this.invoiceService
      .print(invoice.id)
      .subscribe(
        res => {
          const a = document.createElement('a');
          document.body.appendChild(a);
          const file = new Blob([res], {type: 'application/pdf'});
          const url = window.URL.createObjectURL(file);
          a.href = url;
          a.download = `${invoice.name}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        e => {
          console.log(e);
          const message = e.error.message || 'Something went wrong.';
          this.snackbar.open(message, 'Dismiss', { duration: 3000 })
        }
      )
  }

  public printSelected(): void {
    const ids = this.selection.selected.map(e => e.id)
    this.invoiceService
      .printMultiple(ids)
      .subscribe(
        res => {
          const a = document.createElement('a');
          document.body.appendChild(a);
          const file = new Blob([res], {type: 'application/zip'});
          const url = window.URL.createObjectURL(file);
          a.href = url;
          a.download = 'invoices.zip';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        e => {
          console.log(e);
          const message = e.error.message || 'Something went wrong.';
          this.snackbar.open(message, 'Dismiss', { duration: 3000 })
        }
      )
  }

}
