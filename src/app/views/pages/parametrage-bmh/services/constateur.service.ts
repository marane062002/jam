import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceConstateur } from '../list-constateur/list-constateur.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstateurService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }

  getAllConstateur():Observable<InterfaceConstateur[]>{
    return this.http.get<InterfaceConstateur[]>(`${this.baseUrl}`+'constateur');
 }

 CreateConstateur(constateur:InterfaceConstateur){
   return this.http.post<InterfaceConstateur>(`${this.baseUrl}`+'constateur',constateur);
 }

 updateConstateur(id:any,constateur:InterfaceConstateur){
  const url = `${this.baseUrl}constateur/${id}`;
  return this.http.put<InterfaceConstateur>(url,constateur)
 }
 detailsConstateur(id:any){
  const url = `${this.baseUrl}constateur/${id}`;
  return this.http.get<InterfaceConstateur>(url);
 }
 deleteConstateur(id:any){
  return this.http.delete<InterfaceConstateur>(`${this.baseUrl}`+'constateur/'+`${id}`);
 }
}
