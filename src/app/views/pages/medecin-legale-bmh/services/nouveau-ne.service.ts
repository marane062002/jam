import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceNouveauNe } from '../list-nouveau-ne/list-nouveau-ne.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NouveauNeService {

  baseUrl=environment.API_BMH_URL

  constructor(private http:HttpClient) { }

  
  getAll(page,pageSize){
   return this.http.get<InterfaceNouveauNe[]>(`${this.baseUrl}`+`nouveauNe/paginate/${page}/${pageSize}`)
  }
  delete(id:any){
    return this.http.delete<InterfaceNouveauNe>(`${this.baseUrl}`+'nouveauNe/'+`${id}`)
  }
  create(nouveauNe:InterfaceNouveauNe){
    return this.http.post<InterfaceNouveauNe>(`${this.baseUrl}`+'nouveauNe',nouveauNe);
  }
  getById(id:any){
    return this.http.get<InterfaceNouveauNe>(`${this.baseUrl}`+'nouveauNe/'+`${id}`)
  }
  update(id:any,nouveauNe:InterfaceNouveauNe){
    return this.http.put<InterfaceNouveauNe>(`${this.baseUrl}`+'nouveauNe/'+`${id}`,nouveauNe);
  }
}
