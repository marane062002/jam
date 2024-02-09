import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GestionQualificationService {
  private baseUrl1 = environment.marcheUrl+'/QualificationAo/';

  constructor(private http : HttpClient) { }

  async getAll(){

    return await this.http.get<any>(this.baseUrl1 + 'All').pipe(delay(300)).toPromise();
  }
  create(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl1 + "create", f);
	}

  update(f): Observable<any> {
		return this.http.put<Observable<any>>(this.baseUrl1 + "update", f);
	}
  deleteById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl1+ "Delete/" + id);
	}
  findById(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1+'findById/'+id);
	  }
	
}