import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterfaceStatus } from '../list-status/list-status.component';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {


  private baseUrl=environment.API_BMH_URL;
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<InterfaceStatus[]>(`${this.baseUrl}`+'status');
  }
  getById(id:any){
    return this.http.get<InterfaceStatus>(`${this.baseUrl}`+'status/'+`${id}`);
  }
  create(status:InterfaceStatus){
    return this.http.post<InterfaceStatus>(`${this.baseUrl}`+'status',status);
  }
  update(id:any,status:any){
    const url=`${this.baseUrl}status/${id}`
    return this.http.put<InterfaceStatus>(url,status);
  }
  delete(id:any){
    return this.http.delete<InterfaceStatus>(`${this.baseUrl}`+'status/'+`${id}`);
  }
}
