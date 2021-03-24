import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { tap } from 'rxjs/operators';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { Transaction } from 'src/app/shared/models/transaction';
import { TransactionFilterParams } from 'src/app/shared/models/transaction.filter.params';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.sass']
})
export class ViewTransactionsComponent implements OnInit {

  public transactions: Transaction[] = [];
  public loading: boolean = true;
  public selectedTransaction: Transaction = null;
  public showCreateTransaction: boolean = false;
  public totalRecords: number = 300;
  public currentPage: number = 0;
  public pageSize: number = 50;
  public menuItems: MenuItem[] = [
    { 
      label: 'Creeaza tranzactie', 
      icon: 'pi pi-fw pi-plus', 
      command: () => this.showCreateTransaction = true
    },
    { 
      label: 'Descarca raport', 
      icon: 'pi pi-fw pi-file',
      items: [
        { 
          label: '2021',
          command: () => this.downloadReport("2021")   
        },
        { 
          label: '2020',
          command: () => this.downloadReport("2020")   
        },
        { 
          label: '2019',
          command: () => this.downloadReport("2019")   
        }
      ]
    },
  ];
  public contextMenuItems: MenuItem[] = [
    { 
      label: 'Editeaza', 
      icon: 'pi pi-fw pi-pencil', 
      command: () => this.editTransaction(this.selectedTransaction)
    },
    {
      label: 'Sterge', 
      icon: 'pi pi-fw pi-times', 
      command: () => this.deleteTransaction(this.selectedTransaction)
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
    private transactionService: TransactionService,
    private currencyService: CurrencyService,
    private confirmationService: ConfirmationService,
    private messagingService: MessagingService
  ) { }

  ngOnInit(): void { }

  public fetchData(event: LazyLoadEvent): void {
    this.currentPage = event.first / this.pageSize;
    this.loadTransactions()
  }

  public loadTransactions(): void {
    this.loading = true
    this.transactionService
      .getTransactions(this.currentPage, this.pageSize)
      .pipe(tap(() => this.loading = false))
      .subscribe(res => this.transactions = res)
  }

  public formatValue(value: number): string {
    return this.currencyService
      .formatWithDefaultCurrency(value);
  }

  public downloadReport(year: string): void {
    this.messagingService.sendInfo('Descarcare raport', 'Se descarca...')
    this.transactionService
      .download(year)
      .subscribe(res => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const file = new Blob([res], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(file);
        a.href = url;
        a.download = `raport-${year}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.messagingService.sendSuccess('Descarcare raport', 'Descarcarea a luat sfarsit')
      }, 
      err => {
        this.messagingService.sendError('Descarcare raport', 'A aparut o eroare');
      })
  }

  public editTransaction(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.showCreateTransaction = true;
  }

  public deleteTransaction(transaction: Transaction): void {
    this.confirmationService.confirm({
      message: `Esti sigur ca vrei sa stergi transactia?`,
      header: 'Confirmare',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.transactionService
          .delete(transaction.id)
          .subscribe(
            res => {
              this.transactions = this.transactions.filter((t) => t.id !== transaction.id);
              this.messagingService
                .sendSuccess('Succes', `Transactie stearsa`);
              this.selectedTransaction = null;
            },
            err => {
              this.messagingService
                .sendError('Eroare', `Tranzactia nu a fost stearsa`);
              this.selectedTransaction = null;
            }
          )
      }
    })
  }

  public onCloseTransactionDialog(result: boolean): void {
    if (result) {
      this.loadTransactions();
    }
    this.selectedTransaction = null;
    this.showCreateTransaction = false;
  }

}
