import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceTypeAnalyse } from '../list-type-analyse/list-type-analyse.component';

@Injectable({
  providedIn: 'root'
})
export class ListTypeAnalyseService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceTypeAnalyse[]>(`${this.baseUrl}`+'typeAnalyse');
  }
  getById(id:any){
    return this.http.get<InterfaceTypeAnalyse>(`${this.baseUrl}`+'typeAnalyse/'+`${id}`);
  }
  create(typeAnalyse:InterfaceTypeAnalyse){
    return this.http.post<InterfaceTypeAnalyse>(`${this.baseUrl}`+'typeAnalyse',typeAnalyse);
  }
  update(id:any,typeAnalyse:InterfaceTypeAnalyse){
    return this.http.put<InterfaceTypeAnalyse>(`${this.baseUrl}`+'typeAnalyse/'+`${id}`,typeAnalyse);
  }
  delete(id:any){
    return this.http.delete<InterfaceTypeAnalyse>(`${this.baseUrl}`+'typeAnalyse/'+`${id}`);
  }
}
