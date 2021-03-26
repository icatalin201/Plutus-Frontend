import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReportService } from 'src/app/core/services/report.service';

@Injectable()
export class DashboardService {

  constructor(
    private reportService: ReportService
  ) { }

  public get2021ChartData(): Observable<any> {
    return this.getDataForYear(2021)
  }

  public get2020ChartData(): Observable<any> {
    return this.getDataForYear(2020)
  }

  private getDataForYear(year: number): Observable<any> {
    let data: { labels: string[], datasets: any[] } = {
      labels: [],
      datasets: []
    };
    return forkJoin([
      this.reportService.getYearlyIncomesByMonth(year), 
      this.reportService.getYearlyExpensesByMonth(year)
    ]).pipe(
      map((responses: { label: string, data: any[] }[]) => {
        const incomes = responses[0]
        const expenses = responses[1]
        const incomeData = incomes.data.map(e => e.value).map(e => e.toFixed(2))
        const expenseData = expenses.data.map(e => e.value).map(e => e.toFixed(2))
        data.labels = [...incomes.data.map(e => e.label)]
        data.datasets.push({
          label: incomes.label,
          borderColor: '#42A5F5',
          fill: false,
          data: [...incomeData]
        })
        data.datasets.push({
          label: expenses.label,
          borderColor: '#FFA726',
          fill: false,
          data: [...expenseData]
        })
        return data;
      })
    )
  }

}
