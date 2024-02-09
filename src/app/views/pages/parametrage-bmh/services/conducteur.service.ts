import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterfaceConducteur } from '../list-conducteur/list-conducteur.component';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConducteurService {

  baseUrl=environment.API_BMH_URL
  constructor(private http:HttpClient) { }

  getAll(){
   return this.http.get<InterfaceConducteur[]>(`${this.baseUrl}`+'conducteur');
  }
  getById(id:any){
    return this.http.get<InterfaceConducteur>(`${this.baseUrl}`+'conducteur/'+`${id}`);
  }
  update(id:any,conducteur:InterfaceConducteur){
    return this.http.put<InterfaceConducteur>(`${this.baseUrl}`+'conducteur/'+`${id}`,conducteur);
  }
  create(conducteur:InterfaceConducteur){
    return this.http.post<InterfaceConducteur>(`${this.baseUrl}`+'conducteur',conducteur);
  }
  delete(id:any){
    return this.http.delete<InterfaceConducteur>(`${this.baseUrl}`+'conducteur/'+`${id}`)
  }
}
