import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceEquipe } from '../list-equipe/list-equipe.component';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  
  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceEquipe[]>(`${this.baseUrl}`+'equipe');
  }
  getById(id:any){
    return this.http.get<InterfaceEquipe>(`${this.baseUrl}`+'equipe/'+`${id}`);
  }
  create(equipe:InterfaceEquipe){
    return this.http.post<InterfaceEquipe>(`${this.baseUrl}`+'equipe',equipe);
  }
  update(id:any,equipe:InterfaceEquipe){
    return this.http.put<InterfaceEquipe>(`${this.baseUrl}`+'equipe/'+`${id}`,equipe);
  }
  delete(id:any){
    return this.http.delete<InterfaceEquipe>(`${this.baseUrl}`+'equipe/'+`${id}`);
  }
}
