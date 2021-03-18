import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public username: string = "";
  public password: string = "";

  constructor(
    private messagingService: MessagingService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.loginService
    .login(this.username, this.password)
    .subscribe(
      res => {
        this.messagingService
          .sendInfo('Conectare reusita', 'Bun venit!');
      },
      err => {
        this.messagingService
          .sendError('Conectare esuata', 'Verifica datele de conectare!')
      }
    )
  }

}
