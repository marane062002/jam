import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

 
  private baseUrl = environment.presenceUrl;

  
 
  constructor(private http:HttpClient) { } 

  
  public getRessource(url): Observable <any>{

    return this.http.get(this.baseUrl+url);
  }
  
  public getRessourceById(id: number,url): Observable<any> {
    let presence = this.http.get<any>(this.baseUrl+url + id).toPromise();
    return forkJoin([presence]);
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
    let heuraires = this.http.get(environment.presenceUrl+'/heuraireTravails/index').toPromise();
    let motifsAbsence = this.http.get(this.baseUrl+'/motifAbsences/index').toPromise()
   
    
    return forkJoin([divisions,heuraires,motifsAbsence]);
}

public getPresenceByPersonnel(id: number): Observable<any> {
  return this.http.get<any>(this.baseUrl+'/presences/personnel/' + id);
}
}
