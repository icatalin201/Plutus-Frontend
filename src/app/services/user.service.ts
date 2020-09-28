import { Injectable } from '@angular/core';
import { LoggedUser } from '../interfaces/logged.user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly LOGGED_USER_FLAG = 'plutus.logged.user.flag';

  public constructor() { }

  public isLoggedIn(): boolean {
    return this.getLoggedUser() !== null;
  }

  public storeLoggedUser(user: LoggedUser): void {
    const u = JSON.stringify(user);
    localStorage.setItem(this.LOGGED_USER_FLAG, u);
  }

  public getLoggedUser(): LoggedUser | null {
    const u = localStorage.getItem(this.LOGGED_USER_FLAG);
    if (u === null) {
      return null;
    }
    return JSON.parse(u);
  }
}
