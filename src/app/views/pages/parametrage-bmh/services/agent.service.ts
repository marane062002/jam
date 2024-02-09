import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceAgent } from '../list-agent/list-agent.component';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceAgent[]>(`${this.baseUrl}`+'agent');
  }
  getById(id:any){
    return this.http.get<InterfaceAgent>(`${this.baseUrl}`+'agent/'+`${id}`);
  }
  create(agent:InterfaceAgent){
    return this.http.post<InterfaceAgent>(`${this.baseUrl}`+'agent',agent);
  }
  update(id:any,agent:InterfaceAgent){
    return this.http.put<InterfaceAgent>(`${this.baseUrl}`+'agent/'+`${id}`,agent);
  }
  delete(id:any){
    return this.http.delete<InterfaceAgent>(`${this.baseUrl}`+'agent/'+`${id}`);
  }
}
