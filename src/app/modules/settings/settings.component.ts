import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public constructor(
    private userService: UserService,
    private router: Router
  ) { }

  public ngOnInit(): void { }

  public logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
