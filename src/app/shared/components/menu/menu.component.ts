import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AppService } from 'src/app/core/services/app.service';
import { MessagingService } from 'src/app/core/services/messaging.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  public items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-bar',
      routerLink: '/portal/dashboard'
    },
    {
      label: 'Parteneri',
      icon: 'pi pi-user',
      routerLink: '/portal/partners'
    },
    {
      label: 'Iteme',
      icon: 'pi pi-tags',
      routerLink: '/portal/items'
    },
    {
      label: 'Facturi',
      icon: 'pi pi-file',
      routerLink: '/portal/invoices'
    },
    {
      label: 'Tranzactii',
      icon: 'pi pi-dollar',
      routerLink: '/portal/transactions'
    },
  ]

  constructor(
    private appService: AppService,
    private router: Router,
    private messagingService: MessagingService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.confirmationService.confirm({
      message: 'Esti sigur ca vrei sa te deconectezi?',
      header: 'Confirmare',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appService.logout()
        this.router.navigate(['/'], { replaceUrl: true })
        this.messagingService.sendInfo('Deconectare', 'Te-ai deconectat cu succes!')    
      }
    })
  }

}
