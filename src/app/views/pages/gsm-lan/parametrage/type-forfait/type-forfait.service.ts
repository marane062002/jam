import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeForfaitService {
  private baseUrl = environment.API_GSM_LAN;

  constructor(private http : HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + '/typeForfait/All');
  }
  Pagination(page, size) {
		return this.http.get<any[]>(this.baseUrl + "/typeForfait/AllPages?page=" + page + "&size=" + size);
	}
  save(typeForfait: any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/typeForfait/Add`, typeForfait);
	}
  findById(id: number) {
		return this.http.get<any[]>(this.baseUrl + "/typeForfait/details/" + id);
	}
}
