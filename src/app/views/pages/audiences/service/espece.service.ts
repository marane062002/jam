import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IEspece } from '../../../../core/_base/layout/models/abattoir/espece';
import { createRequestOption } from '../../../../core/request/request-util';
import { environment } from '../../../../../environments/environment';

export type EntityResponseType = HttpResponse<IEspece>;
export type EntityArrayResponseType = HttpResponse<IEspece[]>;

@Injectable({
  providedIn: 'root'
})
export class EspeceService {

  constructor(private http:HttpClient) { }

  protected resourceUrl = environment.API_ABATOIR;


  createEspece(espece: IEspece): Observable<EntityResponseType> {
   
    return this.http.post<IEspece>(`${this.resourceUrl}`+'especes', espece, { observe: 'response' });
  
  }

  updateEspece(espece: IEspece): Observable<EntityResponseType> {
    console.log(espece);
  
    return this.http.put<IEspece>(`${this.resourceUrl}`+ 'especes', espece, { observe: 'response'});
  }

  deleteEspece(id: number): Observable<HttpResponse<{}>> {
   
    return this.http.delete(`${this.resourceUrl}`+'especes'+`/${id}`, { observe: 'response' });
  }

  async getEspeceById(id:number){
    return await this.http.get<any>(this.resourceUrl+'especes'+`/${id}`).toPromise();
  }

  async getAllEspeces(){
    return await this.http.get<any>(this.resourceUrl+'especes/getAll'+'?size=1000').toPromise();
  }

  
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    /*let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*')
    */
    return this.http.get<IEspece[]>(`${this.resourceUrl}`+ 'especes/getAll',{  params: options, observe: 'response'});
    //return this.http.get<IChevillard[]>(this.resourceUrl, { params: options, observe: 'response',headers: headers });
  }
}
