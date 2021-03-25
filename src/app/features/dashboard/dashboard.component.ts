import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  public data2021 = {}
  public data2020 = {}

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.dashboardService
      .get2021ChartData()
      .subscribe(res => this.data2021 = res)
    this.dashboardService
      .get2020ChartData()
      .subscribe(res => this.data2020 = res)
  }

}
