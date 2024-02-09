import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { createRequestOption } from '../gestion-parc-auto/common/request/request-util';

@Injectable({
  providedIn: 'root'
})
export class DisponibiliteFondsService {
	private baseUrl = environment.marcheUrl + "/Disponibilite-Fonds/";

  constructor(private http: HttpClient) { }
  updateDisponibiliteFonds(partsData: any): Observable<any> {
    const url = `${this.baseUrl}update-disponibilite-fonds`;
    return this.http.put(url, partsData);
  }
  saveDisponibiliteFonds(partsData: any): Observable<any> {
    const url = `${this.baseUrl}save-disponibilite-fonds`;
    return this.http.post(url, partsData);
  }
  getDisponibiliteFonds(req?: any): Observable<HttpResponse<any[]>> {
    const options = createRequestOption(req);
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.get<any[]>(`${this.baseUrl}disponibilite-fonds`, { params: options, observe: 'response' });
  }
}
