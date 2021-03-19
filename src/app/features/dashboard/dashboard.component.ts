import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  public basicData = {
    labels: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'],
    datasets: [
      {
        label: 'Venituri',
        borderColor: '#42A5F5',
        fill: false,
        data: [65, 59, 80, 81, 56, 55, 40, 10, 23, 49, 33, 50]
      },
      {
        label: 'Cheltuieli',
        borderColor: '#FFA726',
        fill: false,
        data: [28, 48, 40, 19, 86, 27, 90, 12, 25, 54, 65, 24]
      }
    ]
  }

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
  }

}
