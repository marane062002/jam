import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { ApplicationConfigService } from '../../../../../core/application-config.service';

import { createRequestOption } from '../../../../../core/request/request-util';

export type EntityResponseType = HttpResponse<IDelegataire>;
export type EntityArrayResponseType = HttpResponse<IDelegataire[]>;

import { Delegataire, IDelegataire } from '../../models/delegataire/delegataire.model';

@Injectable({
     providedIn: 'root',
})
export class DelegataireService {
    // protected resourceUrl =
    //      this.applicationConfigService.getEndpointFor('api/delegataires/');

    // protected resourceurlglobal =
    //     this.applicationConfigService.getEndpointFor('api/');

    constructor(
        protected http: HttpClient,
        // protected applicationConfigService: ApplicationConfigService
    ) {}


    // getAllDelegataire(req?: any): Observable<any> {
    //     const options = createRequestOption(req);
    //     let headers = new HttpHeaders()
	// 		.set("content-type", "application/json")
	// 		.set("Access-Control-Allow-Origin", "*");
	// 	return this.http.get<Delegataire>(`${this.resourceUrl}`, {
    //         params: options,
    //         observe: 'response',
    //         headers: headers,
    //     });
    // }

    // addDelegataire(delegatairess: IDelegataire): Observable<EntityResponseType> {
    //     let headers = new HttpHeaders()
    //         .set("content-type", "application/json")
    //         .set("Access-Control-Allow-Origin", "*");
    //     return this.http.post<IDelegataire>(this.resourceUrl, delegatairess, {
    //         observe: "response",
    //         headers: headers,
    //     });
    // }

    // updateDelegataire(delegataire: IDelegataire): Observable<EntityResponseType> {
    //     console.log('-*-*-*-*>>', delegataire);
    //     let headers = new HttpHeaders()
    //         .set('content-type', "application/json")
    //         .set("Access-Control-Allow-Origin", "*");
    //     return this.http.put<IDelegataire>(`${this.resourceUrl}`, delegataire, {
    //         observe: 'response',
    //         headers: headers,
    //     });
    // }
	// deleteDelegataire(id: number): Observable<HttpResponse<{}>> {
    //     let headers = new HttpHeaders()
    //         .set("content-type", "application/json")
    //         .set("Access-Control-Allow-Origin", "*");
    //     return this.http.delete(`${this.resourceUrl}${id}`, {
    //         observe: "response",
    //         headers: headers,
    //     });
    // }
    // query(req?: any): Observable<EntityArrayResponseType> {
    //     const options = createRequestOption(req);
    //     let headers = new HttpHeaders()
    //         .set("content-type", "application/json")
    //         .set("Access-Control-Allow-Origin", "*");
    //     return this.http.get<IDelegataire[]>(this.resourceUrl, {
    //         params: options,
    //         observe: "response",
    //         headers: headers,
    //     });
    // }
    // find(id: number): Observable<EntityResponseType> {
    //     console.log("id==========================>", id);
    //     let headers = new HttpHeaders()
    //         .set("content-type", "application/json")
    //         .set("Access-Control-Allow-Origin", "*");
    //     return this.http.get<IDelegataire>(`${this.resourceUrl}${id}`, {
    //         observe: "response",
    //         headers: headers,
    //     });
    // }
    // getDelegataireById(id: any) {
    //     const headers = new HttpHeaders()
    //         .set("content-type", "application/json")
    //         .set("Access-Control-Allow-Origin", "*");
    //     return this.http.get<Delegataire>(`${this.resourceUrl}${id}`, {
    //         observe: "response",
    //         headers: headers,
    //     });
    // }
}
