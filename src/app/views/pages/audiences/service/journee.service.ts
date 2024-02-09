import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJournee } from '../../../../core/_base/layout/models/abattoir/journee';
import { createRequestOption } from '../../../../core/request/request-util';
import { environment } from '../../../../../environments/environment';

export type EntityResponseType = HttpResponse<IJournee>;
export type EntityArrayResponseType = HttpResponse<IJournee[]>;

@Injectable({
  providedIn: 'root'
})

export class JourneeService {

  constructor(private http: HttpClient) { }

  protected resourceUrl = environment.API_ABATOIR;

  createJournee(journee: IJournee): Observable<EntityResponseType> {
    console.log(journee);
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    //
    console.log("serviceJournee: " + `${this.resourceUrl}` + 'journees')
    return this.http.post<IJournee>(`${this.resourceUrl}` + 'journees', journee, { observe: 'response' });

  }

  updateJournee(journee: IJournee): Observable<EntityResponseType> {
    console.log(journee);
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.put<IJournee>(`${this.resourceUrl}` + 'journees', journee, { observe: 'response' });
  }

  deleteJournee(id: number): Observable<HttpResponse<{}>> {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.delete(`${this.resourceUrl}` + 'journees' + `/${id}`, { observe: 'response' });
  }

  async getJourneeById(id: number) {
    return await this.http.get<any>(this.resourceUrl + 'journees' + `/${id}`).toPromise();
  }

  async getAllJournees(){
    return await this.http.get<any>(this.resourceUrl+'journees/getAll'+'?size=1000').toPromise();
  }


  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.get<IJournee[]>(`${this.resourceUrl}` + 'journees/getAll', { params: options, observe: 'response' });
  }
}
