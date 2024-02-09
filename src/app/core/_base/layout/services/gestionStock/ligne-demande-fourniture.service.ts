import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ILigneDemandeFournistureDTO } from '../../models/LigneDemandeFournistureDTO';
import { SharedURLS } from '../../shared/shared-url';


 
export type LigneDemandeFournitureEntityResponse = HttpResponse<ILigneDemandeFournistureDTO>;
export type LigneDemandeFournitureArrayResponse = HttpResponse<ILigneDemandeFournistureDTO[]>;
export type LigneDemandeFournitureStringResponse = HttpResponse<string>;


@Injectable({
  providedIn: 'root'
})
export class LigneDemandeFournitureService {

  constructor(private _http : HttpClient) {
  }
 handleError = (_error  :  HttpErrorResponse) => {
    return throwError(_error) ;
 }

 getLigneDemandeFournitureByIdDemande(idDemandeFourniture : any) : Observable<LigneDemandeFournitureArrayResponse> {
  return this._http.get<LigneDemandeFournitureArrayResponse>(SharedURLS.ligneDemandeFourniture   +
    "/getLigneDemandeFournitureByIdDemande/"+idDemandeFourniture, 
    {observe : 'response'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
AllLigneDemandeFournitureByIdDemande(idDemandeFourniture : any,idsArticle:any) : Observable<LigneDemandeFournitureArrayResponse> {
  return this._http.get<LigneDemandeFournitureArrayResponse>(SharedURLS.ligneDemandeFourniture+ "/getLigneDemandeFournitureByIdDemande/"+idDemandeFourniture+"/"+idsArticle, 
    {observe : 'response'}).pipe(tap(console.log) , catchError(this.handleError))
}
updateLingeDemandeFourniture(lisgneDemandeFournitureListDto :ILigneDemandeFournistureDTO[]){
  return this._http.put<LigneDemandeFournitureArrayResponse>(SharedURLS.ligneDemandeFourniture   + "/LigneDemandeFournitureByIdDemande",lisgneDemandeFournitureListDto,  
  {'responseType' : 'text' as 'json'})
  .pipe(tap(console.log) , catchError(this.handleError))
   
}
 
}

