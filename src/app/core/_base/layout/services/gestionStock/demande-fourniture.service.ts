import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DemandeFournitureDTO, IDemandeFournitureDTO } from '../../models/DemandeFournitureDTO';
import { SaveDemandeFournitureDTO } from '../../models/SaveDemandeFournitureDTO';
import { UpdateDemandeFournitureDTO } from '../../models/UpdateDemandeFournitureDTO';
import { ValiderChefFinanceDTO } from '../../models/ValiderChefFinanceDTO';
import { ValiderChefLogistiqueDTO } from '../../models/ValiderChefLogistiqueDTO';
import { ValiderChefServiceDTO } from '../../models/ValiderChefServiceDTO';
import { SharedURLS } from '../../shared/shared-url';


export type DemandeFournitureEntityResponse = HttpResponse<IDemandeFournitureDTO>;
export type DemandeFournitureArrayResponse = HttpResponse<IDemandeFournitureDTO[]>;
export type DemandeFournitureStringResponse = HttpResponse<string>;


@Injectable({
  providedIn: 'root'
})
export class DemandeFournitureService {
  constructor(private _http : HttpClient) {
  }
 handleError = (_error  :  HttpErrorResponse) => {
    return throwError(_error) ;
 }


 getAllDemandeFournitureByid(idDemandeFourniture : any) : Observable<DemandeFournitureEntityResponse> {
  return this._http.get<DemandeFournitureEntityResponse>(SharedURLS.demandeFourniture   +
    "/"+idDemandeFourniture, 
    {observe : 'response'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
getAllDemandeFournitureValideByChefServiceNotDeleted(idDemandeFourniture : any) : Observable<DemandeFournitureArrayResponse> {
  return this._http.get<DemandeFournitureArrayResponse>(SharedURLS.demandeFourniture   +
    "/getAllDemandeFournitureValideByChefServiceNotDeleted/"+idDemandeFourniture, 
    {observe : 'response'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
getAllDemandeFournitureValideByChefDevisionNotDeleted(idDemandeFourniture : any) : Observable<DemandeFournitureArrayResponse> {
  return this._http.get<DemandeFournitureArrayResponse>(SharedURLS.demandeFourniture   +
    "/getAllDemandeFournitureValideByChefDevisionNotDeleted/"+idDemandeFourniture, 
    {observe : 'response'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
getAllDemandeFournitureValideByChefLogistiqueNotDeleted(idDemandeFourniture : any) : Observable<DemandeFournitureArrayResponse> {
  return this._http.get<DemandeFournitureArrayResponse>(SharedURLS.demandeFourniture   +
    "/getAllDemandeFournitureValideByChefLogistiqueNotDeleted/"+idDemandeFourniture, 
    {observe : 'response'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
getAllDemandeFournitureValideByChefFinanceNotDeleted(idDemandeFourniture : any) : Observable<DemandeFournitureArrayResponse> {
  return this._http.get<DemandeFournitureArrayResponse>(SharedURLS.demandeFourniture   +
    "/getAllDemandeFournitureValideByChefFinanceNotDeleted/"+idDemandeFourniture, 
    {observe : 'response'})
    .pipe(tap(console.log) , catchError(this.handleError))
}

getAllDemandeFournitureByStatusandFonctionnaireNotDeleted(idFonctainnaire:any,codeStatus : any) : Observable<DemandeFournitureArrayResponse> {
  return this._http.get<DemandeFournitureArrayResponse>(SharedURLS.demandeFourniture   +
    "/getAllDemandeFournitureByStatusandFonctionnaireNotDeleted/"+idFonctainnaire+"/"+codeStatus, 
    {observe : 'response'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
 getAllDemandeFournitureByStatusNotDeleted(codeStatus : number) : Observable<DemandeFournitureArrayResponse> {
  return this._http.get<DemandeFournitureArrayResponse>(SharedURLS.demandeFourniture   +
    "/getAllDemandeFournitureByStatusNotDeleted/"+codeStatus, 
    {observe : 'response'})
    .pipe(tap(console.log) , catchError(this.handleError))
}



getAllDemandeFournituretheChefNotDeleted() : Observable<DemandeFournitureArrayResponse> {
  return this._http.get<DemandeFournitureArrayResponse>(SharedURLS.demandeFourniture   +
    "/getAllDemandeFournituretheChefNotDeleted", 
    {observe : 'response'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
getAllDemandeFournitureByStatusandIdFonctionnaireNotDeleted(idFonctionnaire : any) : Observable<DemandeFournitureArrayResponse> {
  return this._http.get<DemandeFournitureArrayResponse>(SharedURLS.demandeFourniture   +
    "/getAllDemandeFournitureByStatusandIdFonctionnaireNotDeleted/"+idFonctionnaire, 
    {observe : 'response'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
getAllDemandeFournitureByStatusTraitedandIdFonctionnaireNotDeleted(idFonctionnaire : any) : Observable<DemandeFournitureArrayResponse> {
  return this._http.get<DemandeFournitureArrayResponse>(SharedURLS.demandeFourniture   +
    "/getAllDemandeFournitureByStatusTraitedandIdFonctionnaireNotDeleted/"+idFonctionnaire, 
    {observe : 'response'})
    .pipe(tap(console.log) , catchError(this.handleError))
}

saveDemandeFourniture(saveDemandeFourniture : SaveDemandeFournitureDTO) : Observable<DemandeFournitureStringResponse> {
  return this._http.post<DemandeFournitureStringResponse>(SharedURLS.demandeFourniture  , saveDemandeFourniture , 
    {'responseType' : 'text' as 'json'})
    .pipe(tap(console.log) , catchError(this.handleError))
}

updateDemandeFourniture(idDemandeFourniture : any  ,UpdateDemandeFournitureDTO : UpdateDemandeFournitureDTO) : Observable<DemandeFournitureStringResponse> {
  return this._http.put<DemandeFournitureStringResponse>(SharedURLS.demandeFourniture +'/'+idDemandeFourniture , UpdateDemandeFournitureDTO , 
    {'responseType' : 'text' as 'json'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
transferDemandeFourniture(idDemandeFourniture : any  ,UpdateDemandeFournitureDTO : DemandeFournitureDTO) : Observable<DemandeFournitureStringResponse> {
  return this._http.put<DemandeFournitureStringResponse>(SharedURLS.demandeFourniture +'/transfer/'+idDemandeFourniture , UpdateDemandeFournitureDTO , 
    {'responseType' : 'text' as 'json'})
    .pipe(tap(console.log) , catchError(this.handleError))
}

validerParChefLogistique(validerParChefLogistique  : ValiderChefServiceDTO) : Observable<DemandeFournitureStringResponse> {
  return this._http.post<DemandeFournitureStringResponse>(SharedURLS.demandeFourniture +'/validerParChefLogistique', validerParChefLogistique , 
    {'responseType' : 'text' as 'json'})
    .pipe(tap(console.log) , catchError(this.handleError))
}

validerParChefFinance(validerParChefFinance : ValiderChefFinanceDTO) : Observable<DemandeFournitureStringResponse> {
  return this._http.post<DemandeFournitureStringResponse>(SharedURLS.demandeFourniture +'/validerParChefFinance', validerParChefFinance , 
    {'responseType' : 'text' as 'json'})
    .pipe(tap(console.log) , catchError(this.handleError))
}

validerParChefService(validerParChef: ValiderChefServiceDTO) : Observable<DemandeFournitureStringResponse> {
  return this._http.post<DemandeFournitureStringResponse>(SharedURLS.demandeFourniture +'/validerParChefService', validerParChef , 
    {'responseType' : 'text' as 'json'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
validerParDirecteur(validerParChef: ValiderChefServiceDTO) : Observable<DemandeFournitureStringResponse> {
  return this._http.post<DemandeFournitureStringResponse>(SharedURLS.demandeFourniture +'/validerParDirecteur', validerParChef , 
    {'responseType' : 'text' as 'json'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
validerParChefDevision(validerParChefFinance : ValiderChefFinanceDTO) : Observable<DemandeFournitureStringResponse> {
  return this._http.post<DemandeFournitureStringResponse>(SharedURLS.demandeFourniture +'/validerParChefDivision', validerParChefFinance , 
    {'responseType' : 'text' as 'json'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
rejecterParChefService(validerParChefLogistique  : ValiderChefLogistiqueDTO) : Observable<DemandeFournitureStringResponse> {
  return this._http.post<DemandeFournitureStringResponse>(SharedURLS.demandeFourniture +'/rejeterParChefService', validerParChefLogistique , 
    {'responseType' : 'text' as 'json'})
    .pipe(tap(console.log) , catchError(this.handleError))
}
ModifierDemande(validerParChefLogistique  : ValiderChefLogistiqueDTO) : Observable<DemandeFournitureStringResponse> {
  return this._http.post<DemandeFournitureStringResponse>(SharedURLS.demandeFourniture +'/modifierDemande', validerParChefLogistique , 
    {'responseType' : 'text' as 'json'})
    .pipe(tap(console.log) , catchError(this.handleError))
}

getCountDemandeFourniture() : Observable<number> {
  return this._http.get<number>(SharedURLS.demandeFourniture+ "/count",)
}
getBonById(id: number){
  window.open(SharedURLS.demandeFourniture+'/generateBonDemandeFournutire/'+id )
 }
}
