import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceTypeDeclaration } from '../list-type-declarration/list-type-declarration.component';

@Injectable({
  providedIn: 'root'
})
export class TypeDeclarationService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceTypeDeclaration[]>(`${this.baseUrl}`+'declaration');
  }
  getById(id:any){
    return this.http.get<InterfaceTypeDeclaration>(`${this.baseUrl}`+'declaration/'+`${id}`);
  }
  create(declaration:InterfaceTypeDeclaration){
    return this.http.post<InterfaceTypeDeclaration>(`${this.baseUrl}`+'declaration',declaration);
  }
  update(id:any,declaration:InterfaceTypeDeclaration){
    return this.http.put<InterfaceTypeDeclaration>(`${this.baseUrl}`+'declaration/'+`${id}`,declaration);
  }
  delete(id:any){
    return this.http.delete<InterfaceTypeDeclaration>(`${this.baseUrl}`+'declaration/'+`${id}`);
  }
}
