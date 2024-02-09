import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRoleDTO } from '../models/role-dto';
import { Observable, throwError   } from 'rxjs';
import { SharedURLS } from '../shared/shared-url';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
export type RoleEntityResponse = HttpResponse<IRoleDTO>
export type RoleArrayResponse = HttpResponse<IRoleDTO[]>
export type RoleStringResponse = HttpResponse<string>

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http : HttpClient , private localStorege: LocalStorageService) {
    
  }
  headers = new HttpHeaders().set("Authorization" ,"Bearer "+this.localStorege.retrieve("token"))

 handleError = (_error  :  HttpErrorResponse) => {
    return throwError(_error) ;
 }
   

 getAllRoles() : Observable<RoleArrayResponse> {
   return this._http.get<RoleArrayResponse>(SharedURLS.role , 
    { headers : this.headers  , observe : 'response'})
     .pipe(tap(console.log) , catchError(this.handleError))
 }
}
