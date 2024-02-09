import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Emballage } from '../../../../core/_base/layout/models/emballage';
import { createRequestOption } from '../../gestion-parc-auto/common/request/request-util';

@Injectable({
  providedIn: 'root'
})
export class EmballageService {
  private baseUrl = environment.API_MARCHEGROS;;
  constructor(private http: HttpClient) { }

  createEmballage(emballage: Emballage): Observable<HttpResponse<Emballage>> {
    console.log('testing with headers');
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')

    return this.http.post<Emballage>(`${this.baseUrl}`+'create-emballages', emballage, { observe: 'response' });

   // return this.http.post<Vehicule>(`${this.baseUrl}` + 'add-vehicules', vehicule);
  }


  getAllEmballages(req?: any): Observable<HttpResponse<Emballage[]>> {

    const options = createRequestOption(req);
    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*')

    return this.http.get<Emballage[]>(`${this.baseUrl}emballages`, { params: options, observe: 'response' }) ;
  }


  deleteEmballage(id:number){

    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*')

    return this.http.delete(`${this.baseUrl}delete-emballages/${id}`, { observe: 'response' });

  }
  getById( id): Observable<HttpResponse<{}>>{

    return this.http.get(this.baseUrl+"emballages/"+id,{ observe: 'response' })
                                                      // .pipe(catchError(this.handleError))
  }
  update(embalage: Emballage): Observable<HttpResponse<{}>>{
    return this.http.put(this.baseUrl+"update-emballages",embalage,{ observe: 'response' })
                                                      // .pipe(catchError(this.handleError))
}


async getAllEmballage(){
	return await this.http.get<any>(this.baseUrl+'emballages'+'?size=1000').toPromise();
  }

  count():Observable<HttpResponse<number>>{
	return this.http.get<number>(this.baseUrl+"emballages/count",{ observe: 'response' })
  }

}
