import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceTypeExamen } from '../list-type-examen/list-type-examen.component';

@Injectable({
  providedIn: 'root'
})
export class TypeExamenService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<InterfaceTypeExamen[]>(`${this.baseUrl}`+'examen');
  }

  getById(id:any){
    return this.http.get<InterfaceTypeExamen>(`${this.baseUrl}`+'examen/'+`${id}`)
  }

  create(texamen:InterfaceTypeExamen){
    return this.http.post<InterfaceTypeExamen>(`${this.baseUrl}`+'examen',texamen);
  }

  update(id:any,texamen:any){
    return this.http.put<InterfaceTypeExamen>(`${this.baseUrl}examen/${id}`,texamen);
  }
  delete(id:any){
    return this.http.delete<InterfaceTypeExamen>(`${this.baseUrl}`+'examen/'+`${id}`);
  }

}
