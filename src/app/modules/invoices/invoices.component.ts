import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { AppService } from 'src/app/services/app.service';
import { Invoice } from './classes/invoice';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { FindInvoicesResponse } from './interfaces/find.invoices.response';
import { InvoiceService } from './services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  public columnsToDisplay: string[] = [
    'select', 'name', 'date',
    'client', 'total', 'currencyTotal',
    'status', 'actions'
  ];
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

  public getTotal(): string {
    const total = this.dataSource
      .data
      .reduce((sum: number, invoice: Invoice) => sum + invoice.total, 0)
    return `RON ${total.toFixed(2)}`
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

  public print(): void {
    const ids = this.selection.selected.map(e => e.id)
    this.invoiceService
      .print(ids)
      .subscribe(
        res => {
          this.selection.clear();
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
          const message = e.error.message || 'A aparut o eroare.';
          this.snackbar.open(message, 'Inchide', { duration: 3000 })
        }
      )
  }

  public delete(invoice: Invoice): void {
    const ref = this.dialog
      .open(ConfirmationComponent,
        { data: 'Esti sigur ca vrei sa stergi factura?' });
    ref.afterClosed()
      .subscribe(
        data => {
          if (data && data.confirm) {
            this.invoiceService
              .delete(invoice.id)
              .subscribe(
                res => {
                  this.appService.reloadData(AppService.RELOAD_INVOICES);
                  this.snackbar.open('Factura a fost stearsa', 'OK', { duration: 3000 })
                }
              );
          }
        }
      )
  }

  public collect(): void {
    const ids = this.selection
      .selected
      .map(i => i.id)
    this.invoiceService
      .collect(ids)
      .subscribe(
        res => {
          this.selection.clear();
          this.paginator.page.emit()
        },
        e => {
          console.log(e);
          this.selection.clear();
          const message = e.error.message || 'A aparut o eroare.';
          this.snackbar.open(message, 'Inchide', { duration: 3000 })
        }
      )
  }

}
