import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CategorieProduit } from '../../../../core/_base/layout/models/categorie-produit';
import { TypeProduit } from '../../../../core/_base/layout/models/type-produit';
import { createRequestOption } from '../../gestion-parc-auto/common/request/request-util';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {
  private baseUrl = environment.API_MARCHEGROS;;

  constructor(private http: HttpClient) { }

  createType(type: TypeServiceService): Observable<HttpResponse<TypeProduit>> {
    console.log('testing with headers');
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')

    return this.http.post<TypeProduit>(`${this.baseUrl}`+'create-type-produits', type, { observe: 'response' });

  }

  
  query(req?: any): Observable<HttpResponse<TypeProduit[]>> {

    const options = createRequestOption(req);
    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*')

    return this.http.get<TypeProduit[]>(`${this.baseUrl}get-all-type-produits`, { params: options, observe: 'response' }) ;
  }


  deleteType(id:number){
    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*')

    return this.http.delete(`${this.baseUrl}delete-type-produits/${id}`, { observe: 'response' });
  }


  getById( id): Observable<HttpResponse<{}>>{

    return this.http.get(this.baseUrl+"type-produits/"+id,{ observe: 'response' })
                                                      // .pipe(catchError(this.handleError))
  }
  update(typeProduit: TypeProduit): Observable<HttpResponse<{}>>{

    return this.http.put(this.baseUrl+"update-type-produits",typeProduit,{ observe: 'response' })
                                                      // .pipe(catchError(this.handleError))
}


async getAllType(){
	return await this.http.get<any>(this.baseUrl+'get-all-type-produits'+'?size=1000').toPromise();
  }
}
