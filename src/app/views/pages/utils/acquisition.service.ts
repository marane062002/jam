import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { environment } from "./../../../../environments/environment";

const BACKEND_URL = environment.API_SUBVENTION_URL;
const BACKEND_URL_ASS = environment.API_ASSOCIATION_URL;
const GED_URL = environment.API_ALFRESCO_URL;

@Injectable({
	providedIn: "root",
})
export class AcquisitionService {
	public apiURL = `${BACKEND_URL}`;
	public apiURL_ASS = `${BACKEND_URL_ASS}`;
	public AlfrescoURL = `${GED_URL}`;
	private baseUrl = environment.organisationUrl;

	constructor(private http: HttpClient) {}

	// ====================================
	// methodes CRUD
	// ====================================
	public getData(): Observable<any> {
		let statutAssociation = this.http.get(this.apiURL + "/statut/index");
		let typeActivite = this.http.get(this.apiURL + "/typeActiviteAssociation/index");
		let villeActivite = this.http.get(this.apiURL + "/villeActivite/index");
		let annexeAdministrative = this.http.get(this.apiURL + "/annexeAdministratif/index");
		return forkJoin([statutAssociation, typeActivite, villeActivite, annexeAdministrative]);
	}
	public getRessource(url): Observable<any> {
		return this.http.get(this.apiURL_ASS + url);
	}

	public getAssociation(): Observable<any> {
		return this.http.get(this.apiURL_ASS + "/association/index");
	}
	public getArrondissements(): Observable<any> {
		return this.http.get(this.baseUrl + "/arrondissements/index");
	}

	getAllObject(url): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL_ASS + url);
	}

	getObjectById(url, id: number): Observable<any> {
		return this.http.get<any>(this.apiURL_ASS + url + id);
	}

	createObject(url, obj: any): Observable<any> {
		return this.http.post<any>(this.apiURL_ASS + url, obj);
	}

	updateObject(url, obj: any): Observable<any> {
		return this.http.put<any>(this.apiURL_ASS + url + obj.id, obj);
	}

	deleteAcquisition(url, id: number): Observable<any> {
		return this.http.delete<any>(this.apiURL_ASS + url + id);
	}

	getAllAcquisitionListById(url, id: number): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL_ASS + url + id);
	}

	getAllAcquisition(url): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL + url);
	}

	// ====================================
	// Upload files
	// ====================================

	updloadFile(v, id, repo): Observable<any> {
		const formda: FormData = new FormData();
		for (var i = 0; i < v.length; i++) {
			formda.append("file", v[i]);
		}
		formda.append("id", id);
		return this.http.post<any>(this.AlfrescoURL + "/" + repo + "/multiplefile", formda, { responseType: "blob" as "json" });
	}

	getByIdFiles(f, repo): Observable<any> {
		return this.http.get<Observable<any>>(this.AlfrescoURL + "/" + repo + "/Allpjs/" + f);
	}

	deletefiles(url, id: number): Observable<any> {
		return this.http.delete<any>(this.AlfrescoURL + url + id);
	}

	getAutorisationsByFilterAllParameters(champActivite,arrondissement) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("champActivite", champActivite);
		queryParams = queryParams.append("arrondissement", arrondissement);
		return this.http.get<any[]>(this.apiURL_ASS + "/acquisition/rechercheFindByAllParameters", { params: queryParams });
	}

	getAutorisationsByDateAndChampActivite(champActivite) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("champActivite", champActivite);
		return this.http.get<any[]>(this.apiURL_ASS + "/acquisition/rechercheFindByChampActivite", { params: queryParams });
	}

	getAutorisationsByDateAndArrondissement(arrondissement) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("arrondissement", arrondissement);
		return this.http.get<any[]>(this.apiURL_ASS + "/acquisition/rechercheFindByArrondissement", { params: queryParams });
	}
}
