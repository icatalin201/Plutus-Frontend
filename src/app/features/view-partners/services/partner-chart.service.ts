import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReportService } from 'src/app/core/services/report.service';

@Injectable()
export class PartnerChartService {

  constructor(
    private reportService: ReportService
  ) { }

  public getIncomesChartData(): Observable<any> {
    let data: {labels: string[], datasets: any[]} = {
      labels: [],
      datasets: []
    };
    return this.reportService
      .getTotalIncomesByPartner()
      .pipe(
        map((res: { label: string, data: any[] }) => {
          const set = res.data.sort((o1, o2) => (o1.value < o2.value) ? 1 : -1).slice(0, 3)
          data.labels = [...set.map(e => e.label)]
          data.datasets.push({
            data: [...set.map(e => e.value).map(e => e.toFixed(2))],
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
          })
          return data;
        })
      )
  }

  public getExpensesChartData(): Observable<any> {
    let data: {labels: string[], datasets: any[]} = {
      labels: [],
      datasets: []
    };
    return this.reportService
      .getTotalExpensesByPartner()
      .pipe(
        map((res: { label: string, data: any[] }) => {
          const set = res.data.sort((o1, o2) => (o1.value < o2.value) ? 1 : -1).slice(0, 3)
          data.labels = [...set.map(e => e.label)]
          data.datasets.push({
            data: [...set.map(e => e.value).map(e => e.toFixed(2))],
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
          })
          return data;
        })
      )
  }
}
