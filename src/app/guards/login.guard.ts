import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  public constructor(
    private router: Router,
    private userService: UserService
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
      const isLogged = this.userService.isLoggedIn();
      const canActivate = !isLogged;
      if (!canActivate) {
      this.router.navigate(['/'], { replaceUrl: true });
      }
      return canActivate;
  }

}
