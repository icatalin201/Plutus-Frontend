import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { tap } from 'rxjs/operators';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { PartnerService } from 'src/app/core/services/partner.service';
import { Partner } from 'src/app/shared/models/partner';
import { PartnerChartService } from './services/partner-chart.service';

@Component({
  selector: 'app-view-partners',
  templateUrl: './view-partners.component.html',
  styleUrls: ['./view-partners.component.sass']
})
export class ViewPartnersComponent implements OnInit {

  public partners: Partner[] = [];
  public loading: boolean = true;
  public selectedPartner: Partner = null;
  public showCreatePartner: boolean = false;
  public totalRecords: number = 0;
  public currentPage: number = 0;
  public pageSize: number = 50;
  public menuItems: MenuItem[] = [
    { 
      label: 'Creeaza partener', 
      icon: 'pi pi-fw pi-plus', 
      command: () => this.createPartner()
    },
  ];
  public contextMenuItems: MenuItem[] = [
    {
      label: 'Editeaza', 
      icon: 'pi pi-fw pi-pencil', 
      command: () => this.editPartner(this.selectedPartner)
    },
    {
      label: 'Sterge', 
      icon: 'pi pi-fw pi-times', 
      command: () => this.deletePartner(this.selectedPartner)
    }
  ];
  public incomeData = {}
  public expenseData = {}

  constructor(
    private partnerService: PartnerService,
    private confirmationService: ConfirmationService,
    private messagingService: MessagingService,
    private partnerChartService: PartnerChartService
  ) { }

  ngOnInit(): void {
    this.partnerChartService
      .getIncomesChartData()
      .subscribe(res => this.incomeData = res)
    this.partnerChartService
      .getExpensesChartData()
      .subscribe(res => this.expenseData = res)
  }

  public fetchData(event: LazyLoadEvent): void {
    this.currentPage = event.first / this.pageSize;
    this.loadPartners();
  }

  public loadPartners(): void {
    this.loading = true
    this.partnerService
      .getPartners(this.currentPage, this.pageSize)
      .pipe(tap(() => this.loading = false))
      .subscribe(res => {
        this.partners = res.partners;
        this.totalRecords = res.totalRecords;
      })
  }

  public onClosePartnerDialog(result: boolean): void {
    if (result) {
      this.loadPartners();
    }
    this.selectedPartner = null;
    this.showCreatePartner = false;
  }

  public createPartner(): void {
    this.selectedPartner = null
    this.showCreatePartner = true
  }

  public editPartner(partner: Partner): void {
    this.selectedPartner = partner;
    this.showCreatePartner = true;
  }

  public deletePartner(partner: Partner): void {
    this.confirmationService.confirm({
      message: `Esti sigur ca vrei sa stergi partenerul ${partner.name}?`,
      header: 'Confirmare',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.partnerService
          .delete(partner.id)
          .subscribe(
            res => {
              this.partners = this.partners.filter((p) => p.id !== partner.id);
              this.messagingService
                .sendSuccess('Partener sters', `${partner.name}`);
              this.selectedPartner = null;
            },
            err => {
              this.messagingService
                .sendError('Eroare', `${partner.name} nu a fost sters`);
              this.selectedPartner = null;
            }
          )
      }
    })
  }

}
