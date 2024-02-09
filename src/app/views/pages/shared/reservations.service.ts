import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private baseUrl = environment.reservationUrl;
  private baseUrl3 = environment.API_ALFRESCO_URL +'/PjReservations';
  //private baseUrl = 'http://localhost:8080/Autorisations/Autorisation/';
  constructor(private http : HttpClient) { }

  async getallautorisation(){

    return await this.http.get<any>(this.baseUrl + 'index').toPromise();
  }

  /*getallautorisation(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'index');
  }*/
  getAllStatutAut(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllStatutAut');
  }

  deleteAutorisation(id): Observable<any> {
    return this.http.delete<Observable<any>>(this.baseUrl+'delete/' +id);
  }

  getByIdAutorisation(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'show/' + id);
  }

  getStatutByNum(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'StatutByNum/' + id);
  }

  sendaut(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'new/',f);
  }

  edit(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'edit/',f);
  }

  process(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'process/',f);
  }

  paye(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'paye/',f);
  }

  nouvellepj(v,id){
    if(v.length!=0){
      const formda: FormData = new FormData();
      for(var i=0;i<v.length;i++){
        formda.append('file', v[i]);
      }
       formda.append("id",id);
        return this.http.post<Observable<any>>(this.baseUrl3+'/multiplefile',formda);
    }
   
  }

  getByIdreservationpjs(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl3+'/Allpjs/'+f);
  }

  nouvellepjtraitement(v,id){
    if(v.length!=0){
      const formda: FormData = new FormData();
      for(var i=0;i<v.length;i++){
        formda.append('file', v[i]);
      }
       formda.append("id",id);
        return this.http.post<Observable<any>>(this.baseUrl3+'/Traitementmultiplefile',formda);
    }
   
  }

  getByIdreservationpjsTraitement(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl3+'/AllpjsTraitement/'+f);
  }
}
