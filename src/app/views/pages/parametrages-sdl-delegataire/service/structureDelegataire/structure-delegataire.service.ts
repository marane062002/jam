import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { ApplicationConfigService } from '../../../../../core/application-config.service';

import { createRequestOption } from '../../../../../core/request/request-util';

export type EntityResponseType = HttpResponse<IStructureDelegataire>;
export type EntityArrayResponseType = HttpResponse<IStructureDelegataire[]>;

import { StructureDelegataire, IStructureDelegataire } from '../../models/structureDelegataire/structureDelegataire.model';


@Injectable({
	providedIn: 'root',
})
export class StructureDelegataireService {
	// protected resourceUrl =
	// 	this.applicationConfigService.getEndpointFor('api/structure-delegataires/');

	// protected resourceurlglobal =
	// 	this.applicationConfigService.getEndpointFor('api/');

	constructor(
		protected http: HttpClient,
		// protected applicationConfigService: ApplicationConfigService
	) {}

	// getAllStructureDelegataire(req?: any): Observable<any> {
	// 	const options = createRequestOption(req);
	// 	let headers = new HttpHeaders()
	// 		.set('content-type', 'application/json')
	// 		.set('Access-Control-Allow-Origin', '*');

	// 	return this.http.get<StructureDelegataire>(`${this.resourceUrl}`, {
	// 		params: options,
	// 		observe: 'response',
	// 		headers: headers,
	// 	});
	// }

	// addStructureDelegataire(structureDelegataire: IStructureDelegataire): Observable<EntityResponseType> {
	// 	let headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.post<IStructureDelegataire>(this.resourceUrl, structureDelegataire, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }

	// updateStructureDelegataire(structureDelegataire: IStructureDelegataire): Observable<EntityResponseType> {
	// 	console.log("-*-*-*-*>>", structureDelegataire);
	// 	let headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.put<IStructureDelegataire>(`${this.resourceUrl}`, structureDelegataire, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
	// deleteStructureDelegataire(id: number): Observable<HttpResponse<{}>> {
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
	// 	return this.http.get<IStructureDelegataire[]>(this.resourceUrl, {
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
	// 	return this.http.get<IStructureDelegataire>(`${this.resourceUrl}${id}`, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
	// getStructureDelegataireById(id: any) {
	// 	const headers = new HttpHeaders()
	// 		.set('content-type', 'application/json')
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.get<StructureDelegataire>(`${this.resourceUrl}${id}`, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
}
