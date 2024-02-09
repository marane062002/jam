import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment'
import { InterfaceConvention } from '../list-convention/list-convention.component';

@Injectable({
  providedIn: 'root'
})
export class ConventionService {

  
  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceConvention[]>(`${this.baseUrl}`+'convention');
  }
  getById(id:any){
    return this.http.get<InterfaceConvention>(`${this.baseUrl}`+'convention/'+`${id}`);
  }
  create(convention:InterfaceConvention){
    return this.http.post<InterfaceConvention>(`${this.baseUrl}`+'convention',convention);
  }
  update(id:any,convention:InterfaceConvention){
    return this.http.put<InterfaceConvention>(`${this.baseUrl}`+'convention/'+`${id}`,convention);
  }
  delete(id:any){
    return this.http.delete<InterfaceConvention>(`${this.baseUrl}`+'convention/'+`${id}`);
  }
}
