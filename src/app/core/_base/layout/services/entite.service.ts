import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError   } from 'rxjs';
import { IEntiteDTO } from '../models/entite-dto';
import { SharedURLS } from '../shared/shared-url';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

export type EntiteEntityResponse  = HttpResponse<IEntiteDTO> ;
export type EntiteArrayResponse = HttpResponse<IEntiteDTO[]>;
export type EntiteStringResponse =HttpResponse<string>;

@Injectable({
  providedIn: 'root'
})

export class EntiteService {

  constructor(private _http : HttpClient , private localStorege: LocalStorageService) {
    
   }
   headers = new HttpHeaders().set("Authorization" ,"Bearer "+this.localStorege.retrieve("token"))

  handleError = (_error  :  HttpErrorResponse) => {
     return throwError(_error) ;
  }
    
  getAllEntites() : Observable<EntiteArrayResponse> {
    return this._http.get<EntiteArrayResponse>(SharedURLS.entite , 
       {headers : this.headers  ,observe : 'response'})
      .pipe(tap(console.log) , catchError(this.handleError))
  }
  
}
