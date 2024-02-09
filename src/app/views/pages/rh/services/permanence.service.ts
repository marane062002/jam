import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root' 
})
export class PermanenceService {

  
  private baseUrl = environment.permanenceUrl;

  
 
  constructor(private http:HttpClient) { } 

  
  public getRessource(url): Observable <any>{

    let permanences = this.http.get(this.baseUrl+url).toPromise();
    return forkJoin([permanences]);
  }
  
  public getRessourceById(id: number,url): Observable<any> {
    return this.http.get<any>(this.baseUrl+url + id);
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
  public getPermanenceByPersonnel(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl+'/permanences/personnel/' + id);
  }
  
}
