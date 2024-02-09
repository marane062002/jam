import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { InterfaceObstacle } from '../list-obstacles/list-obstacles.component';

@Injectable({
  providedIn: 'root'
})
export class ObstacleService {

  baseUrl=environment.API_BMH_URL

  constructor(private http:HttpClient) { }

  getAll(){
   return this.http.get<InterfaceObstacle[]>(`${this.baseUrl}`+'defunt')
  }
  delete(id:any){
    return this.http.delete<InterfaceObstacle>(`${this.baseUrl}`+'defunt/'+`${id}`)
  }
  create(defunt:any){
    return this.http.post<any>(`${this.baseUrl}`+'defunt',defunt);
  }
  getById(id:any){
    return this.http.get<any>(`${this.baseUrl}`+'defunt/'+`${id}`)
  }
  update(id:any,defunt:any){
    return this.http.put<any>(`${this.baseUrl}`+'defunt/'+`${id}`,defunt);
  }
}
