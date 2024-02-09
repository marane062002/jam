import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfacePrelevemnt } from '../list-prelevement/list-prelevement.component';

@Injectable({
  providedIn: 'root'
})
export class PrelevementService {

  baseUrl=environment.API_BMH_URL

  constructor(private http:HttpClient) { }

  
  getAll(){
   return this.http.get<InterfacePrelevemnt[]>(`${this.baseUrl}`+'prlv')
  }
  delete(id:any){
    return this.http.delete<InterfacePrelevemnt>(`${this.baseUrl}`+'prlv/'+`${id}`)
  }
  create(prelevement:InterfacePrelevemnt){
    return this.http.post<InterfacePrelevemnt>(`${this.baseUrl}`+'prlv',prelevement);
  }
  getById(id:any){
    return this.http.get<InterfacePrelevemnt>(`${this.baseUrl}`+'prlv/'+`${id}`)
  }
  update(id:any,prelevement:InterfacePrelevemnt){
    return this.http.put<InterfacePrelevemnt>(`${this.baseUrl}`+'prlv/'+`${id}`,prelevement);
  }
}
