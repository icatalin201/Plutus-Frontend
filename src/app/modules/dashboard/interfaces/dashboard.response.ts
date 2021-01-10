import { BestPartnerDto } from "../classes/best.partner.dto";
import { ExpenseDto } from "../classes/expense.dto";
import { IncomeDto } from "../classes/income.dto";

export interface DashboardResponse {
    incomes: IncomeDto
    expenses: ExpenseDto
    bestPartner: BestPartnerDto
}