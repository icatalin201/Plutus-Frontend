import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../interfaces/login.request';

@Injectable()
export class LoginService {

  private readonly KEYCLOAK_URL = environment.keycloakUrl;
  private readonly LOGIN_URL = `${this.KEYCLOAK_URL}/auth/realms/plutus/protocol/openid-connect/token`; 
  
  public constructor(
    private httpClient: HttpClient
  ) { }

  public login(request: LoginRequest): Observable<any> {
    const body = new HttpParams()
      .set('username', request.username)
      .set('password', request.password)
      .set('grant_type', 'password')
      .set('client_id', 'plutus-app')
    return this.httpClient.post(this.LOGIN_URL, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
}
