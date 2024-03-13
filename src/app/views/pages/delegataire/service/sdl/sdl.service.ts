import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { ApplicationConfigService } from '../../../../../core/application-config.service';

import { createRequestOption } from '../../../../../core/request/request-util';

export type EntityResponseType = HttpResponse<ISdl>;
export type EntityArrayResponseType = HttpResponse<ISdl[]>;

import { Sdl, ISdl } from '../../models/sdl/sdl.model';

@Injectable({
    providedIn: 'root',
})
export class SdlService {
    // protected resourceUrl =
    //     this.applicationConfigService.getEndpointFor('api/sdls/');

    // protected resourceurlglobal =
    //     this.applicationConfigService.getEndpointFor('api/');

    constructor(
        protected http: HttpClient,
        // protected applicationConfigService: ApplicationConfigService
    ) {}

    // getAllSdl(req?: any): Observable<any> {
    //     const options = createRequestOption(req);
    //     const headers = new HttpHeaders()
    //         .set('content-type', 'application/json')
    //         .set('Access-Control-Allow-Origin', '*');

    //     return this.http.get<Sdl>(`${this.resourceUrl}`, {
    //         params: options,
    //         observe: 'response',
    //         headers,
    //     });
    // }

    // addSdl(slds: ISdl): Observable<EntityResponseType> {
    //     const headers = new HttpHeaders()
    //         .set('content-type', 'application/json')
    //         .set('Access-Control-Allow-Origin', '*');
    //     return this.http.post<ISdl>(this.resourceUrl, slds, {
    //         observe: 'response',
    //         headers,
    //     });
    // }

    // updateSdl(sdl: ISdl): Observable<EntityResponseType> {
    //     console.log('-*-*-*-*>>', sdl);
    //     const headers = new HttpHeaders()
    //         .set('content-type', 'application/json')
    //         .set('Access-Control-Allow-Origin', '*');
    //     return this.http.put<ISdl>(`${this.resourceUrl}`, sdl, {
    //         observe: 'response',
    //         headers,
    //     });
    // }
    // deleteSdl(id: number): Observable<HttpResponse<{}>> {
    //     const headers = new HttpHeaders()
    //         .set('content-type', 'application/json')
    //         .set('Access-Control-Allow-Origin', '*');
    //     return this.http.delete(`${this.resourceUrl}${id}`, {
    //         observe: 'response',
    //         headers,
    //     });
    // }
    // query(req?: any): Observable<EntityArrayResponseType> {
    //     const options = createRequestOption(req);
    //     const headers = new HttpHeaders()
    //         .set('content-type', 'application/json')
    //         .set('Access-Control-Allow-Origin', '*');
    //     return this.http.get<ISdl[]>(this.resourceUrl, {
    //         params: options,
    //         observe: 'response',
    //         headers,
    //     });
    // }
    // find(id: number): Observable<EntityResponseType> {
    //     console.log('id==========================>', id);
    //     const headers = new HttpHeaders()
    //         .set('content-type', 'application/json')
    //         .set('Access-Control-Allow-Origin', '*');
    //     return this.http.get<ISdl>(`${this.resourceUrl}${id}`, {
    //         observe: 'response',
    //         headers,
    //     });
    // }
    // getSdlById(id: any) {
    //     const headers = new HttpHeaders()
    //         .set('content-type', 'application/json')
    //         .set('Access-Control-Allow-Origin', '*');
    //     return this.http.get<Sdl>(`${this.resourceUrl}${id}`, {
    //         observe: 'response',
    //         headers,
    //     });
    // }
}
