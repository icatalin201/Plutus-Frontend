import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { LoginRequest } from './interfaces/login.request';
import { LoginResponse } from './interfaces/login.response';
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
  }

  public login(): void {
    this.loading = true;
    this.loginService
      .login(this.request)
      .subscribe(
        (response: LoginResponse) => {
          console.log(response);
          this.loading = false;
          this.userService.storeLoggedUser(response.user);
          location.reload();
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          const message = err.error.message || 'Something went wrong!';
          this.loading = false;
          this.snackbar.open(message, 'Dismiss', { duration: 3000 });
        }
      );
  }

}
