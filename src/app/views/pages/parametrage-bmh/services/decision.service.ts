import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceDecision } from '../list-decision/list-decision.component';

@Injectable({
  providedIn: 'root'
})
export class DecisionService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceDecision[]>(`${this.baseUrl}`+'decision');
  }
  getById(id:any){
    return this.http.get<InterfaceDecision>(`${this.baseUrl}`+'decision/'+`${id}`);
  }
  create(decision:InterfaceDecision){
    return this.http.post<InterfaceDecision>(`${this.baseUrl}`+'decision',decision);
  }
  update(id:any,decision:InterfaceDecision){
    return this.http.put<InterfaceDecision>(`${this.baseUrl}`+'decision/'+`${id}`,decision);
  }
  delete(id:any){
    return this.http.delete<InterfaceDecision>(`${this.baseUrl}`+'decision/'+`${id}`);
  }
}
