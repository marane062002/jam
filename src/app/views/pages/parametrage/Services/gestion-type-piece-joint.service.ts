import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionTypePieceJointService {
	private baseUrl1 = environment.API_ALFRESCO_URL + "/PjAoG";

  constructor(private http: HttpClient,) { }

  create(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl1 + "/create", f);
	}

  update(f): Observable<any> {
		return this.http.put<Observable<any>>(this.baseUrl1 + "/update", f);
	}
  deleteById(id): Observable<any> {
		return this.http.get<any>(this.baseUrl1+ "/DeleteTypePjAoById/" + id);
	}
  findById(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1+'/findById/'+id);
	  }
	
}


