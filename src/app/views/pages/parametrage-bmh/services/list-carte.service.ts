import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceCartes } from '../list-cartes/list-cartes.component';

@Injectable({
  providedIn: 'root'
})
export class ListCarteService {
  baseUrl=environment.API_BMH_URL
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<InterfaceCartes[]>(`${this.baseUrl}`+'listEtb')
   }
   delete(id:any){
     return this.http.delete<InterfaceCartes>(`${this.baseUrl}`+'listEtb/'+`${id}`)
   }
   create(cartes:InterfaceCartes){
     return this.http.post<InterfaceCartes>(`${this.baseUrl}`+'listEtb',cartes);
   }
   getById(id:any){
     return this.http.get<InterfaceCartes>(`${this.baseUrl}`+'listEtb/'+`${id}`)
   }
   update(id:any,deces:InterfaceCartes){
     return this.http.put<InterfaceCartes>(`${this.baseUrl}`+'listEtb/'+`${id}`,id);
   }
}