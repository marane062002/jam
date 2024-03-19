import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceExamen } from '../list-examen/list-examen.component';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  
  baseUrl=environment.API_BMH_URL

  constructor(private http:HttpClient) { }

  
  getAll(id){
   return this.http.get<InterfaceExamen[]>(`${this.baseUrl}examenn/obstacle/${id}`)
  }
  delete(id:any){
    return this.http.delete<InterfaceExamen>(`${this.baseUrl}`+'examenn/'+`${id}`)
  }
  create(examen:InterfaceExamen){
    return this.http.post<InterfaceExamen>(`${this.baseUrl}`+'examenn',examen);
  }
  getById(id:any){
    return this.http.get<InterfaceExamen>(`${this.baseUrl}`+'examenn/'+`${id}`)
  }
  update(id:any,examen:InterfaceExamen){
    return this.http.put<InterfaceExamen>(`${this.baseUrl}`+'examenn/'+`${id}`,examen);
  }

}
