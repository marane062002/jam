import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { ApplicationConfigService } from '../../../../../core/application-config.service';

import { createRequestOption } from '../../../../../core/request/request-util';

export type EntityResponseType = HttpResponse<ITypeIndicDelegataire>;
export type EntityArrayResponseType = HttpResponse<ITypeIndicDelegataire[]>;

import { TypeIndicDelegataire, ITypeIndicDelegataire } from '../../models/typeIndicDelegataire/typeIndicDelegataire.model';


@Injectable({
	providedIn: 'root',
})
export class TypeIndicDelegataireService {
	// protected resourceUrl =
	// 	this.applicationConfigService.getEndpointFor('api/type-indic-delegataires/');

	// protected resourceurlglobal =
	// 	this.applicationConfigService.getEndpointFor('api/');

	constructor(
		protected http: HttpClient,
		// protected applicationConfigService: ApplicationConfigService
	) {}

	// getAllTypeIndicDelegataire(req?: any): Observable<any> {
	// 	const options = createRequestOption(req);
	// 	let headers = new HttpHeaders()
	// 		.set('content-type', 'application/json')
	// 		.set('Access-Control-Allow-Origin', '*');

	// 	return this.http.get<TypeIndicDelegataire>(`${this.resourceUrl}`, {
	// 		params: options,
	// 		observe: 'response',
	// 		headers: headers,
	// 	});
	// }

	// addTypeIndicDelegataire(typeIndicDelegataire: ITypeIndicDelegataire): Observable<EntityResponseType> {
	// 	let headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.post<ITypeIndicDelegataire>(this.resourceUrl, typeIndicDelegataire, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }

	// updateTypeIndicDelegataire(typeIndicDelegataire: ITypeIndicDelegataire): Observable<EntityResponseType> {
	// 	console.log("-*-*-*-*>>", typeIndicDelegataire);
	// 	let headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.put<ITypeIndicDelegataire>(`${this.resourceUrl}`, typeIndicDelegataire, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
	// deleteTypeIndicDelegataire(id: number): Observable<HttpResponse<{}>> {
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
	// 	return this.http.get<ITypeIndicDelegataire[]>(this.resourceUrl, {
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
	// 	return this.http.get<ITypeIndicDelegataire>(`${this.resourceUrl}${id}`, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
	// getTypeIndicDelegataireById(id: any) {
	// 	const headers = new HttpHeaders()
	// 		.set('content-type', 'application/json')
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.get<TypeIndicDelegataire>(`${this.resourceUrl}${id}`, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
}
