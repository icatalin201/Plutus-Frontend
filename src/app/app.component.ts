import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public menuItems: { name: string, text: string, path: string }[] = [
    { name: 'dashboard', text: 'Dashboard', path: '/dashboard' },
    { name: 'category', text: 'Servicii', path: '/items' },
    { name: 'person', text: 'Parteneri', path: '/partners' },
    { name: 'receipt', text: 'Facturi', path: '/invoices' },
    { name: 'money', text: 'Tranzactii', path: '/transactions' },
    { name: 'settings', text: 'Setari', path: '/settings' },
  ];
  public isLoggedIn: boolean = false;
  public name: string;

  public constructor(
    private userService: UserService,
    private dataService: DataService,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.name = this.dataService.getAppName();
  }

  public logout(): void {
    const ref = this.dialog.open(ConfirmationComponent, 
      { data: 'Esti sigur ca vrei sa te deconectezi?' })
    ref.afterClosed().subscribe(data => {
      if (data && data.confirm) {
        this.userService.logout();
        location.reload();
      }
    });
  }

}
