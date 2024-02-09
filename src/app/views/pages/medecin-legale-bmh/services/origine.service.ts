import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceOrigine } from '../list-origine/list-origine.component';

@Injectable({
  providedIn: 'root'
})
export class OrigineService {

  baseUrl=environment.API_BMH_URL

  constructor(private http:HttpClient) { }

  
  getAll(){
   return this.http.get<InterfaceOrigine[]>(`${this.baseUrl}`+'origine')
  }
  delete(id:any){
    return this.http.delete<InterfaceOrigine>(`${this.baseUrl}`+'origine/'+`${id}`)
  }
  create(origine:InterfaceOrigine){
    return this.http.post<InterfaceOrigine>(`${this.baseUrl}`+'origine',origine);
  }
  getById(id:any){
    return this.http.get<InterfaceOrigine>(`${this.baseUrl}`+'origine/'+`${id}`)
  }
  update(id:any,origine:InterfaceOrigine){
    return this.http.put<InterfaceOrigine>(`${this.baseUrl}`+'origine/'+`${id}`,origine);
  }
}
