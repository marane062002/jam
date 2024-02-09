import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceTraitementEffectue } from '../list-traitement-effectue/list-traitement-effectue.component';

@Injectable({
  providedIn: 'root'
})
export class TraitementEffectueService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceTraitementEffectue[]>(`${this.baseUrl}`+'traitement');
  }
  getById(id:any){
    return this.http.get<InterfaceTraitementEffectue>(`${this.baseUrl}`+'traitement/'+`${id}`);
  }
  create(traitement:InterfaceTraitementEffectue){
    return this.http.post<InterfaceTraitementEffectue>(`${this.baseUrl}`+'traitement',traitement);
  }
  update(id:any,traitement:InterfaceTraitementEffectue){
    return this.http.put<InterfaceTraitementEffectue>(`${this.baseUrl}`+'traitement/'+`${id}`,traitement);
  }
  delete(id:any){
    return this.http.delete<InterfaceTraitementEffectue>(`${this.baseUrl}`+'traitement/'+`${id}`);
  }
}
