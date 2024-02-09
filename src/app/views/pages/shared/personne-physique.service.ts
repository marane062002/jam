import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonnePhysiqueService {
  private baseUrl = environment.ppsourceUrl;
  //private baseUrl = 'http://localhost:8080/PPSource/PPSource/';
  constructor(private http : HttpClient) { }

  /*getallpp(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'/index');
  }*/

  async getallpp(){

    return await this.http.get<any>(this.baseUrl+'/index').toPromise();
  }


  deletepp(id): Observable<any> {
    return this.http.delete<Observable<any>>(this.baseUrl +id);
  }

  getByIdpp(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'/show/' +f);
  }

  sendpp(f): Observable<any> {
    console.log('Post data')
    return this.http.post<Observable<any>>(this.baseUrl+'/new',f);
  }

  putpp(id,f): Observable<any> {
    console.log('in put')
    return this.http.put<Observable<any>>(this.baseUrl+id ,f);
  }


}
