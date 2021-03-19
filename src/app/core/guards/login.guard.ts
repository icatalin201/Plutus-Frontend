import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  public constructor(
    private router: Router,
    private appService: AppService
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
      const isLogged = this.appService.isLoggedIn();
      const canActivate = !isLogged;
      if (!canActivate) {
        this.router.navigate(['/portal'], { replaceUrl: true });
      }
      return canActivate;
  }

}
