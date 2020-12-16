import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { LoginRequest } from './interfaces/login.request';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hidePassword: boolean = true;
  public loading: boolean = false;
  public request: LoginRequest = { username: '', password: '' };
  public appName: string;

  public constructor(
    private loginService: LoginService,
    private snackbar: MatSnackBar,
    private userService: UserService,
    private dataService: DataService,
  ) { }

  public ngOnInit(): void {
    this.appName = this.dataService.getAppName();
    this.request.username = this.userService.getEmail();
  }

  public login(): void {
    this.loading = true;
    this.loginService
      .login(this.request)
      .subscribe(
        (response: any) => {
          this.loading = false;
          this.userService.storeLoggedUser(this.request.username, response.access_token);
          location.reload();
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          const message = 'Email sau parola gresite';
          this.loading = false;
          this.snackbar.open(message, 'Inchide', { duration: 3000 });
        }
      );
  }

}
