import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceEnterementInhum } from '../list-enterement-inhum/list-enterement-inhum.component';

@Injectable({
  providedIn: 'root'
})
export class EnterementInhumService {

  baseUrl=environment.API_BMH_URL

  constructor(private http:HttpClient) { }

  
  getAll(){
   return this.http.get<InterfaceEnterementInhum[]>(`${this.baseUrl}`+'enterrement')
  }
  delete(id:any){
    return this.http.delete<InterfaceEnterementInhum>(`${this.baseUrl}`+'enterrement/'+`${id}`)
  }
  create(enterrement:InterfaceEnterementInhum){
    return this.http.post<InterfaceEnterementInhum>(`${this.baseUrl}`+'enterrement',enterrement);
  }
  getById(id:any){
    return this.http.get<InterfaceEnterementInhum>(`${this.baseUrl}`+'enterrement/'+`${id}`)
  }
  update(id:any,enterrement:InterfaceEnterementInhum){
    return this.http.put<InterfaceEnterementInhum>(`${this.baseUrl}`+'enterrement/'+`${id}`,enterrement);
  }

  // TYPE //
  getAllTypes(){
    return this.http.get<any[]>(`${this.baseUrl}`+'type')
   }
   // ARRONDISSEMENT //
  getArrondis(){
    return this.http.get<any[]>(`${this.baseUrl}`+'arrondissement')
   }
    // QUARTIER //
  getQuartier(){
    return this.http.get<any[]>(`${this.baseUrl}`+'quartier')
   }
     // COMMUNE //
  getCommune(){
    return this.http.get<any[]>(`${this.baseUrl}`+'commune')
   }
}
