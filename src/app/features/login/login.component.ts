import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AppService } from 'src/app/core/services/app.service';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public username: string = this.appService.getEmail() || "";
  public password: string = "";
  public loading: boolean = false;

  constructor(
    private messagingService: MessagingService,
    private loginService: LoginService,
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.loading = true;
    this.loginService
    .login(this.username, this.password)
    .subscribe(
      res => {
        this.loading = false
        this.messagingService
          .sendInfo('Conectare', 'Bun venit!');
        this.router.navigate(['/portal'], { replaceUrl: true })
      },
      err => {
        this.loading = false
        this.messagingService
          .sendError('Conectare', 'Verifica datele de conectare!')
      }
    )
  }

}
