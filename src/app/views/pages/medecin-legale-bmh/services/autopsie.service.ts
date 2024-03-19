import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceAutopsie } from '../list-autopsie/list-autopsie.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutopsieService {

  baseUrl=environment.API_BMH_URL

  constructor(private http:HttpClient) { }

  
  getAll(id){
   return this.http.get<InterfaceAutopsie[]>(`${this.baseUrl}autopsie/obstacle/${id}`)
  }
  delete(id:any){
    return this.http.delete<InterfaceAutopsie>(`${this.baseUrl}`+'autopsie/'+`${id}`)
  }
  create(autopsie:InterfaceAutopsie){
    return this.http.post<InterfaceAutopsie>(`${this.baseUrl}`+'autopsie',autopsie);
  }
  getById(id:any){
    return this.http.get<InterfaceAutopsie>(`${this.baseUrl}`+'autopsie/'+`${id}`)
  }
  update(id:any,autopsie:InterfaceAutopsie){
    return this.http.put<InterfaceAutopsie>(`${this.baseUrl}`+'autopsie/'+`${id}`,autopsie);
  }
}
