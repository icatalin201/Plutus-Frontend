import { Component, OnInit } from '@angular/core';
import { BestPartnerDto } from './classes/best.partner.dto';
import { ExpenseDto } from './classes/expense.dto';
import { IncomeDto } from './classes/income.dto';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public incomes: IncomeDto
  public expenses: ExpenseDto
  public bestPartner: BestPartnerDto

  public constructor(
    private dashboardService: DashboardService
  ) { }

  public ngOnInit(): void {
    this.dashboardService
      .fetchStatistics()
      .subscribe(
        res => {
          this.incomes = res.incomes;
          this.expenses = res.expenses;
          this.bestPartner = res.bestPartner;
        }
      )
  }

}
