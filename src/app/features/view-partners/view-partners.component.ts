import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { tap } from 'rxjs/operators';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { PartnerService } from 'src/app/core/services/partner.service';
import { Partner } from 'src/app/shared/models/partner';

@Component({
  selector: 'app-view-partners',
  templateUrl: './view-partners.component.html',
  styleUrls: ['./view-partners.component.sass']
})
export class ViewPartnersComponent implements OnInit {

  public partners: Partner[] = [];
  public loading: boolean = true;
  public first: number = 0;
  public rows: number = 50;
  public now: string = new Date().toLocaleString();
  public selectedPartner: Partner = null;
  public showCreatePartner: boolean = false;
  public contextMenuItems: MenuItem[] = [
    {label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.editPartner(this.selectedPartner)},
    {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deletePartner(this.selectedPartner)}
  ];
  public data = {
    labels: ['A','B','C'],
    datasets: [
      {
        data: [300, 50, 100],
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
      }
    ]    
  };

  constructor(
    private partnerService: PartnerService,
    private confirmationService: ConfirmationService,
    private messagingService: MessagingService
  ) { }

  ngOnInit(): void {
    this.loadPartners()
  }

  public loadPartners(): void {
    this.loading = true
    this.partnerService
      .getPartners(this.first, this.rows)
      .pipe(tap(() => this.loading = false))
      .subscribe(res => {
        this.partners = res
        this.now = new Date().toLocaleString();
      })
  }

  public onClosePartnerDialog(result: boolean): void {
    if (result) {
      this.loadPartners();
    }
    this.selectedPartner = null;
    this.showCreatePartner = false;
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
