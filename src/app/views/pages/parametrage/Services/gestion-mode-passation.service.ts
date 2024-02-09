import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionModePassationService {
	private baseUrl1 = environment.marcheUrl + "/Ao/";

  constructor(private http : HttpClient) { }
  deleteById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl1+ "DeleteNatureAo/" + id);
	}
   create(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl1 + "AddNatureAo", f);
	}
	findById(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1+'findNatureAoById/'+id);
	  }
	  update(f): Observable<any> {
		return this.http.put<Observable<any>>(this.baseUrl1 + "UpdateNatureAo", f);
	}
}
