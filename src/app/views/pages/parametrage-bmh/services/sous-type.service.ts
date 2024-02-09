import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceSousType } from '../list-sous-type/list-sous-type.component';

@Injectable({
  providedIn: 'root'
})
export class SousTypeService {

  baseUrl=environment.API_BMH_URL
  constructor(private http:HttpClient) { }

  getAll(){
   return this.http.get<InterfaceSousType[]>(`${this.baseUrl}`+'soustype');
  }
  getById(id:any){
    return this.http.get<InterfaceSousType>(`${this.baseUrl}`+'soustype/'+`${id}`);
  }
  update(id:any,soustype:InterfaceSousType){
    return this.http.put<InterfaceSousType>(`${this.baseUrl}`+'soustype/'+`${id}`,soustype);
  }
  create(soustype:InterfaceSousType){
    return this.http.post<InterfaceSousType>(`${this.baseUrl}`+'soustype',soustype);
  }
  delete(id:any){
    return this.http.delete<InterfaceSousType>(`${this.baseUrl}`+'soustype/'+`${id}`)
  }
}
