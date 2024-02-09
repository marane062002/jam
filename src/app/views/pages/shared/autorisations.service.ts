import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AutorisationsService {
  //for server
  //private baseUrl = 'http://localhost:8080/gateway/Autorisation/Autorisation';

  //for dev
  private baseUrl = environment.autorisationUrl;
  private baseUrl3 = environment.API_ALFRESCO_URL +'/PjAutorisations';
  //private baseUrl = 'http://localhost:8994/Autorisation/';
  //private baseUrl = 'http://localhost:8080/Autorisations/Autorisation/';
  constructor(private http : HttpClient) { }
 /* getallautorisation(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'index');
  }*/

  async getallautorisation(){

    return await this.http.get<any>(this.baseUrl + 'index').toPromise();
  }

  getAllStatutAut(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllStatutAut');
  }

  deleteAutorisation(id): Observable<any> {
    return this.http.delete<Observable<any>>(this.baseUrl+'delete/'+id);
  }

  getByIdAutorisation(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'show/' + id);
  }

  sendaut(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'new',f);
  }

  edit(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'edit',f);
  }

  process(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'process',f);
  }

  // Add responsable autorisation
  createReponsable(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'createResp',f);
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

  getByIdautorisationpjs(f): Observable<any> {
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

  getByIdautorisationpjsTraitement(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl3+'/AllpjsTraitement/'+f);
  }

  PrintGenerator(id){
	const httpOptions = {
		responseType: 'arraybuffer' as 'json'
	};
	return this.http.get<any[]>(this.baseUrl +'print/' + id, httpOptions);
 }

}
