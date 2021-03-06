import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { tap } from 'rxjs/operators';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { Transaction } from 'src/app/shared/models/transaction';
import { TransactionStatus } from 'src/app/shared/models/transaction.status';
import { TransactionChartService } from './services/transaction-chart.service';

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
  public totalRecords: number = 0;
  public currentPage: number = 0;
  public pageSize: number = 50;
  public options: any = {
    legend: {
      display: false
    }
  };
  public menuItems: MenuItem[] = [
    { 
      label: 'Creeaza tranzactie', 
      icon: 'pi pi-fw pi-plus', 
      command: () => this.createTransaction()
    },
    { 
      label: 'Descarca raport', 
      icon: 'pi pi-fw pi-cloud-download',
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
      label: 'Colecteaza', 
      icon: 'pi pi-fw pi-dollar', 
      command: () => this.collectTransaction(this.selectedTransaction)
    },
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
  public incomesData = {}
  public expensesData = {}

  constructor(
    private transactionService: TransactionService,
    private currencyService: CurrencyService,
    private confirmationService: ConfirmationService,
    private messagingService: MessagingService,
    private transactionChartService: TransactionChartService
  ) { }

  ngOnInit(): void {
    this.transactionChartService
      .getIncomes2021ChartData()
      .subscribe(res => this.incomesData = res)
    this.transactionChartService
      .getExpenses2021ChartData()
      .subscribe(res => this.expensesData = res)
  }

  public fetchData(event: LazyLoadEvent): void {
    this.currentPage = event.first / this.pageSize;
    this.loadTransactions()
  }

  public loadTransactions(): void {
    this.loading = true
    this.transactionService
      .getTransactions(this.currentPage, this.pageSize)
      .pipe(tap(() => this.loading = false))
      .subscribe(res => {
        this.transactions = res.transactions;
        this.totalRecords = res.totalRecords;
      })
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

  public collectTransaction(transaction: Transaction): void {
    if (transaction.status === "DONE") {
      this.messagingService
        .sendInfo('Operatie interzisa', 
          `Tranzactia nu poate fi schimbata!`)
    } else {
      this.transactionService
        .collect(transaction.id)
        .subscribe(
          res => {
            this.loadTransactions()
            this.messagingService.sendSuccess('Colectare tranzactia', 
              'Tranzactia a fost colectata cu succes');
          },
          err => {
            this.messagingService.sendError('Colectare tranzactia', 
              'A aparut o eroare');
          }
        )
    }
  }

  public createTransaction(): void {
    this.selectedTransaction = null
    this.showCreateTransaction = true
  }

  public editTransaction(transaction: Transaction): void {
    if (transaction.status === "DONE") {
      this.messagingService
        .sendInfo('Operatie interzisa', 
          `Tranzactia nu poate fi schimbata!`)
    } else {
      this.selectedTransaction = transaction;
      this.showCreateTransaction = true;
    }
  }

  public deleteTransaction(transaction: Transaction): void {
    if (transaction.status === "DONE") {
      this.messagingService
        .sendInfo('Operatie interzisa', 
          `Tranzactia nu poate fi schimbata!`)
    } else {
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
  }

  public onCloseTransactionDialog(result: boolean): void {
    if (result) {
      this.loadTransactions();
    }
    this.selectedTransaction = null;
    this.showCreateTransaction = false;
  }

}
