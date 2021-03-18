import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/core/services/app.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {

  private readonly KEYCLOAK_URL = environment.keycloakUrl;
  private readonly LOGIN_URL = `${this.KEYCLOAK_URL}/auth/realms/plutus/protocol/openid-connect/token`; 
  
  public constructor(
    private httpClient: HttpClient,
    private appService: AppService
  ) { }

  public login(username: string, password: string): Observable<boolean> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password')
      .set('client_id', 'plutus-app')
    return this.httpClient.post(this.LOGIN_URL, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }).pipe(
      map((res: any) => {
        this.appService.storeLoggedUser(username, res.access_token);
        return true;
      })
    );
  }
}
