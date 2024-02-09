import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IVehicule, Vehicule } from '../../../../core/_base/layout/models/vehicule';
import { createRequestOption } from '../../gestion-parc-auto/common/request/request-util';



@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  constructor(private http: HttpClient) { }
  private baseUrl = environment.API_MARCHEGROS
  async getAllVehicules() {
    return await this.http.get<any>(this.baseUrl + 'vehicules' + '?size=1000').toPromise();
  }
  createVehicule(vehicule: IVehicule): Observable<HttpResponse<Vehicule>> {
    console.log('testing with headers');
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.post<Vehicule>(`${this.baseUrl}` + 'add-vehicules', vehicule, { observe: 'response' });
  }


  query(req?: any): Observable<HttpResponse<Vehicule[]>> {
    const options = createRequestOption(req);
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.get<Vehicule[]>(`${this.baseUrl}vehicules`, { params: options, observe: 'response' });
  }
  getMaxId(req?: any): Observable<HttpResponse<any>> {

    const options = createRequestOption(req);
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')

    return this.http.get<any>(`${this.baseUrl}vehicules-max-id`, { params: options, observe: 'response' });
  }

  updateVehicule(vehicule: IVehicule): Observable<HttpResponse<Vehicule>> {
    console.log('testing with headers');

    return this.http.put<Vehicule>(`${this.baseUrl}update-vehicules/`, vehicule, { observe: 'response'});

  }
  deleteVehicule(id: number) {
    
    return this.http.delete(`${this.baseUrl}delete-vehicules/${id}`, { observe: 'response' });

  }
  getById(id): Observable<HttpResponse<{}>> {

    return this.http.get(this.baseUrl + "vehicules/" + id, { observe: 'response' })
  }
 

}
