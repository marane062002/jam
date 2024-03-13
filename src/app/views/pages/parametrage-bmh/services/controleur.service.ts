import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { InterfaceControleur } from '../list-controleur/list-controleur.component';

@Injectable({
  providedIn: 'root'
})
export class ControleurService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }

  getAll():Observable<InterfaceControleur[]>{
    return this.http.get<InterfaceControleur[]>(`${this.baseUrl}`+'controleur');
 }

 Create(controleur:InterfaceControleur){
   return this.http.post<InterfaceControleur>(`${this.baseUrl}`+'controleur',controleur);
 }

 update(id:any,controleur:InterfaceControleur){
  const url = `${this.baseUrl}controleur/${id}`;
  return this.http.put<InterfaceControleur>(url,controleur)
 }
 details(id:any){
  const url = `${this.baseUrl}controleur/${id}`;
  return this.http.get<InterfaceControleur>(url);
 }
 delete(id:any){
  return this.http.delete<InterfaceControleur>(`${this.baseUrl}`+'controleur/'+`${id}`);
 }
}
