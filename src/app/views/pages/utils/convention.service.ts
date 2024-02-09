import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { environment } from "./../../../../environments/environment";
const BACKEND_URL = environment.API_CONVENTION;
const GED_URL = environment.API_ALFRESCO_URL;
const BACKEND_URL_ASS = environment.API_ASSOCIATION_URL;

@Injectable({
	providedIn: "root",
})
export class ConventionService {
	public apiURL = `${BACKEND_URL}`;
	public AlfrescoURL = `${GED_URL}`;
	public apiURL_ASS = `${BACKEND_URL_ASS}`;
	private baseUrl = environment.organisationUrl;

	constructor(private http: HttpClient) { }

	public getData(): Observable<any> {
		let statutConvention = this.http.get(this.apiURL + "/statutConvention/index");
		let typeConvention = this.http.get(this.apiURL + "/typeConvention/index");
		return forkJoin([statutConvention, typeConvention]);
	}

	// ====================================
	// methodes CRUD
	// ====================================

	public getRessource(url): Observable<any> {
		return this.http.get(this.apiURL + url);
	}
	public getArrondissements(): Observable<any> {
		return this.http.get(this.baseUrl + "/arrondissements/index");
	}

	getAllObject(url): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL + url);
	}

	getObjectById(url, id: number): Observable<any> {
		return this.http.get<any>(this.apiURL + url + id);
	}

	createObject(url, immo: any): Observable<any> {
		return this.http.post<any>(this.apiURL + url, immo);
	}
	public getAssociation(): Observable<any> {
		let association = this.http.get(this.apiURL_ASS + "/association/index").toPromise();
		return forkJoin([association])
	}

	updateObject(url, immo: any): Observable<any> {
		return this.http.put<any>(this.apiURL + url + immo.id, immo);
	}

	deleteConvention(url, id: number): Observable<any> {
		return this.http.delete<any>(this.apiURL + url + id);
	}

	getAllObjectListById(url, id: number): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL + url + id);
	}

	getConvention(id: any): Observable<any[]> {
		if (id == null) {
			return this.http.get<any[]>(this.apiURL + "/convention/index");
		} else {
			return this.http.get<any[]>(this.apiURL + "/convention/index/" + id);
		}
	}
	getAllConventionListById(url, id: number): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL + url + id);
	}

	// ====================================
	// Upload files
	// ====================================

	updloadFile(v, id): Observable<any> {
		//console.log("taille de fichier  :" + v.length);
		const formda: FormData = new FormData();
		for (var i = 0; i < v.length; i++) {
			formda.append("file", v[i]);
		}
		formda.append("id", id);
		return this.http.post<any>(this.AlfrescoURL + "/PjConvention/multiplefile", formda, { responseType: "blob" as "json" });
	}

	getByIdFiles(f): Observable<any> {
		return this.http.get<Observable<any>>(this.AlfrescoURL + "/PjConvention/Allpjs/" + f);
	}

	deletefiles(url, id: number): Observable<any> {
		return this.http.delete<any>(this.AlfrescoURL + url + id);
	}

	getConvsByFilterOnlyDate(dateDebut, dateFin) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.apiURL + "/convention/rechercheFindByOnlyDate", { params: queryParams });
	}

	getConvsByFilterByDateAndChampActivite(dateDebut, dateFin, champActivite) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("champActivite", champActivite);
		return this.http.get<any[]>(this.apiURL + "/convention/rechercheFindByDateAndChampActivite", { params: queryParams });
	}

	getConvsByFilterByDateAndArrondissement(dateDebut, dateFin, arrondissement) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("arrondissement", arrondissement);
		return this.http.get<any[]>(this.apiURL + "/convention/rechercheFindByDateAndArrondissement", { params: queryParams });
	}

	getConvsByFilterByAllParameters(dateDebut, dateFin, champActivite, arrondissement) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("champActivite", champActivite);
		queryParams = queryParams.append("arrondissement", arrondissement);
		return this.http.get<any[]>(this.apiURL + "/convention/rechercheFindByAllParameters", { params: queryParams });
	}
}
