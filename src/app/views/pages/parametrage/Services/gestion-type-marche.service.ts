import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root' 
})
export class GestionTypeMarcheService {
	private baseUrl1 = environment.marcheUrl + "/Ao/";

  constructor(private http : HttpClient) { }
  deleteById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl1+ "DeleteTypeMarche/" + id);
	}
   create(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl1 + "AddTypeMarche", f);
	}
	findById(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1+'findTypeMarcheById/'+id);
	  }
	  update(f): Observable<any> {
		return this.http.put<Observable<any>>(this.baseUrl1 + "UpdateTypeMarche", f);
	}
}
