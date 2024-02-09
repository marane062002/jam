import { Injectable } from '@angular/core';
import { InterfaceEtab } from '../list-etablissement/list-etablissement.component';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceEtab[]>(`${this.baseUrl}`+'listEtb');
  }
  getById(id:any){
    return this.http.get<InterfaceEtab>(`${this.baseUrl}`+'listEtb/'+`${id}`);
  }
  create(etab:InterfaceEtab){
    return this.http.post<InterfaceEtab>(`${this.baseUrl}`+'listEtb',etab);
  }
  update(id:any,etab:InterfaceEtab){
    return this.http.put<InterfaceEtab>(`${this.baseUrl}`+'listEtb/'+`${id}`,etab);
  }
  delete(id:any){
    return this.http.delete<InterfaceEtab>(`${this.baseUrl}`+'listEtb/'+`${id}`);
  }
}
