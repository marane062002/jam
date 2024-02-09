import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceOrganisme } from '../list-organisme/list-organisme.component';

@Injectable({
  providedIn: 'root'
})
export class OrganismeService {

  baseUrl=environment.API_BMH_URL

  constructor(private http:HttpClient) { }

  
  getAllPaginate(page,pageSize){
   return this.http.get<InterfaceOrganisme[]>(`${this.baseUrl}`+`organisme/paginate/${page}/${pageSize}`)
  }
  getAll(){
    return this.http.get<InterfaceOrganisme[]>(`${this.baseUrl}`+`organisme`)
   }
  delete(id:any){
    return this.http.delete<InterfaceOrganisme>(`${this.baseUrl}`+'organisme/'+`${id}`)
  }
  create(organisme:InterfaceOrganisme){
    return this.http.post<InterfaceOrganisme>(`${this.baseUrl}`+'organisme',organisme);
  }
  getById(id:any){
    return this.http.get<InterfaceOrganisme>(`${this.baseUrl}`+'organisme/'+`${id}`)
  }
  update(id:any,organisme:InterfaceOrganisme){
    return this.http.put<InterfaceOrganisme>(`${this.baseUrl}`+'organisme/'+`${id}`,organisme);
  }
}
