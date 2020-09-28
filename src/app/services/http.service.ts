import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly API_URL: string = environment.apiUrl;
  private readonly APP_CONTENT_TYPE: string = environment.contentType;

  public constructor(
    private readonly client: HttpClient
  ) { }

  public get<T>(
    uri: string,
    token?: string
  ): Observable<T> {
    const url = this.API_URL + uri;
    const headers = this.createHeaders(token);
    return this.client
      .get<T>(url, { headers })
      .pipe(catchError(error => this.onError(error)));
  }

  public post<T>(
    uri: string,
    body: any,
    token?: string
  ): Observable<T> {
    const url = this.API_URL + uri;
    const headers = this.createHeaders(token);
    return this.client
      .post<T>(url, body, { headers })
      .pipe(catchError(error => this.onError(error)));
  }

  public put<T>(
    uri: string,
    body: any,
    token?: string
  ): Observable<T> {
    const url = this.API_URL + uri;
    const headers = this.createHeaders(token);
    return this.client
      .put<T>(url, body, { headers })
      .pipe(catchError(error => this.onError(error)));
  }

  public delete<T>(
    uri: string,
    token?: string
  ): Observable<T> {
    const url = this.API_URL + uri;
    const headers = this.createHeaders(token);
    return this.client
      .delete<T>(url, { headers })
      .pipe(catchError(error => this.onError(error)));
  }

  private onError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401 || error.status === 403) { }
    return throwError(error);
  }

  private createHeaders(token?: string): {[header: string]: string | string[]} {
    const headers = {
      'Content-Type': this.APP_CONTENT_TYPE,
      'Accept': this.APP_CONTENT_TYPE
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

}
