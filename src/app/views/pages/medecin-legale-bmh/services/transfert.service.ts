import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceTransfert } from '../list-transfert/list-transfert.component';

@Injectable({
  providedIn: 'root'
})
export class TransfertService {

  baseUrl=environment.API_BMH_URL

  constructor(private http:HttpClient) { }

  
  getAll(){
   return this.http.get<InterfaceTransfert[]>(`${this.baseUrl}`+'transfert')
  }
  delete(id:any){
    return this.http.delete<InterfaceTransfert>(`${this.baseUrl}`+'transfert/'+`${id}`)
  }
  create(transfert:InterfaceTransfert){
    return this.http.post<InterfaceTransfert>(`${this.baseUrl}`+'transfert',transfert);
  }
  getById(id:any){
    return this.http.get<InterfaceTransfert>(`${this.baseUrl}`+'transfert/'+`${id}`)
  }
  update(id:any,transfert:InterfaceTransfert){
    return this.http.put<InterfaceTransfert>(`${this.baseUrl}`+'transfert/'+`${id}`,transfert);
  }
}
