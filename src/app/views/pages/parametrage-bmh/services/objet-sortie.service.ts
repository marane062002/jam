import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceObjetSortie } from '../list-objet-sortie/list-objet-sortie.component';

@Injectable({
  providedIn: 'root'
})
export class ObjetSortieService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceObjetSortie[]>(`${this.baseUrl}`+'objet');
  }
  getById(id:any){
    return this.http.get<InterfaceObjetSortie>(`${this.baseUrl}`+'objet/'+`${id}`);
  }
  create(objet:InterfaceObjetSortie){
    return this.http.post<InterfaceObjetSortie>(`${this.baseUrl}`+'objet',objet);
  }
  update(id:any,objet:InterfaceObjetSortie){
    return this.http.put<InterfaceObjetSortie>(`${this.baseUrl}`+'objet/'+`${id}`,objet);
  }
  delete(id:any){
    return this.http.delete<InterfaceObjetSortie>(`${this.baseUrl}`+'objet/'+`${id}`);
  }
}
