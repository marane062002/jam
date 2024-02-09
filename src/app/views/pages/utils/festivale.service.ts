import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { environment } from "./../../../../environments/environment";

const BACKEND_URL = environment.API_ASSOCIATION_URL;
const GED_URL = environment.API_ALFRESCO_URL;
const BACKEND_URL_ASS = environment.API_ASSOCIATION_URL;

@Injectable({
	providedIn: "root",
})
export class FestivaleService {
	public apiURL = `${BACKEND_URL}`;
	public apiURL_ASS = `${BACKEND_URL_ASS}`;

	// public apiURL_ACT = `${BACKEND_URL_ACT}`;
	// public apiURL_CNV = `${BACKEND_URL_CONV}`;
	// public apiURL_LOC = `${BACKEND_URL_LOC}`;
	// public apiURL_SUB = `${BACKEND_URL_SUB}`;
	// public apiURL_PROJ = `${BACKEND_URL_PROJ}`;
	public AlfrescoURL = `${GED_URL}`;

	constructor(private http: HttpClient) {}

	public getChampOrganisation(): Observable<any> {
		let ChampOrganisation = this.http.get(this.apiURL + "ChampOrganisation");
		let organisateurs = this.http.get(this.apiURL + "organisateurs");
		return forkJoin([ChampOrganisation, organisateurs]);
	}

	public getRessource(url): Observable<any> {
		return this.http.get(this.apiURL + url);
	}

	public getData(): Observable<any> {
		let ChampOrganisation = this.http.get(this.apiURL + "/ChampOrganisation");

		let organisateurs = this.http.get(this.apiURL + "/organisateurs");
		return forkJoin([ChampOrganisation, organisateurs]);
	}
	public getAssociation(): Observable<any> {
		return this.http.get(this.apiURL_ASS + "/association/index");
	}

	deleteObject(url, id: number): Observable<any> {
		return this.http.delete<any>(this.apiURL + url + id);
	}

	getObjectById(url, id: number): Observable<any> {
		return this.http.get<any>(this.apiURL + url + id);
	}

	createObject(url, obj: any): Observable<any> {
		return this.http.post<any>(this.apiURL + url, obj);
	}
	updateObject(url, obj: any): Observable<any> {
		return this.http.put<any>(this.apiURL_ASS + url + obj.id, obj);
	}

	deleteAcquisition(url, id: number): Observable<any> {
		return this.http.delete<any>(this.apiURL_ASS + url + id);
	}
}
