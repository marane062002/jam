import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CategorieProduit } from '../../../../core/_base/layout/models/categorie-produit';
import { createRequestOption } from '../../gestion-parc-auto/common/request/request-util';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private baseUrl = environment.API_MARCHEGROS;;
  constructor(private http: HttpClient) { }

  createCategori(categori: CategorieProduit): Observable<HttpResponse<CategorieProduit>> {
    console.log('testing with headers');
  

    return this.http.post<CategorieProduit>(`${this.baseUrl}`+'create-categorie-produits', categori, { observe: 'response',  });

   // return this.http.post<Vehicule>(`${this.baseUrl}` + 'add-vehicules', vehicule);
  }


  query(req?: any): Observable<HttpResponse<CategorieProduit[]>> {

    const options = createRequestOption(req);
   

    return this.http.get<CategorieProduit[]>(`${this.baseUrl}categorie-produits`, { params: options, observe: 'response'}) ;
  }


  deleteCat(id:number){

    return this.http.delete(`${this.baseUrl}delete-categorie-produits/${id}`, { observe: 'response' });

  }
  getById( id): Observable<HttpResponse<{}>>{

    return this.http.get(this.baseUrl+"categorie-produits/"+id,{ observe: 'response' })
                                                      // .pipe(catchError(this.handleError))
  }
  update(categori: CategorieProduit): Observable<HttpResponse<{}>>{
    return this.http.put(this.baseUrl+"update-categorie-produits",categori,{ observe: 'response' })
                                                      // .pipe(catchError(this.handleError))
}

async getAllCat(){
	return await this.http.get<any>(this.baseUrl+'categorie-produits'+'?size=1000').toPromise();
  }
}
