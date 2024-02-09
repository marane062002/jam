import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArreteFiscal } from '../../../../core/_base/layout/models/abattoir/arrete-fiscal';
//import { createRequestOption } from 'src/app/core/request/request-util';
import { createRequestOption } from '../../../../core/request/request-util';
import { environment } from '../../../../../environments/environment';

export type EntityResponseType = HttpResponse<IArreteFiscal>;
export type EntityArrayResponseType = HttpResponse<IArreteFiscal[]>;

@Injectable({
  providedIn: 'root'
})
export class ArreteFiscalService {

  constructor(private http: HttpClient) { }

  protected resourceUrl = environment.API_ABATOIR;


  createArreteFiscal(arreteFiscal: IArreteFiscal): Observable<EntityResponseType> {
    console.log(arreteFiscal);
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.post<IArreteFiscal>(`${this.resourceUrl}` + 'arret-fiscals', arreteFiscal, { observe: 'response' });

  }

  updateArreteFiscal(chevillard: IArreteFiscal): Observable<EntityResponseType> {
    console.log(chevillard);
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.put<IArreteFiscal>(`${this.resourceUrl}` + 'arret-fiscals', chevillard, { observe: 'response' });
  }

  deleteArreteFiscal(id: number): Observable<HttpResponse<{}>> {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.delete(`${this.resourceUrl}` + 'arret-fiscals' + `/${id}`, { observe: 'response' });
  }

  async getArreteFiscalById(id: number) {
    return await this.http.get<any>(this.resourceUrl + 'arret-fiscals' + `/${id}`).toPromise()
  }

  async getAllArretesFiscales() {
    return await this.http.get<any>(this.resourceUrl + 'arret-fiscals/getAll'+'?size=1000').toPromise();
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IArreteFiscal[]>(`${this.resourceUrl}` + 'arret-fiscals/getAll', { params: options, observe: 'response' });
  }

}
