import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IChevillard } from '../../../../core/_base/layout/models/abattoir/chevillard';
//import { createRequestOption } from 'src/app/core/request/request-util';
import { createRequestOption } from '../../../../core/request/request-util';
import { environment } from '../../../../../environments/environment';

export type EntityResponseType = HttpResponse<IChevillard>;
export type EntityArrayResponseType = HttpResponse<IChevillard[]>;

@Injectable({
  providedIn: 'root'
})
export class ChevillardService {

  constructor(private http:HttpClient) { }

  protected resourceUrl = environment.API_ABATOIR;


  createChevillard(chevillard: IChevillard): Observable<EntityResponseType> {
    console.log(chevillard);

    return this.http.post<IChevillard>(`${this.resourceUrl}`+'chevillards', chevillard, { observe: 'response' });
  
  }

  updateChevillard(chevillard: IChevillard): Observable<EntityResponseType> {
    console.log(chevillard);
  
    return this.http.put<IChevillard>(`${this.resourceUrl}`+ 'chevillards', chevillard, { observe: 'response'});
  }

  deleteChevillard(id: number): Observable<HttpResponse<{}>> {
    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*')
    return this.http.delete(`${this.resourceUrl}`+'chevillards'+`/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*')
    return this.http.get<IChevillard[]>(`${this.resourceUrl}`+ 'chevillards/getAll',{  params: options, observe: 'response'});
    //return this.http.get<IChevillard[]>(this.resourceUrl, { params: options, observe: 'response',headers: headers });
  }

  async getAllChevillards(){
    return await this.http.get<any>(this.resourceUrl+'chevillards/getAll'+'?size=1000').toPromise();
  }

  async getChevillardById(id:number){
    return await this.http.get<any>(this.resourceUrl+'chevillards'+`/${id}`).toPromise()
  }

  /* getAllChevillards(req?: any): Observable<IChevillard[]>{
    const options = createRequestOption(req);
    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*')
    return this.http.get<IChevillard[]>(`${this.resourceUrl}`+'chevillards');
  } */
 
  getById(id): Observable<HttpResponse<{}>> {

		return this.http.get(this.resourceUrl + "chevillards/" + id, { observe: 'response' })
	}
}
