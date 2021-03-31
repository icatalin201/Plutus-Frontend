import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReportService } from 'src/app/core/services/report.service';

@Injectable()
export class TransactionChartService {

  constructor(
    private reportService: ReportService
  ) { }

  public getIncomes2021ChartData(): Observable<any> {
    return this.reportService
      .getYearlyIncomesByPartner(2021)
      .pipe(map(res => this.mapData(res)))
  }

  public getExpenses2021ChartData(): Observable<any> {
    return this.reportService
      .getYearlyExpensesByPartner(2021)
      .pipe(map(res => this.mapData(res)))
  }

  private mapData(res: { label: string, data: any[] }): any {
    return {
      labels: [...res.data.map(e => e.label)],
      datasets: [
        {
          data: [...res.data.map(e => e.value).map(e => e.toFixed(2))],
          backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
          ],
          hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
          ]
        }
      ]
    };
  }
}
