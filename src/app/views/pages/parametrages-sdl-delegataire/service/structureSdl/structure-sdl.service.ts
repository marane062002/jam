import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { ApplicationConfigService } from '../../../../../core/application-config.service';

import { createRequestOption } from '../../../../../core/request/request-util';


export type EntityResponseType = HttpResponse<IStructureSdl>;
export type EntityArrayResponseType = HttpResponse<IStructureSdl[]>;

import { StructureSdl, IStructureSdl } from '../../models/structureSdl/structureSdl.model';
import {IStructureDelegataire} from '../../models/structureDelegataire/structureDelegataire.model';

@Injectable({
    providedIn: 'root',
})
export class StructureSdlService {
    // protected resourceUrl =
    //     this.applicationConfigService.getEndpointFor('api/structure-sdls/');

    // protected resourceurlglobal =
    //     this.applicationConfigService.getEndpointFor('api/');

    constructor(
        protected http: HttpClient,
        // protected applicationConfigService: ApplicationConfigService
    ) {}

    // getAllStructureSdl(req?: any): Observable<any> {
    //     const options = createRequestOption(req);
    //     let headers = new HttpHeaders()
    //         .set('content-type', 'application/json')
    //         .set('Access-Control-Allow-Origin', '*');

    //     return this.http.get<StructureSdl>(`${this.resourceUrl}`, {
    //         params: options,
    //         observe: 'response',
    //         headers: headers,
    //     });
    // }

	// addStructureSdl(structureSdl: IStructureSdl): Observable<EntityResponseType> {
    //     let headers = new HttpHeaders()
    //         .set("content-type", "application/json")
    //         .set("Access-Control-Allow-Origin", "*");
    //     return this.http.post<IStructureSdl>(this.resourceUrl, structureSdl, {
    //         observe: "response",
    //         headers: headers,
    //     });
    // }

    // updateStructureSdl(structureSdl: IStructureSdl): Observable<EntityResponseType> {
    //     console.log("-*-*-*-*>>", structureSdl);
    //     let headers = new HttpHeaders()
    //         .set("content-type", "application/json")
    //         .set("Access-Control-Allow-Origin", "*");
    //     return this.http.put<IStructureSdl>(`${this.resourceUrl}`, structureSdl, {
    //         observe: "response",
    //         headers: headers,
    //     });
    // }
    // deleteStructureSdl(id: number): Observable<HttpResponse<{}>> {
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
    //     return this.http.get<IStructureSdl[]>(this.resourceUrl, {
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
    //     return this.http.get<IStructureSdl>(`${this.resourceUrl}${id}`, {
    //         observe: "response",
    //         headers: headers,
    //     });
    // }
    // getStructureSdlById(id: any) {
    //     const headers = new HttpHeaders()
    //         .set('content-type', 'application/json')
    //         .set("Access-Control-Allow-Origin", "*");
    //     return this.http.get<StructureSdl>(`${this.resourceUrl}${id}`, {
    //         observe: "response",
    //         headers: headers,
    //     });
    // }
}
