import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Hangar } from '../../../../core/_base/layout/models/Hangar'
import { createRequestOption } from '../../gestion-parc-auto/common/request/request-util';
@Injectable({
  providedIn: 'root'
})
export class HangarService {

  private baseUrl = environment.API_MARCHEGROS;
  constructor(private http: HttpClient) { }

  createHangar(hangar: Hangar): Observable<HttpResponse<Hangar>> {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.post<Hangar>(`${this.baseUrl}` + 'create-hangars', hangar, { observe: 'response' });
  }

  getAllHangars(req?: any): Observable<HttpResponse<Hangar[]>> {

    const options = createRequestOption(req);
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')

    return this.http.get<Hangar[]>(`${this.baseUrl}hangars`, { params: options, observe: 'response' });
  }
  getMaxId(req?: any): Observable<HttpResponse<any>> {

    const options = createRequestOption(req);
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')

    return this.http.get<any>(`${this.baseUrl}hangars-max-id`, { params: options, observe: 'response' });
  }

  deleteHangar(id: number) {

    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')

    return this.http.delete(`${this.baseUrl}delete-hangars/${id}`, { observe: 'response' });

  }

  getById(id): Observable<HttpResponse<{}>> {

    return this.http.get(this.baseUrl + "hangars/" + id, { observe: 'response' })
    // .pipe(catchError(this.handleError))
  }
  update(hangar: Hangar): Observable<HttpResponse<{}>> {
    return this.http.put(this.baseUrl + "update-hangars", hangar, { observe: 'response' })
    // .pipe(catchError(this.handleError))
  }

  async getAllHangar() {
    return await this.http.get<any>(this.baseUrl + 'hangars' + '?size=1000').toPromise();
  }
}
