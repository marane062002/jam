import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceCommune } from '../list-commune/list-commune.component';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceCommune[]>(`${this.baseUrl}`+'commune');
  }
  getById(id:any){
    return this.http.get<InterfaceCommune>(`${this.baseUrl}`+'commune/'+`${id}`);
  }
  create(commune:InterfaceCommune){
    return this.http.post<InterfaceCommune>(`${this.baseUrl}`+'commune',commune);
  }
  update(id:any,commune:InterfaceCommune){
    return this.http.put<InterfaceCommune>(`${this.baseUrl}`+'commune/'+`${id}`,commune);
  }
  delete(id:any){
    return this.http.delete<InterfaceCommune>(`${this.baseUrl}`+'commune/'+`${id}`);
  }
}
