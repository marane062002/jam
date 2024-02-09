import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionCategorieService {
	private baseUrl1 = environment.marcheUrl + "/Ao/";

  constructor(private http : HttpClient) { }
  // async getAll(){

  //   return await this.http.get<any>(this.baseUrl1 + 'All').pipe(delay(300)).toPromise();
  // }
  create(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl1 + "AddTypePrestationAo", f);
	}

  update(f): Observable<any> {
		return this.http.put<Observable<any>>(this.baseUrl1 + "updateTypePrestationAo", f);
	}
  deleteById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl1+ "DeleteTypePrestationAo/" + id);
	}
  findById(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1+'findTypePrestationAoById/'+id);
	  }
}
