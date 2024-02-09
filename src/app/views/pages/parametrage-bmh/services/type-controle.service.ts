import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceTypeControle } from '../list-type-controle/list-type-controle.component';

@Injectable({
  providedIn: 'root'
})
export class TypeControleService {

  private baseUrl=environment.API_BMH_URL;
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<InterfaceTypeControle[]>(`${this.baseUrl}`+'typectrl');
  }
  getById(id:any){
    return this.http.get<InterfaceTypeControle>(`${this.baseUrl}`+'typectrl/'+`${id}`);
  }
  create(type:InterfaceTypeControle){
    return this.http.post<InterfaceTypeControle>(`${this.baseUrl}`+'typectrl',type);
  }
  update(id:any,type:any){
    const url=`${this.baseUrl}typectrl/${id}`
    return this.http.put<InterfaceTypeControle>(url,type);
  }
  delete(id:any){
    return this.http.delete<InterfaceTypeControle>(`${this.baseUrl}`+'typectrl/'+`${id}`);
  }
}
