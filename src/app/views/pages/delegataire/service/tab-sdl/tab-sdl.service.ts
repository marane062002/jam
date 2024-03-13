import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { ApplicationConfigService } from '../../../../../core/application-config.service';

import { createRequestOption } from '../../../../../core/request/request-util';


export type EntityResponseType = HttpResponse<ISuiviSdl>;
export type EntityArrayResponseType = HttpResponse<ISuiviSdl[]>;

import { SuiviSdl, ISuiviSdl } from '../../models/sdl/tab-sdl.model';


@Injectable({
	providedIn: 'root',
})
export class TabSdlService {
	// protected resourceUrl =
	// 	this.applicationConfigService.getEndpointFor('api/suivi-sdls/');

	// protected resourceurlglobal =
	// 	this.applicationConfigService.getEndpointFor('api/');

	constructor(
		protected http: HttpClient,
		// protected applicationConfigService: ApplicationConfigService
	) {}

	// getAllSuiviSdl(req?: any): Observable<any> {
	// 	const options = createRequestOption(req);
	// 	let headers = new HttpHeaders()
	// 		.set('content-type', 'application/json')
	// 		.set('Access-Control-Allow-Origin', '*');

	// 	return this.http.get<SuiviSdl>(`${this.resourceUrl}`, {
	// 		params: options,
	// 		observe: 'response',
	// 		headers: headers,
	// 	});
	// }

	// addSuiviSdl(suiviSdls: ISuiviSdl): Observable<EntityResponseType> {
	// 	return this.http.post<ISuiviSdl>(this.resourceUrl , suiviSdls,
	// 		//return this.http.post<ISuiviSdl>(this.resourceUrl + 'add-tab-sdl', suiviSdls,
	// 		{ observe: 'response'});
	// 	// return this.http.post<ISuiviSdl>(this.resourceUrl, suiviSdls, {
	// 	// 	observe: "response",

	// }

	// updateSuiviSdl(suiviSdl: ISuiviSdl): Observable<EntityResponseType> {
	// 	console.log("-*-*-*-*>>", suiviSdl);
	// 	let headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.put<ISuiviSdl>(`${this.resourceUrl}`, suiviSdl, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
	// deleteSuiviSdl(id: number): Observable<HttpResponse<{}>> {
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
	// 	return this.http.get<ISuiviSdl[]>(this.resourceUrl, {
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
	// 	return this.http.get<ISuiviSdl>(`${this.resourceUrl}${id}`, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
	// getSuiviSdlById(id: any) {
	// 	const headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.get<SuiviSdl>(`${this.resourceUrl}${id}`, {
	// 		observe: "response",
	// 		headers: headers,
	// 	});
	// }
}


// import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ApplicationConfigService } from '../../../../../core/application-config.service';
//
// import { createRequestOption } from '../../../../../core/request/request-util';
//
// export type EntityResponseType = HttpResponse<ISuiviSdl>;
// export type EntityArrayResponseType = HttpResponse<ISuiviSdl[]>;
// import { SuiviSdl, ISuiviSdl } from '../../models/sdl/tab-sdl.model';
//
// @Injectable({
// 	providedIn: 'root',
// })
// export class TabSdlService {
// 	protected resourceUrl =
// 		this.applicationConfigService.getEndpointFor('api/suivi-sdls/');
//
// 	protected resourceurlglobal =
// 		this.applicationConfigService.getEndpointFor('api/');
//
// 	constructor(
// 		protected http: HttpClient,
// 		protected applicationConfigService: ApplicationConfigService
// 	) {}
//
// 	getAllSuiviSdl(req?: any): Observable<any> {
// 		const options = createRequestOption(req);
// 		let headers = new HttpHeaders()
// 			.set('content-type', 'application/json')
// 			.set('Access-Control-Allow-Origin', '*');
//
// 		return this.http.get<SuiviSdl>(`${this.resourceUrl}`, {
// 			params: options,
// 			observe: 'response',
// 			headers: headers,
// 		});
// 	}
//
// 	addSuiviSdl(suiviSdls: ISuiviSdl): Observable<EntityResponseType> {
// 		let headers = new HttpHeaders()
// 			.set("content-type", "application/json")
// 			.set("Access-Control-Allow-Origin", "*");
// 		return this.http.post<ISuiviSdl>(this.resourceUrl, suiviSdls, {
// 			observe: "response",
// 			headers: headers,
// 		});
// 	}
//
// 	updateSuiviSdl(suiviSdls: ISuiviSdl): Observable<EntityResponseType> {
// 		console.log("-*-*-*-*>>", suiviSdls);
// 		let headers = new HttpHeaders()
// 			.set("content-type", "application/json")
// 			.set("Access-Control-Allow-Origin", "*");
// 		return this.http.put<ISuiviSdl>(`${this.resourceUrl}`, suiviSdls, {
// 			observe: "response",
// 			headers: headers,
// 		});
// 	}
// 	deleteSuiviSdl(id: number): Observable<HttpResponse<{}>> {
// 		let headers = new HttpHeaders()
// 			.set("content-type", "application/json")
// 			.set("Access-Control-Allow-Origin", "*");
// 		return this.http.delete(`${this.resourceUrl}${id}`, {
// 			observe: "response",
// 			headers: headers,
// 		});
// 	}
// 	query(req?: any): Observable<EntityArrayResponseType> {
// 		const options = createRequestOption(req);
// 		let headers = new HttpHeaders()
// 			.set("content-type", "application/json")
// 			.set("Access-Control-Allow-Origin", "*");
// 		return this.http.get<ISuiviSdl[]>(this.resourceUrl, {
// 			params: options,
// 			observe: "response",
// 			headers: headers,
// 		});
// 	}
// 	find(id: number): Observable<EntityResponseType> {
// 		console.log("id==========================>", id);
// 		let headers = new HttpHeaders()
// 			.set("content-type", "application/json")
// 			.set("Access-Control-Allow-Origin", "*");
// 		return this.http.get<ISuiviSdl>(`${this.resourceUrl}${id}`, {
// 			observe: "response",
// 			headers: headers,
// 		});
// 	}
// 	getSuiviSdlById(id: any) {
// 		const headers = new HttpHeaders()
// 			.set("content-type", "application/json")
// 			.set("Access-Control-Allow-Origin", "*");
// 		return this.http.get<SuiviSdl>(`${this.resourceUrl}${id}`, {
// 			observe: "response",
// 			headers: headers,
// 		});
// 	}
// }
