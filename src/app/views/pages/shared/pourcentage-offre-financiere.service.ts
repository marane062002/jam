import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { createRequestOption } from '../gestion-parc-auto/common/request/request-util';

@Injectable({
  providedIn: 'root'
})
export class PourcentageOffreFinanciereService {
	private baseUrl = environment.marcheUrl + "/pourcentage-offre-financiere/";

  constructor(private http: HttpClient) { }
  updatePourcentageOffreFinanciere(partsData: any): Observable<any> {
    const url = `${this.baseUrl}update-pourcentage-offre-financiere`;
    return this.http.put(url, partsData);
  }
  savePourcentageOffreFinanciere(partsData: any): Observable<any> {
    const url = `${this.baseUrl}save-pourcentage-offre-financiere`;
    return this.http.post(url, partsData);
  }
  getPourcentageOffreFinanciere(req?: any): Observable<HttpResponse<any[]>> {
    const options = createRequestOption(req);
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.get<any[]>(`${this.baseUrl}pourcentage-offre-financiere`, { params: options, observe: 'response' });
  }
}
