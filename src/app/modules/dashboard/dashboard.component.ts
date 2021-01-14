import { Component, OnInit } from '@angular/core';
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
    private dashboardService: DashboardService
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

}
