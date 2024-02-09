import { FonctionnaireDTO, IFonctionnaireDTO } from '../models/fonctionnaire-dto';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError   } from 'rxjs';
import { SharedURLS } from '../shared/shared-url';
import { catchError, tap } from 'rxjs/operators';
import { UpdateFonctionnaireDTO } from '../models/UpdateFonctionnaireDTO';
import { SearchFonctionnaireDTO } from '../models/SearchFonctionnaireDTO';
import { LocalStorageService } from 'ngx-webstorage';

export type FonctionnaireEntityResponse = HttpResponse<IFonctionnaireDTO>
export type FonctionnaireArrayResponse = HttpResponse<IFonctionnaireDTO[]>
export type FonctionnaireStringResponse = HttpResponse<string>

@Injectable({
  providedIn: 'root'
})
export class FonctionnaireService {
  

  constructor(private _http : HttpClient , private localStorege: LocalStorageService) {
  }

  headers = new HttpHeaders().set("Authorization" ,"Bearer "+this.localStorege.retrieve("token"))
 handleError = (_error  :  HttpErrorResponse) => {
    return throwError(_error) ;
 }
   
 getAllFonctionnaires() : Observable<FonctionnaireArrayResponse> {
   return this._http.get<FonctionnaireArrayResponse>(SharedURLS.fonctionnaire , 
     {headers : this.headers  ,observe : 'response'})
     .pipe(tap(console.log) , catchError(this.handleError))
 }
 getAllFonctionnairesparcAuto() : Observable<FonctionnaireArrayResponse> {
  return this._http.get<FonctionnaireArrayResponse>(SharedURLS.fonctionnaire+"/parcAuto" , 
    {headers : this.headers  ,observe : 'response'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
getAllRoleDirecteur() : Observable<FonctionnaireArrayResponse> {
  return this._http.get<FonctionnaireArrayResponse>(SharedURLS.fonctionnaire+"/AllRoleDirecteur" , 
    {headers : this.headers  ,observe : 'response'})
    .pipe(tap(console.log) , catchError(this.handleError))
}


 getFonctionnaireById(idFonctionnaire : number) : Observable<FonctionnaireEntityResponse>
 {
   return this._http.get<FonctionnaireEntityResponse>(SharedURLS.fonctionnaire + '/' + idFonctionnaire  , 
      { headers : this.headers  , observe : "response"})
      .pipe(tap(console.log) , catchError(this.handleError) )
 }

 saveFonctionnaire(fonctionniareObject : FonctionnaireDTO) : Observable<FonctionnaireStringResponse> {
   return this._http.post<FonctionnaireStringResponse>(SharedURLS.fonctionnaire , fonctionniareObject , 
        { headers : this.headers  , responseType : 'text' as 'json'})
        .pipe(tap(console.log) , catchError(this.handleError) )
 }

 updateFonctionnaire(idFonctionnaire : number  , updatedObjectFonctionnaire : UpdateFonctionnaireDTO ) : Observable<FonctionnaireStringResponse>{
  return this._http.put<FonctionnaireStringResponse>(SharedURLS.fonctionnaire + '/' + idFonctionnaire , updatedObjectFonctionnaire , 
    { headers : this.headers  , responseType : 'text' as 'json'})
    .pipe(tap(console.log) , catchError(this.handleError) )
 }

 deleteFonctionnaire(idFonctionnaire : number) : Observable<FonctionnaireStringResponse>
 {
   return this._http.delete<FonctionnaireStringResponse>(SharedURLS.fonctionnaire + '/' + idFonctionnaire  , 
   { headers : this.headers  , responseType : 'text' as 'json'})
      .pipe(tap(console.log) , catchError(this.handleError) )
 }
 

 activeFonctionnaire(idFonctionnaire : number) : Observable<FonctionnaireStringResponse>
 {
   return this._http.get<FonctionnaireStringResponse>(SharedURLS.fonctionnaire + '/activeFonctionnaire/' + idFonctionnaire  , 
   { headers : this.headers  ,responseType : 'text' as 'json'})
      .pipe(tap(console.log) , catchError(this.handleError) )
 }

 desactiveFonctionnaire(idFonctionnaire : number) : Observable<FonctionnaireStringResponse>
 {
   return this._http.get<FonctionnaireStringResponse>(SharedURLS.fonctionnaire + '/desactiveFonctionnaire/' + idFonctionnaire  , 
   { headers : this.headers  , responseType : 'text' as 'json'})
      .pipe(tap(console.log) , catchError(this.handleError) )
 }

 searchFonctionnaire(searchFonctionnaire : SearchFonctionnaireDTO) : Observable<FonctionnaireArrayResponse> {
  return this._http.post<FonctionnaireArrayResponse>(SharedURLS.fonctionnaire  +"/searchFonctionnaire", searchFonctionnaire , 
  { headers : this.headers  ,observe : "response"})
       .pipe(tap(console.log) , catchError(this.handleError) )
}

}
