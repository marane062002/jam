import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReclamationsService {
// LOCAL  
   private baseUrl = environment.reclamationUrl;
   private baseUrl1 = environment.ppsourceUrl+'/';
   private baseUrl2 = environment.pmsourceUrl+'/';
   private baseUrl3 =  environment.API_ALFRESCO_URL +'/PjReclamations';
   private baseUrl4= environment.API_ALFRESCO_URL +'/PjTraitementReclamations';

  //private baseUrl = 'http://192.168.1.230:8080/Reclamations/Reclamation/';
  // private baseUrl1 = 'http://192.168.1.230:8080/PPSource/PPSource/';
  // private baseUrl2 = 'http://192.168.1.230:8080/PMSource/PMSource/';
  // private baseUrl3 = 'http://192.168.1.230:8080/Alfresco/PjReclamations';
  // private baseUrl4='http://192.168.1.230:8080/Alfresco/PjTraitementReclamations';
  constructor(private http : HttpClient) { }
  /*getallreclamation(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'All');
  }*/

  async getallreclamation(){

    return await this.http.get<any>(this.baseUrl + 'All').toPromise();
  }

  deletereclamation(id): Observable<any> {
    console.log('in service');
    return this.http.delete<Observable<any>>(this.baseUrl  +'delete/'+id);
  }

  download(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl3 + 'Hello');
  }
  getBySousType(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllSoustype/'+f);
  }

  getByIdreclamation(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'show/' +f);
  }

  deleteByIdpjs(f): Observable<any> {
    return this.http.delete<Observable<any>>(this.baseUrl3+'/' +f);
  }

  deltePjByIdReclamation(f): Observable<any> {
    console.log("test")
    return this.http.delete<Observable<any>>(this.baseUrl3+'/ByIdReclamation/' +f);
  }


  getByIdreclamationpjs(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl3+'/Allpjs/'+f);
  }

  getByIdreclamationpjstraitement(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl4+'/AllpjsTraitementRec/'+f);
  }
   opt = { responseType: 'text'};
   //options: {{ responseType: string; }}
  /*downloadDocumentAlf(f): Observable<HttpResponse<Blob>>{
    const requestOptions: Object = {
      /* other options here */
    /*  responseType: ResponseContentType.Blob 
    }
    return this.http.get<Observable<any>>(this.baseUrl3 +'/'+f, requestOptions);
  }*/

  getByCinpp(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl1 +'ByCIN/'+f);
  }

  getAllCinpp(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl1 + 'ByCIN/All');
  }
  
  getByMailpp(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl1 +'ByMail/'+f);
  }

  getAllMailpp(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl1 + 'ByMail/All');
  }

  getByIdf(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl2 +'ByIdf/'+f);
  }

  getAllIdf(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl2 + 'Allidf');
  }

  getByRc(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl2 +'ByRc/'+f);
  }

  getAllRc(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl2 + 'Allrc');
  }
  
  sendreclamation(f,v): Observable<any> {
    console.log('in send');
    console.log(f);
    return this.http.post<Observable<any>>(this.baseUrl + 'Creer',f);
  }

  edit(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'edit',f);
  }

  process(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'process',f);
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
  nouvellepjTraitement(v,id){
    if(v.length!=0){
    const formda: FormData = new FormData();
  for(var i=0;i<v.length;i++){
    formda.append('file', v[i]);
  }
   formda.append("id",id);
    return this.http.post<Observable<any>>(this.baseUrl4+'/multiplefile',formda);
  }}
  sendpjs(v): Observable<any> {
    console.log('in send ----------');
    console.log(v);
    console.log(v.length);
    //console.log(v.name);
    const formda: FormData = new FormData();
  for(var i=0;i<v.length;i++){
    formda.append('file', v[i]);
  }
   
    return this.http.post<Observable<any>>(this.baseUrl + 'CreerPjs',formda);
  }
  
  sendfile(f): Observable<any> {
    console.log('in send file');
    console.log(f);
    console.log(f.name);
    const formdata: FormData = new FormData();
    formdata.append('file', f);
    console.log(formdata)
    return this.http.post<Observable<any>>(this.baseUrl + 'CreerFile',formdata);
  }

  putreclamation(id,f): Observable<any> {
    console.log('in put')
    return this.http.put<Observable<any>>('http://localhost:8991/Reclamation/'+id ,f);
  }

  getallseverite(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllSeverite');
  }
  
  getallcriticite(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllCriticite');
  }

  getallType(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllType');
  }
  
  getallSousType(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllSoustype');
  }

  getallStatut(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllStatut');
  }

  getallCanal(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllCanal');
  }

  getallCanalReponse(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllCanalReponse');
  }

  
  
}
