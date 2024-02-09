import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { excelData } from '../../audiences/audiences.component';

@Injectable({
  providedIn: 'root'
})
export class EtablisService {

  private baseUrl = "http://localhost:9095/"
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<excelData[]>(`${this.baseUrl}`+'etablissements');
  }
  getById(id:any){
    return this.http.get<excelData>(`${this.baseUrl}`+'etablissements/'+`${id}`);
  }
  create(etab:excelData){
    return this.http.post<excelData>(`${this.baseUrl}`+'etablissements',etab);
  }
  update(id:any,etab:excelData){
    return this.http.put<excelData>(`${this.baseUrl}`+'etablissements/'+`${id}`,etab);
  }
  delete(id:any){
    return this.http.delete<excelData>(`${this.baseUrl}`+'etablissements/'+`${id}`);
  }
}
