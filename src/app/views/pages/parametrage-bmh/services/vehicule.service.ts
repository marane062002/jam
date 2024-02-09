import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceVehicule } from '../list-vehicule/list-vehicule.component';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  baseUrl=environment.API_BMH_URL;
  constructor(private http:HttpClient) { }

  getAll(){
   return this.http.get<InterfaceVehicule[]>(`${this.baseUrl}`+'vehicule');
  }
  getById(id:any){
    return this.http.get<InterfaceVehicule>(`${this.baseUrl}`+'vehicule/'+`${id}`);
  }
  create(vehicule:InterfaceVehicule){
    return this.http.post<InterfaceVehicule>(`${this.baseUrl}`+'vehicule',vehicule);
  }
  update(id:any,vehicule:InterfaceVehicule){
    return this.http.put<InterfaceVehicule>(`${this.baseUrl}`+'vehicule/'+`${id}`,vehicule);
  }
  delete(id:any){
    return this.http.delete<InterfaceVehicule>(`${this.baseUrl}`+'vehicule/'+`${id}`);
  }
}
