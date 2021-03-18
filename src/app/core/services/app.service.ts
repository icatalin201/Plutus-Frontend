import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly USER_EMAIL_FLAG = 'plutus.user.email';
  private readonly USER_TOKEN_FLAG = 'plutus.user.token';

  public constructor() { }

  public isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  public storeLoggedUser(email: string, token: string): void {
    localStorage.setItem(this.USER_EMAIL_FLAG, email);
    localStorage.setItem(this.USER_TOKEN_FLAG, token);
  }

  public getEmail(): string | null {
    return localStorage.getItem(this.USER_EMAIL_FLAG);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.USER_TOKEN_FLAG);
  }

  public logout(): void {
    localStorage.removeItem(this.USER_TOKEN_FLAG);
  }
}
