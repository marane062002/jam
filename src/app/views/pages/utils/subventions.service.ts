import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { environment } from "./../../../../environments/environment";
import { SaerchSubventionDTO } from "./class/saerch-subvention-dto";
const BACKEND_URL = environment.API_SUBVENTION_URL;
const BACKEND_URL_ASS = environment.API_ASSOCIATION_URL;
const GED_URL = environment.API_ALFRESCO_URL;

@Injectable({
	providedIn: "root",
})
export class SubventionsService {
	public apiURL = `${BACKEND_URL}`;
	public apiURL_ASS = `${BACKEND_URL_ASS}`;
	public AlfrescoURL = `${GED_URL}`;
	private baseUrl = environment.organisationUrl;

	constructor(private http: HttpClient) {}

	public getData(): Observable<any> {
		let etat = this.http.get(this.apiURL + "/etatSubvention/index");
		let type = this.http.get(this.apiURL + "/typeSubvention/index");
		let sousType = this.http.get(this.apiURL + "/sousTypeSubvention/index");
		let organisme = this.http.get(this.apiURL + "/organismeAccueil/index");
		let fournisseur = this.http.get(this.apiURL + "/fournisseurRestauration/index");
		let frs_impression = this.http.get(this.apiURL + "/fournisseurImpression/index");
		// let nomAssociation = this.http.get(this.apiURL_ASS + "/association/index");

		return forkJoin([etat, type, sousType, organisme, fournisseur, frs_impression]);
	}

	public getArrondissements(): Observable<any> {
		return this.http.get(this.baseUrl + "/arrondissements/index");
	}

	// ====================================
	getAllObjectListById(url, id: number): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL + url + id);
	}
	// methodes CRUD
	// ====================================

	public getRessource(url): Observable<any> {
		return this.http.get(this.apiURL + url);
	}

	async getAllSubData(url) {
		return await this.http.get<any>(this.apiURL + url).toPromise();
	}

	public getAssociation(): Observable<any> {
		return this.http.get(this.apiURL_ASS + "/association/index");
	}

	getAllObject(url): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL + url);
	}

	getObjectById(url, id: number): Observable<any> {
		return this.http.get<any>(this.apiURL + url + id);
	}

	createObject(url, obj: any): Observable<any> {
		return this.http.post<any>(this.apiURL + url, obj);
	}

	updateObject(url, obj: any): Observable<any> {
		return this.http.put<any>(this.apiURL + url + obj.id, obj);
	}

	deleteSubvention(url, id: number): Observable<any> {
		return this.http.delete<any>(this.apiURL + url + id);
	}

	getAllSubventionListById(url, id: number): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL + url + id);
	}

	getAllSubvention(url): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL + url);
	}

	getAllStatSubention(saerch: SaerchSubventionDTO): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/subvention/stats", saerch);
	}
	getStatSUbvenstionByAss(id: number, saerch: SaerchSubventionDTO): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/subvention/getStatSUbvenstionByAss/" + id, saerch);
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

	getSubsByFilterOnlyDate(dateDebut, dateFin) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.apiURL + "/subvention/rechercheSubDate", { params: queryParams });
	}

	
	getSubsByFilterAnneeSubv(anneeSubvention) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("anneeSubvention", anneeSubvention);
		return this.http.get<any[]>(this.apiURL + "/subvention/rechercheSubAnneeSubv", { params: queryParams });
	}

	getSubsByFilterOnlyDateAndAnneeSubv(dateDebut, dateFin,anneeSubvention) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("anneeSubvention", anneeSubvention);
		return this.http.get<any[]>(this.apiURL + "/subvention/rechercheSubDateAndAnneeSubv", { params: queryParams });
	}

	getSubsByFilterOnlyDateAndArron(dateDebut, dateFin,arrondissement) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("arrondissement", arrondissement);
		return this.http.get<any[]>(this.apiURL + "/subvention/rechercheSubDateAndArrondissement", { params: queryParams });
	}

	getSubsByFilterOnlyDateAndArronAndAnneeSubv(dateDebut, dateFin,arrondissement,anneeSubvention) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("arrondissement", arrondissement);
		queryParams = queryParams.append("anneeSubvention", anneeSubvention);
		return this.http.get<any[]>(this.apiURL + "/subvention/rechercheSubDateAndArrondissementAndAnneeSubv", { params: queryParams });
	}
}
