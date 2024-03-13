import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { ApplicationConfigService } from '../../../../../core/application-config.service';

import { createRequestOption } from '../../../../../core/request/request-util';


export type EntityResponseType = HttpResponse<ISuiviDelegataire>;
export type EntityArrayResponseType = HttpResponse<ISuiviDelegataire[]>;

import { SuiviDelegataire, ISuiviDelegataire } from '../../models/delegataire/tab-delegataire.model';


@Injectable({
	providedIn: 'root',
})
export class TabDelegataireService {
	// protected resourceUrl =
	// 	this.applicationConfigService.getEndpointFor('api/suivi-delegataires/');

	// protected resourceurlglobal =
	// 	this.applicationConfigService.getEndpointFor('api/');

	constructor(
		protected http: HttpClient,
		// protected applicationConfigService: ApplicationConfigService
	) {}

	// getAllSuiviDelegataire(req?: any): Observable<any> {
	// 	const options = createRequestOption(req);
	// 	let headers = new HttpHeaders()
	// 		.set('content-type', 'application/json')
	// 		.set('Access-Control-Allow-Origin', '*');

	// 	return this.http.get<SuiviDelegataire>(`${this.resourceUrl}`, {
	// 		params: options,
	// 		observe: 'response',
	// 		headers: headers,
	// 	});
	// }

	// addSuiviDelegataire(suiviDelegataires: ISuiviDelegataire): Observable<EntityResponseType> {
	// 	return this.http.post<ISuiviDelegataire>(this.resourceUrl , suiviDelegataires,
	// 	//return this.http.post<ISuiviDelegataire>(this.resourceUrl + 'add-tab-delegataire', suiviDelegataires,
	// 		{ observe: 'response'});
	// 	// return this.http.post<ISuiviDelegataire>(this.resourceUrl, suiviDelegataires, {
	// 	// 	observe: "response",

	// }

	// updateSuiviDelegataire(suiviDelegataire: ISuiviDelegataire): Observable<EntityResponseType> {
	// 	console.log("-*-*-*-*>>", suiviDelegataire);
	// 	let headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.put<ISuiviDelegataire>(`${this.resourceUrl}`, suiviDelegataire, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
	// deleteSuiviDelegataire(id: number): Observable<HttpResponse<{}>> {
	// 	let headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.delete(`${this.resourceUrl}${id}`, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
	// query(req?: any): Observable<EntityArrayResponseType> {
	// 	const options = createRequestOption(req);
	// 	let headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.get<ISuiviDelegataire[]>(this.resourceUrl, {
	// 		params: options,
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
	// find(id: number): Observable<EntityResponseType> {
	// 	console.log("id==========================>", id);
	// 	let headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.get<ISuiviDelegataire>(`${this.resourceUrl}${id}`, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
	// getSuiviDelegataireById(id: any) {
	// 	const headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.get<SuiviDelegataire>(`${this.resourceUrl}${id}`, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
}
