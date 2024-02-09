import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApplicationUser } from '../models/application-user';
import { SharedURLS } from '../shared/shared-url';

@Injectable({
  providedIn: 'root'
})
export class AppplicationLoginService {

  constructor( private _http: HttpClient) {}

  handleError = (error: HttpErrorResponse) => {
      return throwError(error);
  };

  login(authRequest: ApplicationUser): Observable<HttpResponse<string>> {
    return this._http
        .post<HttpResponse<string>>(
            SharedURLS.login + "/authenticate",
            authRequest,
            {
                observe: "response",
            }
        )
        .pipe(tap(console.log), catchError(this.handleError));
}


changerPwd(id : any , pwd : string) : Observable<HttpResponse<string>> {
  return  this._http.patch<HttpResponse<string>>( SharedURLS.fonctionnaire + "/changePWD/" + id
   , pwd , {responseType :'text' as 'json'}).pipe(tap(console.log) , catchError(this.handleError))
}
}
