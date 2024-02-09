import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IFacture } from '../../../../core/_base/layout/models/abattoir/facture';
//import { createRequestOption } from 'src/app/core/request/request-util';
import { createRequestOption } from '../../../../core/request/request-util';
import { environment } from '../../../../../environments/environment';
export type EntityResponseType = HttpResponse<IFacture>;
export type EntityArrayResponseType = HttpResponse<IFacture[]>;
@Injectable({
  providedIn: 'root'
})

export class FactureService {

  constructor(private http:HttpClient) { }

  protected resourceUrl = environment.API_ABATOIR;


  createFacture(facture: IFacture): Observable<EntityResponseType> {
   
    return this.http.post<IFacture>(`${this.resourceUrl}`+'factures', facture, { observe: 'response' });
  
  }

  updateFacture(facture: IFacture): Observable<EntityResponseType> {
    console.log(facture);

    return this.http.put<IFacture>(`${this.resourceUrl}`+ 'factures', facture, { observe: 'response'});
  }

  deleteFacture(id: number): Observable<HttpResponse<{}>> {

    return this.http.delete(`${this.resourceUrl}factures/${id}`, { observe: 'response' });
  }

  deleteEspeceFacture(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}espece-factures/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFacture[]>(`${this.resourceUrl}`+ 'factures/getAll',{  params: options, observe: 'response'});
  }

  
  async getAllFactures(){
    return await this.http.get<any>(this.resourceUrl+'factures/getAll'+'?size=1000').toPromise();
  }

  async getFactureById(id: number) {
    return await this.http.get<any>(this.resourceUrl + 'factures' + `/${id}`).toPromise();
  }

}

