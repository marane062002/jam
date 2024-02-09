import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceProduitUtilise } from '../list-produit-utilise/list-produit-utilise.component';

@Injectable({
  providedIn: 'root'
})
export class ProduitUtiliseService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceProduitUtilise[]>(`${this.baseUrl}`+'produit');
  }
  getById(id:any){
    return this.http.get<InterfaceProduitUtilise>(`${this.baseUrl}`+'produit/'+`${id}`);
  }
  create(produit:InterfaceProduitUtilise){
    return this.http.post<InterfaceProduitUtilise>(`${this.baseUrl}`+'produit',produit);
  }
  update(id:any,produit:InterfaceProduitUtilise){
    return this.http.put<InterfaceProduitUtilise>(`${this.baseUrl}`+'produit/'+`${id}`,produit);
  }
  delete(id:any){
    return this.http.delete<InterfaceProduitUtilise>(`${this.baseUrl}`+'produit/'+`${id}`);
  }
}
