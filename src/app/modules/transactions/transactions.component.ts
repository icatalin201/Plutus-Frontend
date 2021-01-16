import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { AppService } from 'src/app/services/app.service';
import { FilterTransactionDto } from './classes/filter.transaction';
import { Transaction } from './classes/transaction';
import { TransactionType } from './classes/transaction.type';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';
import { FilterTransactionsComponent } from './components/filter-transactions/filter-transactions.component';
import { UploadTransactionsComponent } from './components/upload-transactions/upload-transactions.component';
import { TransactionsService } from './services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  public columnsToDisplay: string[] = [
    'select', 'date', 'document',
    'details', 'partner', 'income',
    'expense', 'status', 'actions'
  ];
  public dataSource = new MatTableDataSource<Transaction>([]);
  public dataSize: number = 100;
  public loading: boolean = true;
  public expandedElement: Transaction | null;
  public selection = new SelectionModel<Transaction>(true, []);
  public filter: FilterTransactionDto = new FilterTransactionDto();

  public constructor(
    private transactionsService: TransactionsService,
    private dialog: MatDialog,
    private appService: AppService,
    private snackbar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.appService
      .shouldReload(AppService.RELOAD_TRANSACTIONS)
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
          return this.getTransactions();
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
      .subscribe((res: any) => {
        this.dataSource.data = res.transactions;
        this.dataSize = res.total;
      });
  }

  public onFilter() {
    const ref = this.dialog.open(FilterTransactionsComponent);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.filter = result
        this.paginator.pageIndex = 0
        this.paginator.page.emit()
      }
    });
  }

  public getTransactions() {
    const page = {
      number: this.paginator.pageIndex,
      size: this.paginator.pageSize
    };
    return this.transactionsService.findAll(page, this.filter);
  }

  public import(): void {
    this.dialog.open(UploadTransactionsComponent);
  }

  public getTotal(type: TransactionType): string {
    const total = this.dataSource
      .data
      .filter(transaction => transaction.type === type)
      .reduce((sum: number, transaction: Transaction) => sum + transaction.value, 0)
    return this.formatCurrency(total, 'RON')
  }

  public formatCurrency(value: number, currency: string): string {
    return new Intl.NumberFormat('RO', { style: 'currency', currency }).format(value)
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

  public checkboxLabel(row?: Transaction): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  public add(): void {
    this.dialog.open(CreateTransactionComponent);
  }

  public markAsDoneSelected(): void {
    const ids = this.selection
      .selected
      .map(t => t.id)
    this.transactionsService
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
          this.snackbar.open(message, 'Dismiss', { duration: 3000 })
        }
      )
  }

  public edit(transaction: Transaction): void {
    this.dialog.open(EditTransactionComponent, { data: transaction });
  }

  public delete(transaction: Transaction): void {
    const ref = this.dialog
      .open(ConfirmationComponent,
        { data: 'Esti sigur ca vrei sa stergi tranzactia?' });
    ref.afterClosed()
      .subscribe(
        data => {
          if (data && data.confirm) {
            this.transactionsService
              .delete(transaction.id)
              .subscribe(
                res => {
                  this.appService.reloadData(AppService.RELOAD_TRANSACTIONS);
                  this.snackbar.open('Tranzactia a fost stearsa', 'OK', { duration: 3000 })
                }
              );
          }
        }
      )
  }

}
