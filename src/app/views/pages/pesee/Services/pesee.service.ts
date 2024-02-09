import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pesee } from '../../../../core/_base/layout/models/pesee';
import { createRequestOption } from '../../gestion-parc-auto/common/request/request-util';
import { environment } from '../../../../../environments/environment';
import { PeseeProduit } from '../../../../core/_base/layout/models/pesee-produit';
import { TypePesee } from '../../../../core/_base/layout/models/TypePesee';
import { Pageable } from '../../utils/pagination/pageable';
@Injectable({
	providedIn: 'root'
})
export class PeseeService {
	constructor(private http: HttpClient) { }
	private baseUrl = environment.API_MARCHEGROS


	createPeseeProduit(pesee: PeseeProduit): Observable<PeseeProduit> {

		return this.http.post<PeseeProduit>(`${this.baseUrl}` + 'pesee-produits', pesee);

	}
	deletePeseeProduit(id: number) {

		let headers = new HttpHeaders()
			.set('content-type', 'application/json')
			.set('Access-Control-Allow-Origin', '*')


		return this.http.delete(`${this.baseUrl}pesee-produits/${id}`, { observe: 'response' });

	}

	updatePeseeProduit(pesee: PeseeProduit): Observable<HttpResponse<PeseeProduit>> {
		console.log('testing with headers');
		let headers = new HttpHeaders()
			.set('content-type', 'application/json')
			.set('Access-Control-Allow-Origin', '*')
		return this.http.put<PeseeProduit>(`${this.baseUrl}pesee-produits/`, pesee, { observe: 'response' });

	}


	createPesee(pesee: Pesee): Observable<HttpResponse<Pesee>> {

		return this.http.post<Pesee>(`${this.baseUrl}` + 'create-pesees', pesee, { observe: 'response' });

	}
	patchPesee(id: any): Observable<any> {

		return this.http.patch<Pesee>(`${this.baseUrl}` + 'patchStatut/'+id, { observe: 'response' });

	}
	delete(id: number) {

		let headers = new HttpHeaders()
			.set('content-type', 'application/json')
			.set('Access-Control-Allow-Origin', '*')


		return this.http.delete(`${this.baseUrl}pesees/${id}`, { observe: 'response' });

	}

	query(req?: any): Observable<HttpResponse<Pesee[]>> {
		const options = createRequestOption(req);
		let headers = new HttpHeaders()
			.set('content-type', 'application/json')
			.set('Access-Control-Allow-Origin', '*')
		return this.http.get<Pesee[]>(`${this.baseUrl}pesees`, { params: options, observe: 'response' });
	}

	getMaxId(req?: any): Observable<HttpResponse<any>> {

		const options = createRequestOption(req);
		let headers = new HttpHeaders()
			.set('content-type', 'application/json')
			.set('Access-Control-Allow-Origin', '*')

		return this.http.get<any>(`${this.baseUrl}pesees-max-id`, { params: options, observe: 'response' });
	}

	async getAllPesees(pageable: Pageable) {
		let path = this.baseUrl + 'pesees' 
			+ '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize
			+ '&sort=id,desc'
		return await this.http.get<any>(path).toPromise();
	}

	async getAllPeseesBymondataire(id:any,pageable: Pageable) {
		let path = this.baseUrl + 'peseesByIdHangar/'+id 
			+ '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize
			+ '&sort=id,desc'
		return await this.http.get<any>(path).toPromise();
	}
	getById(id): Observable<HttpResponse<{}>> {

		return this.http.get(this.baseUrl + "pesees/" + id, { observe: 'response' })
	}
	update(pesee: Pesee): Observable<HttpResponse<Pesee>> {
		console.log('testing with headers');
		let headers = new HttpHeaders()
			.set('content-type', 'application/json')
			.set('Access-Control-Allow-Origin', '*')
		return this.http.put<Pesee>(`${this.baseUrl}pesees/`, pesee, { observe: 'response' });

	}
	count(): Observable<HttpResponse<number>> {
		return this.http.get<number>(this.baseUrl + "pesees/count", { observe: 'response' })
	}
	updateTypePesee(typePesee: TypePesee): Observable<HttpResponse<TypePesee>> {

		return this.http.put<TypePesee>(`${this.baseUrl}type-pesees`, typePesee, { observe: 'response' });
	}


	getRessourceByIdHangarBetweenTwoDates(url, idHangar,dateDebut,dateFin): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("id_hangar", idHangar);
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.baseUrl + url + idHangar + '?dateDebut=' + dateDebut + '&dateFin=' + dateFin);
	}

	
	getRessourceByIdHangarAndDateDebut(url, idHangar,dateDebut): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("id_hangar", idHangar);
		queryParams = queryParams.append("dateDebut", dateDebut);
		return this.http.get<any[]>(this.baseUrl + url + idHangar + '?dateDebut=' + dateDebut);
	}
	
	getRessourceBetweenTwoDates(url,dateDebut,dateFin): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.baseUrl + url + '?dateDebut=' + dateDebut + '&dateFin=' + dateFin);
	}

}
