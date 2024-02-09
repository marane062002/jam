import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BiensService {

	private arrondissementUrl ='/arrondissements';


  
  private baseUrl = environment.bienUrl;
  private baseUrl1 = environment.espaceUrl;
  private baseUrl2 = environment.organisationUrl;
  constructor(private http : HttpClient) { }
  sendbien(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+"Creer",f);
  }
  updatebien(f): Observable<any> {
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

  async getAllBien(){

    return await this.http.get<any>(this.baseUrl + 'All').toPromise();
  }

  /*getAllBien(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'All');
  }*/
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

/* getArrondissement(){
	return  this.http.get<any>(this.baseUrl+this.arrondissementUrl+'/index');
  }
*/

getArrondissement(){
	return  this.http.get<any>(this.baseUrl2+this.arrondissementUrl+'/index');
}

}