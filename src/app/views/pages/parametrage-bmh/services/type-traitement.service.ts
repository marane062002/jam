import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceTypeTraitement } from '../list-type-traitement/list-type-traitement.component';

@Injectable({
  providedIn: 'root'
})
export class TypeTraitementService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceTypeTraitement[]>(`${this.baseUrl}`+'type-traitement');
  }
  getById(id:any){
    return this.http.get<InterfaceTypeTraitement>(`${this.baseUrl}`+'type-traitement/'+`${id}`);
  }
  create(traitement:InterfaceTypeTraitement){
    return this.http.post<InterfaceTypeTraitement>(`${this.baseUrl}`+'type-traitement',traitement);
  }
  update(id:any,traitement:InterfaceTypeTraitement){
    return this.http.put<InterfaceTypeTraitement>(`${this.baseUrl}`+'type-traitement/'+`${id}`,traitement);
  }
  delete(id:any){
    return this.http.delete<InterfaceTypeTraitement>(`${this.baseUrl}`+'type-traitement/'+`${id}`);
  }
}
