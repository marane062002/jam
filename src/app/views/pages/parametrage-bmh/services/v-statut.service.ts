import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceVaccinationStatut } from '../list-vaccination-statut/list-vaccination-statut.component';

@Injectable({
  providedIn: 'root'
})
export class VStatutService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceVaccinationStatut[]>(`${this.baseUrl}`+'vstatus');
  }
  getById(id:any){
    return this.http.get<InterfaceVaccinationStatut>(`${this.baseUrl}`+'vstatus/'+`${id}`);
  }
  create(vstatus:InterfaceVaccinationStatut){
    return this.http.post<InterfaceVaccinationStatut>(`${this.baseUrl}`+'vstatus',vstatus);
  }
  update(id:any,vstatus:InterfaceVaccinationStatut){
    return this.http.put<InterfaceVaccinationStatut>(`${this.baseUrl}`+'vstatus/'+`${id}`,vstatus);
  }
  delete(id:any){
    return this.http.delete<InterfaceVaccinationStatut>(`${this.baseUrl}`+'vstatus/'+`${id}`);
  }
}
