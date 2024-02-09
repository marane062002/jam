import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceMorgue } from '../list-morgue/list-morgue.component';

@Injectable({
  providedIn: 'root'
})
export class MorgueService {

  baseUrl=environment.API_BMH_URL

  constructor(private http:HttpClient) { }

  
  getAll(page,pageSize){
   return this.http.get<InterfaceMorgue[]>(`${this.baseUrl}`+`morgue/paginate/${page}/${pageSize}`)
  }
  delete(id:any){
    return this.http.delete<InterfaceMorgue>(`${this.baseUrl}`+'morgue/'+`${id}`)
  }
  create(morgue:any){
    return this.http.post<any>(`${this.baseUrl}`+'morgue',morgue);
  }
  getById(id:any){
    return this.http.get<InterfaceMorgue>(`${this.baseUrl}`+'morgue/'+`${id}`)
  }
  update(id:any,morgue:any){
    return this.http.put<any>(`${this.baseUrl}`+'morgue/'+`${id}`,morgue);
  }
}
