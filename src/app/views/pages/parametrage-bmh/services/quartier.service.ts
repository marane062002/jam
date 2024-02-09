import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceQuartier } from '../list-quartier/list-quartier.component';


@Injectable({
  providedIn: 'root'
})
export class QuartierService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceQuartier[]>(`${this.baseUrl}`+'quartier');
  }
  getById(id:any){
    return this.http.get<InterfaceQuartier>(`${this.baseUrl}`+'quartier/'+`${id}`);
  }
  create(quartier:InterfaceQuartier){
    return this.http.post<InterfaceQuartier>(`${this.baseUrl}`+'quartier',quartier);
  }
  update(id:any,quartier:InterfaceQuartier){
    return this.http.put<InterfaceQuartier>(`${this.baseUrl}`+'quartier/'+`${id}`,quartier);
  }
  delete(id:any){
    return this.http.delete<InterfaceQuartier>(`${this.baseUrl}`+'quartier/'+`${id}`);
  }
}
