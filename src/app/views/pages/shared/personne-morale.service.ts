import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PersonneMoraleService {

  constructor(private http : HttpClient) { }
  private baseUrl = environment.pmsourceUrl;
  //private baseUrl = 'http://localhost:8080/PMSource/PMSource';
 /* getallpm(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'/index');
  }*/

  async getallpm(){

    return await this.http.get<any>(this.baseUrl+'/index').toPromise();
  }

  deletepm(id): Observable<any> {
    return this.http.delete<Observable<any>>(this.baseUrl+'/' +id);
  }   

  getByIdpm(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl +'/show/'+f);
  }

  sendpm(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'/new',f);
  }

  putpm(id,f): Observable<any> {
    return this.http.put<Observable<any>>(this.baseUrl+'/'+id ,f);
  }
}
