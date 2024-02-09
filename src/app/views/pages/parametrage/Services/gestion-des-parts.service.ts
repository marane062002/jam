import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../gestion-parc-auto/common/request/request-util';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionPartsService {
  constructor(private http: HttpClient) { }
  private baseUrl = environment.API_MARCHEGROS



  updateParts(partsData: any): Observable<any> {
    const url = `${this.baseUrl}update-parts`;
    return this.http.put(url, partsData);
  }

  getParts(req?: any): Observable<HttpResponse<any[]>> {
    const options = createRequestOption(req);
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.get<any[]>(`${this.baseUrl}parts`, { params: options, observe: 'response' });
  }

}
