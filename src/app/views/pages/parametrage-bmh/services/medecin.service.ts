import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceMedecin } from '../list-medecin-operant/list-medecin-operant.component';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceMedecin[]>(`${this.baseUrl}`+'medecin');
  }
  getById(id:any){
    return this.http.get<InterfaceMedecin>(`${this.baseUrl}`+'medecin/'+`${id}`);
  }
  create(medecin:InterfaceMedecin){
    return this.http.post<InterfaceMedecin>(`${this.baseUrl}`+'medecin',medecin);
  }
  update(id:any,medecin:InterfaceMedecin){
    return this.http.put<InterfaceMedecin>(`${this.baseUrl}`+'medecin/'+`${id}`,medecin);
  }
  delete(id:any){
    return this.http.delete<InterfaceMedecin>(`${this.baseUrl}`+'medecin/'+`${id}`);
  }
}
