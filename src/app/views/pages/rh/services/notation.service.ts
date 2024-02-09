import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root' 
})
export class NotationService {
 
  
  private baseUrl = environment.notationUrl;

  
 
  constructor(private http:HttpClient) { } 

  
  public getRessource(url): Observable <any>{

    let notations = this.http.get(this.baseUrl+url).toPromise();
    return forkJoin([notations]);
  }
  
  public getRessourceById(id: number,url): Observable<any> {
    return this.http.get<any>(this.baseUrl+url + id);
  }
  public getRessourceByFilter(ids:[number] ,url): Observable<any> {
    return this.http.get<any>(this.baseUrl+url +ids);
  }
  public postRessource(ressource: Object,url): Observable<Object> {
    return this.http.post(this.baseUrl+url, ressource);
  }

 public deleteRessource(id: number,url): Observable<any> {
    return this.http.delete(this.baseUrl+url + id, { responseType: 'text' });
  }

  public updateRessource(ressource: Object,id: number,url): Observable<Object> {
    return this.http.put(this.baseUrl+url+id, ressource);
  } 

  public getData(): Observable<any>{
    let divisions = this.http.get(environment.organisationUrl+'/divisions/index').toPromise();    
    let compagnes = this.http.get(this.baseUrl+'/compagneNotations/index').toPromise()
   
    
    return forkJoin([divisions,compagnes]);
}

public getNotationsByFilter(filter:Object):Observable<any> {
  let notations = this.http.post(this.baseUrl+'/notations/filter', filter).toPromise();
  return forkJoin([notations]);
}

public getNotationByPersonnel(id: number): Observable<any> {
  return this.http.get<any>(this.baseUrl+'/notations/personnel/' + id);
}
}
