import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceCadvre } from '../list-cadavre/list-cadavre.component';

@Injectable({
  providedIn: 'root'
})
export class CadavreService {

  baseUrl=environment.API_BMH_URL

  constructor(private http:HttpClient) { }

  
  getAll(){
   return this.http.get<InterfaceCadvre[]>(`${this.baseUrl}`+'cadavre')
  }
  delete(id:any){
    return this.http.delete<InterfaceCadvre>(`${this.baseUrl}`+'cadavre/'+`${id}`)
  }
  create(cadavre:InterfaceCadvre){
    return this.http.post<InterfaceCadvre>(`${this.baseUrl}`+'cadavre',cadavre);
  }
  getById(id:any){
    return this.http.get<InterfaceCadvre>(`${this.baseUrl}`+'cadavre/'+`${id}`)
  }
  update(id:any,cadavre:InterfaceCadvre){
    return this.http.put<InterfaceCadvre>(`${this.baseUrl}`+'cadavre/'+`${id}`,cadavre);
  }
}
