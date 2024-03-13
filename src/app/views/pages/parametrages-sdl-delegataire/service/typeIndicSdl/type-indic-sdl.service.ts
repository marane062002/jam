import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { ApplicationConfigService } from '../../../../../core/application-config.service';

import { createRequestOption } from '../../../../../core/request/request-util';

export type EntityResponseType = HttpResponse<ITypeIndicSdl>;
export type EntityArrayResponseType = HttpResponse<ITypeIndicSdl[]>;

import { TypeIndicSdl, ITypeIndicSdl } from '../../models/typeIndicSdl/typeIndicSdl.model';


@Injectable({
	providedIn: 'root',
})
export class TypeIndicSdlService {
	// protected resourceUrl =
	// 	this.applicationConfigService.getEndpointFor('api/type-indic-sdls/');

	// protected resourceurlglobal =
	// 	this.applicationConfigService.getEndpointFor('api/');

	constructor(
		protected http: HttpClient,
		// protected applicationConfigService: ApplicationConfigService
	) {}

	// getAllTypeIndicSdl(req?: any): Observable<any> {
	// 	const options = createRequestOption(req);
	// 	let headers = new HttpHeaders()
	// 		.set('content-type', 'application/json')
	// 		.set('Access-Control-Allow-Origin', '*');

	// 	return this.http.get<TypeIndicSdl>(`${this.resourceUrl}`, {
	// 		params: options,
	// 		observe: 'response',
	// 		headers: headers,
	// 	});
	// }

	// addTypeIndicSdl(typeIndicSdl: ITypeIndicSdl): Observable<EntityResponseType> {
	// 	let headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.post<ITypeIndicSdl>(this.resourceUrl, typeIndicSdl, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }

	// updateTypeIndicSdl(typeIndicSdl: ITypeIndicSdl): Observable<EntityResponseType> {
	// 	console.log("-*-*-*-*>>", typeIndicSdl);
	// 	let headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.put<ITypeIndicSdl>(`${this.resourceUrl}`, typeIndicSdl, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
	// deleteTypeIndicSdl(id: number): Observable<HttpResponse<{}>> {
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
	// 	return this.http.get<ITypeIndicSdl[]>(this.resourceUrl, {
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
	// 	return this.http.get<ITypeIndicSdl>(`${this.resourceUrl}${id}`, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
	// getTypeIndicSdlById(id: any) {
	// 	const headers = new HttpHeaders()
	// 		.set('content-type', 'application/json')
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.get<TypeIndicSdl>(`${this.resourceUrl}${id}`, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
}
