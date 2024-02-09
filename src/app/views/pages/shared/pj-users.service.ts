import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PjUsersService {
  private baseUrl = environment.API_ALFRESCO_URL +"/PjUsers/";
  constructor(private http : HttpClient) { }

  async getByIdUser(f){

    return await this.http.get<any>(this.baseUrl+'Allpjs/' +f).toPromise();
  }

  async getPartagesByIdUser(f){

    return await this.http.get<any>(this.baseUrl+'AllpjsPartages/' +f).toPromise();
  }

  createDocUser(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'CreerDocUser/' +f);
  }


  deleteByIdpjs(f){
    return this.http.delete<Observable<any>>(this.baseUrl+f);
  }

  deleteByIdpjsPartage(f){
    return this.http.delete<Observable<any>>(this.baseUrl+'deletePartage/'+f);
  }

  nouvellepj(v,id){
    const formda: FormData = new FormData();
    
  for(var i=0;i<v.length;i++){
    formda.append('file', v[i]);
  }
   formda.append("id",id);
    return this.http.post<Observable<any>>(this.baseUrl+'multiplefileupload',formda);
  }

  partagerpj(idAlf,docName,idUser,userSource){
    const formda: FormData = new FormData();
    formda.append("id",idAlf);
    formda.append("nameDoc",docName);
    formda.append("iduser",idUser);
    formda.append("source",userSource);
    return this.http.post<Observable<any>>(this.baseUrl+'transfereDoc',formda);
  }




}
