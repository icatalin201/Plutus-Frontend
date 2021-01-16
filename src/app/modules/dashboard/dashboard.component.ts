import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Stat } from './classes/stat';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private statistics: Stat[] = []

  public constructor(
    private dashboardService: DashboardService,
    private snackbar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.dashboardService
      .fetchStatistics()
      .subscribe(
        res => this.statistics = res.statistics
      )
  }

  public get stats(): Stat[] {
    return this.statistics
  }

  public formatCurrency(value: number): string {
    return new Intl.NumberFormat('RO', { style: 'currency', currency: 'RON' }).format(value)
  }

  public downloadTransactionsReport(): void {
    this.dashboardService.downloadTransactionsReport()
      .subscribe(
        res => {
          const a = document.createElement('a');
          document.body.appendChild(a);
          const file = new Blob([res], {type: 'application/pdf'});
          const url = window.URL.createObjectURL(file);
          a.href = url;
          a.download = 'report.pdf';
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

  public downloadInvoicesZip(): void {
    this.dashboardService.downloadInvoicesZip()
      .subscribe(
        res => {
          const a = document.createElement('a');
          document.body.appendChild(a);
          const file = new Blob([res], {type: 'application/zip'});
          const url = window.URL.createObjectURL(file);
          a.href = url;
          a.download = 'archive.zip';
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

}
