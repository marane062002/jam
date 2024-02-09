import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BiensReservationService {
  private baseUrl  = environment.bienReservationUrl;
  private baseUrl1 = environment.espaceReservationUrl;
  constructor(private http : HttpClient) { }
  sendbien(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+"Creer",f);
  }

  edit(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+"edit",f);
  }

  sendespace(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl1+"Creer",f);
  }
  getTypesBien(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'AllTypes');
  }
  getbienById(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'show/'+id);
  }

  getAllBien(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'index');
  }
  deletebien(id): Observable<any> {
    return this.http.delete<Observable<any>>(this.baseUrl +id);
  }
  getByTypeBien(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'ByType/'+id);
  }
  getEspaceByBien(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'ByBien/'+id);
  }
  getTypeAutorisation(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'AllTypesAutorisations');
  }
}
