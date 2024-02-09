import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceArrondissement } from '../list-arrondissement/list-arrondissement.component';


@Injectable({
  providedIn: 'root'
})
export class ArrondissemntService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceArrondissement[]>(`${this.baseUrl}`+'arrondissement');
  }
  getById(id:any){
    return this.http.get<InterfaceArrondissement>(`${this.baseUrl}`+'arrondissement/'+`${id}`);
  }
  create(arrondissement:InterfaceArrondissement){
    return this.http.post<InterfaceArrondissement>(`${this.baseUrl}`+'arrondissement',arrondissement);
  }
  update(id:any,arrondissement:InterfaceArrondissement){
    return this.http.put<InterfaceArrondissement>(`${this.baseUrl}`+'arrondissement/'+`${id}`,arrondissement);
  }
  delete(id:any){
    return this.http.delete<InterfaceArrondissement>(`${this.baseUrl}`+'arrondissement/'+`${id}`);
  }
}
