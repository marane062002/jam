import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceAnimal } from '../list-animal/list-animal.component';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceAnimal[]>(`${this.baseUrl}`+'animal');
  }
  getById(id:any){
    return this.http.get<InterfaceAnimal>(`${this.baseUrl}`+'animal/'+`${id}`);
  }
  create(animal:InterfaceAnimal){
    return this.http.post<InterfaceAnimal>(`${this.baseUrl}`+'animal',animal);
  }
  update(id:any,animal:InterfaceAnimal){
    return this.http.put<InterfaceAnimal>(`${this.baseUrl}`+'animal/'+`${id}`,animal);
  }
  delete(id:any){
    return this.http.delete<InterfaceAnimal>(`${this.baseUrl}`+'animal/'+`${id}`);
  }
}
