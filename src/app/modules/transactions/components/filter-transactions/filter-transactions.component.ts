import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FilterTransactionDto } from '../../classes/filter.transaction';
import { TransactionType } from '../../classes/transaction.type';

@Component({
  selector: 'app-filter-transactions',
  templateUrl: './filter-transactions.component.html',
  styleUrls: ['./filter-transactions.component.scss']
})
export class FilterTransactionsComponent implements OnInit {

  public startDate: Date
  public endDate: Date
  public type: TransactionType | null

  public constructor(
    private dialogRef: MatDialogRef<FilterTransactionsComponent>,
  ) { }

  public ngOnInit(): void { }

  public filter(): void {
    const filter = new FilterTransactionDto();
    filter.type = this.type;
    filter.startDate = this.formatDate(this.startDate);
    filter.endDate = this.formatDate(this.endDate);
    this.dismiss(filter);
  }

  public dismiss(filter?: FilterTransactionDto): void {
    this.dialogRef.close(filter);
  }

  private formatDate(date: Date): string {
    if (date) {
      date = new Date(date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
      const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
      return `${year}-${month}-${day}`
    } else {
      return null;
    }
  }

}
