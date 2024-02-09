import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceDeces } from '../list-deces-naturel/list-deces-naturel.component';

@Injectable({
  providedIn: 'root'
})
export class DecesNaturelsService {

  baseUrl=environment.API_BMH_URL

  constructor(private http:HttpClient) { }

  
  getAll(){
   return this.http.get<InterfaceDeces[]>(`${this.baseUrl}`+'deces')
  }
  delete(id:any){
    return this.http.delete<InterfaceDeces>(`${this.baseUrl}`+'deces/'+`${id}`)
  }
  create(deces:InterfaceDeces){
    return this.http.post<InterfaceDeces>(`${this.baseUrl}`+'deces',deces);
  }
  getById(id:any){
    return this.http.get<InterfaceDeces>(`${this.baseUrl}`+'deces/'+`${id}`)
  }
  update(id:any,deces:InterfaceDeces){
    return this.http.put<InterfaceDeces>(`${this.baseUrl}`+'deces/'+`${id}`,deces);
  }
}
