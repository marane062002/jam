import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceQuantite } from '../list-quantite/list-quantite.component';

@Injectable({
  providedIn: 'root'
})
export class QuantiteService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceQuantite[]>(`${this.baseUrl}`+'quantite');
  }
  getById(id:any){
    return this.http.get<InterfaceQuantite>(`${this.baseUrl}`+'quantite/'+`${id}`);
  }
  create(quantite:InterfaceQuantite){
    return this.http.post<InterfaceQuantite>(`${this.baseUrl}`+'quantite',quantite);
  }
  update(id:any,quantite:InterfaceQuantite){
    return this.http.put<InterfaceQuantite>(`${this.baseUrl}`+'quantite/'+`${id}`,quantite);
  }
  delete(id:any){
    return this.http.delete<InterfaceQuantite>(`${this.baseUrl}`+'quantite/'+`${id}`);
  }
}
