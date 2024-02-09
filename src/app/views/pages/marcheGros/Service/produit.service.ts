import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Produit } from '../../../../core/_base/layout/models/produit';
import { createRequestOption } from '../../gestion-parc-auto/common/request/request-util';
import { HistoriqueProduit } from '../../../../core/_base/layout/models/historique-produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private baseUrl = environment.API_MARCHEGROS;;
  constructor(private http: HttpClient) { }

  getAllProduits(req?: any): Observable<HttpResponse<Produit[]>> {

    const options = createRequestOption(req);
    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*')

    return this.http.get<Produit[]>(`${this.baseUrl}get-all-produits`, { params: options, observe: 'response' }) ;
  }

  createProduit(produit: Produit): Observable<HttpResponse<Produit>> {
    console.log('testing with headers');
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')

    return this.http.post<Produit>(`${this.baseUrl}`+'create-produits', produit, { observe: 'response' });

   // return this.http.post<Vehicule>(`${this.baseUrl}` + 'add-vehicules', vehicule);
  }

  createHistogrammeProduit(Hproduit: HistoriqueProduit): Observable<HttpResponse<HistoriqueProduit>> {
    console.log('testing with headers');
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')

    return this.http.post<HistoriqueProduit>(`${this.baseUrl}`+'HistoriqueProduit/create', Hproduit, { observe: 'response' });

   // return this.http.post<Vehicule>(`${this.baseUrl}` + 'add-vehicules', vehicule);
  }

  findByProduit_Id(id: any): Observable<HttpResponse<HistoriqueProduit[]>> {
    console.log('testing with headers');
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')

    return this.http.get<HistoriqueProduit[]>(`${this.baseUrl}`+'HistoriqueProduit/findByProduit_Id/'+id, { observe: 'response' });

   // return this.http.post<Vehicule>(`${this.baseUrl}` + 'add-vehicules', vehicule);
  }
  deleteProduit(id:number){
    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*')

    return this.http.delete(`${this.baseUrl}delete-produits/${id}`, { observe: 'response' });
  }

  getById( id): Observable<HttpResponse<{}>>{

    return this.http.get(this.baseUrl+"produits/"+id,{ observe: 'response' })
                                                      // .pipe(catchError(this.handleError))
  }
  update(produit: Produit): Observable<HttpResponse<{}>>{
    return this.http.put(this.baseUrl+"update-produits",produit,{ observe: 'response' })

}
async getAllProduit(){
	return await this.http.get<any>(this.baseUrl+'get-all-produits'+'?size=1000').toPromise();
  }
}
