import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceFourgon } from '../list-fourgon/list-fourgon.component';

@Injectable({
  providedIn: 'root'
})
export class FourgonService {

  baseUrl=environment.API_BMH_URL

  constructor(private http:HttpClient) { }

  
  getAllPaginate(page,pageSize){
   return this.http.get<InterfaceFourgon[]>(`${this.baseUrl}`+`fourgon/paginate/${page}/${pageSize}`)
  }
  getAll(){
    return this.http.get<InterfaceFourgon[]>(`${this.baseUrl}`+`fourgon`)
   }
  delete(id:any){
    return this.http.delete<InterfaceFourgon>(`${this.baseUrl}`+'fourgon/'+`${id}`)
  }
  create(fourgon:any){
    return this.http.post<any>(`${this.baseUrl}`+'fourgon',fourgon);
  }
  getById(id:any){
    return this.http.get<InterfaceFourgon>(`${this.baseUrl}`+'fourgon/'+`${id}`)
  }
  update(id:any,fourgon:any){
    return this.http.put<InterfaceFourgon>(`${this.baseUrl}`+'fourgon/'+`${id}`,fourgon);
  }
}
