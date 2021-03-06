import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReportService } from 'src/app/core/services/report.service';

@Injectable()
export class InvoiceChartService {

  constructor(
    private reportService: ReportService
  ) { }

  public getIncomesChartData(): Observable<any> {
    let data: {labels: string[], datasets: any[]} = {
      labels: [],
      datasets: []
    };
    return this.reportService
      .getTotalIncomesByYear()
      .pipe(
        map((res: { label: string, data: any[] }) => {
          data.labels = [...res.data.map(e => e.label)]
          data.datasets.push({
            data: [...res.data.map(e => e.value).map(e => e.toFixed(2))],
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
