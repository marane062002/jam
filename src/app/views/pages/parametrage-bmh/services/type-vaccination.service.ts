import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InterfaceTypeVaccination } from '../list-type-vaccination/list-type-vaccination.component';

@Injectable({
  providedIn: 'root'
})
export class TypeVaccinationService {

  
  private baseUrl = environment.API_BMH_URL
  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<InterfaceTypeVaccination[]>(`${this.baseUrl}`+'tvacation');
  }
  
  getById(id:any){
    return this.http.get<InterfaceTypeVaccination>(`${this.baseUrl}`+'tvacation/'+`${id}`);
  }
  create(vaccination:InterfaceTypeVaccination){
    return this.http.post<InterfaceTypeVaccination>(`${this.baseUrl}`+'tvacation',vaccination);
  }
  update(id:any,vaccination:InterfaceTypeVaccination){
    return this.http.put<InterfaceTypeVaccination>(`${this.baseUrl}`+'tvacation/'+`${id}`,vaccination);
  }
  delete(id:any){
    return this.http.delete<InterfaceTypeVaccination>(`${this.baseUrl}`+'tvacation/'+`${id}`);
  }


  // DECLARATION VACCINATION PARAMETRAGE //
    getDec(){
      return this.http.get<any[]>(`${this.baseUrl}declaration`);
    }

    // VACCINATION //
    // INFOS GENERALES //
    getAllVaccination(page,pageSize){
      return this.http.get<any[]>(`${this.baseUrl}vaccination/paginate/${page}/${pageSize}`);
    }
    getVaccinationById(id:any){
      return this.http.get<any[]>(`${this.baseUrl}vaccination/${id}`);
    }
    addVaccination(data:any){
      return this.http.post<any>(`${this.baseUrl}`+'vaccination',data);
    }
    editVaccination(){
      return this.http.get<any[]>(`${this.baseUrl}vaccination/paginate/${0}/${5}`);
    }
    deleteVaccination(){
      return this.http.get<any[]>(`${this.baseUrl}vaccination/paginate/${0}/${5}`);
    }

    // ANIMAL TYPE //
    getAnimal(){
      return this.http.get<any[]>(`${this.baseUrl}`+'type-animal');
    }
    getAnimalById(id:any){
      return this.http.get<any>(`${this.baseUrl}`+'type-animal/'+`${id}`);
    }
    createAnimal(animal:any){
      return this.http.post<any>(`${this.baseUrl}`+'type-animal',animal);
    }
    updateAnimal(id:any,vaccination:InterfaceTypeVaccination){
      return this.http.put<any>(`${this.baseUrl}`+'type-animal/'+`${id}`,vaccination);
    }
    deleteAnimal(id:any){
      return this.http.delete<any>(`${this.baseUrl}`+'type-animal/'+`${id}`);
    }


     // INFOS - VICTIME //
     getVictime(){
      return this.http.get<any[]>(`${this.baseUrl}`+'infos-victimes');
    }
    getVictimeById(id:any){
      return this.http.get<any>(`${this.baseUrl}`+'infos-victimes/'+`${id}`);
    }
    createVictime(infosVictimes:any){
      return this.http.post<any>(`${this.baseUrl}`+'infos-victimes',infosVictimes);
    }
    updateVictime(id:any,infosVictimes:any){
      return this.http.put<any>(`${this.baseUrl}`+'infos-victimes/'+`${id}`,infosVictimes);
    }
    deleteVictime(id:any){
      return this.http.delete<any>(`${this.baseUrl}`+'infos-victimes/'+`${id}`);
    }

    
}
