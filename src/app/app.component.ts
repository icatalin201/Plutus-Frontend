import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public name: string;

  public constructor(
    private userService: UserService,
    private dataService: DataService
  ) { }

  public ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.name = this.dataService.getAppName();
    this.userService.logoutEvent
      .subscribe(_ => { this.isLoggedIn = false; });
  }

}
