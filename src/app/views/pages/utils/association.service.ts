import { delay } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "./../../../../environments/environment";
import { SaerchAssociationDTO, SaerchAssociationDTO4, SaerchAssociationDTO5, SaerchAssociationDTO6 } from "./class/saerch-association-dto";
import { SaerchAssociationDTO2 } from "./class/saerch-association-dto";
import { SaerchAssociationDTO3 } from "./class/saerch-association-dto";
import { SaerchAssociationDTO7 } from "./class/saerch-association-dto";
import { Pageable } from "./pagination/pageable";

const BACKEND_URL = environment.API_ASSOCIATION_URL;

const BACKEND_URL_SUBVENTION = environment.API_SUBVENTION_URL;
// const BACKEND_URL_ACT = environment.API_ACTIVITE_URL;
// const BACKEND_URL_CONV = environment.API_CONVENTION;
// const BACKEND_URL_SUB = environment.API_SUBVENTION_URL;
// const BACKEND_URL_PROJ = environment.API_PROJET_PARTENARIAT;
// const BACKEND_URL_LOC = environment.API_LOCAUX_URL;
const GED_URL = environment.API_ALFRESCO_URL;

@Injectable({
	providedIn: "root",
})
export class AssociationService {
	public apiURL = `${BACKEND_URL}`;
	public apiURL_SUB = `${BACKEND_URL_SUBVENTION}`;
	private baseUrl1 = environment.API_ALFRESCO_URL + "/PjAssociation";

	// public apiURL_ACT = `${BACKEND_URL_ACT}`;
	// public apiURL_CNV = `${BACKEND_URL_CONV}`;
	// public apiURL_LOC = `${BACKEND_URL_LOC}`;
	// public apiURL_SUB = `${BACKEND_URL_SUB}`;
	// public apiURL_PROJ = `${BACKEND_URL_PROJ}`;
	public AlfrescoURL = `${GED_URL}`;

	constructor(private http: HttpClient) { }

	public getData(): Observable<any> {
		let statutAssociation = this.http.get(this.apiURL + "/statut/index");
		let typeActivite = this.http.get(this.apiURL + "/typeActiviteAssociation/index");
		let villeActivite = this.http.get(this.apiURL + "/villeActivite/index");
		let annexeAdministrative = this.http.get(this.apiURL + "/annexeAdministratif/index");
		return forkJoin([statutAssociation, typeActivite, villeActivite, annexeAdministrative]);
	}
	public getData2(): Observable<any> {
		return this.http.get(this.apiURL + "/typeActiviteAssociation/index");
	}

	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// ASSOCIATION
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	getAllAssociationByPage(url, pageable: Pageable): Observable<any[]> {
		let path = this.apiURL + url
			+ '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize
			+ '&sort=id,desc'
		return this.http.get<any[]>(path);
	}
	findByMotCle(pageable: Pageable, motCle: any) {
		let path = this.apiURL + '/association/ByMotCle' + '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize + '&sort=id,desc' + `${motCle ? '&motCle=' + motCle : ''}`

		return this.http.get<any[]>(`${path}`);
	}
	getAllcourrierEntrantsBypersonnelchefId(url, id: number, pageable: Pageable): Observable<any[]> {
		let path = this.apiURL + url + id
			+ '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize
			+ '&sort=id,desc'
		return this.http.get<any[]>(path);
	}
	deleteByIdFiles(f): Observable<any> {
		return this.http.delete<Observable<any>>(this.baseUrl1 + "/" + f);
	}

	getALLAssByIds(uri, ids: any[]): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL + uri + "/byids/" + ids);
	}

	public getRessource(url): Observable<any> {
		return this.http.get(this.apiURL + url);
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

	deleteObject(url, id: number): Observable<any> {
		return this.http.delete<any>(this.apiURL + url + id);
	}

	getAllObjectListById(url, id: number): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL + url + id);
	}

	getNbrAssociationByParams(type: any[], commune: any[], serach: SaerchAssociationDTO): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/association/stats/" + type + "&" + commune, serach);
	}
	//============================================================================================================
	//subvention ------>activite_de_rayonnement
	getNbrAssociationByParamsRayonnement(activite_de_rayonnement: any[], serach: SaerchAssociationDTO4): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL_SUB + "/association/stats2/" + activite_de_rayonnement, serach);
	}

	getNbrAssociationByDateAndRayonnement(serach: SaerchAssociationDTO4): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL_SUB + "/association/stats22", serach);
	}

	//Arrondissement
	getNbrAssociationByParamsArrondissement(arrondissement: any[], serach: SaerchAssociationDTO5): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL_SUB + "/association/stats/" + arrondissement, serach);
	}

	getNbrAssociationByDateAndArrondissement(serach: SaerchAssociationDTO5): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL_SUB + "/association/stats23", serach);
	}
	//les deux
	finbyTWO(activite_de_rayonnement: any[], arrondissement: any[], serach: SaerchAssociationDTO6): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL_SUB + "/association/stats/two{TWO}/" + arrondissement + activite_de_rayonnement, serach);
	}

	findAllbyDateAndTWO(serach: SaerchAssociationDTO6): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL_SUB + "/association/statsTwo", serach);
	}
	//============================================================================================================
	//==========================================LOGISTIQUE==================================================================
	//subvention ------>activite_de_rayonnement
	getNbrAssociationByParamsRayonnementLogistique(activite_de_rayonnement: any[], serach: SaerchAssociationDTO4): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/association/stats2/" + activite_de_rayonnement, serach);
	}

	getNbrAssociationByDateAndRayonnementLogistique(serach: SaerchAssociationDTO4): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/association/stats22", serach);
	}

	//Arrondissement
	getNbrAssociationByParamsArrondissementLogistique(arrondissement: any[], serach: SaerchAssociationDTO5): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/association/stats/" + arrondissement, serach);
	}

	getNbrAssociationByDateAndArrondissementLogistique(serach: SaerchAssociationDTO5): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/association/stats23", serach);
	}
	//les deux
	finbyTWOLogistique(activite_de_rayonnement: any[], arrondissement: any[], serach: SaerchAssociationDTO6): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/logistique/stats/two{TWO}/" + activite_de_rayonnement + arrondissement, serach);
	}

	findAllbyDateAndTWOLogistique(serach: SaerchAssociationDTO6): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/logistique/statsTwo", serach);
	}
	//============================================================================================================
	//============================================================================================================
	//============================================================================================================
	//Logistique statistique
	getNbrAssociationByParamsLOg(natureSubvention: any[], serach: SaerchAssociationDTO2): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/association/stats/" + natureSubvention, serach);
	}
	getNbrAssociationByDateAndNatureLOg(serach: SaerchAssociationDTO2): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/association/stats", serach);
	}

	//============================================================================================================
	//subvention statistique

	getNbrAssociationByDateAndNatureSub(serach2: SaerchAssociationDTO3): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL_SUB + "/subventionn/stats2", serach2);
	}

	//============================================================================================================
	getNbrAssociationByParams2(natureSubvention: any[], serach: SaerchAssociationDTO2): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/logistique/stats/" + natureSubvention, serach);
	}

	getNbrAssociationByDateAndTypeAndCommune2(serach: SaerchAssociationDTO2): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/logistique/stats", serach);
	}

	getAssociationStatistics(startDate: string, endDate: string, natureSubvention: any[]): Observable<any[]> {
		return this.http.get<any[]>(`${this.apiURL}/logistique/statistics`, {
			params: {
				startDate,
				endDate,
				natureSubvention,
			},
		});
	}
	//============================================================================================================

	getNbrAssociationByDateAndTypeAndCommune(serach: SaerchAssociationDTO): Observable<any[]> {
		return this.http.post<any[]>(this.apiURL + "/association/stats", serach);
	}

	getSatatAssoctionByid(id: number): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL + "/association/stats/" + id);
	}
	getAssociationbytypeAndSttatus(type: any, statuts: any): Observable<any> {
		return this.http.get<any>(this.apiURL + "/association/byStatutAndType/" + type + "&" + statuts);
	}
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// ALFRESCO
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	updloadFile(v, id): Observable<any> {
		console.log("taille de fichier association :" + v.length);
		const formda: FormData = new FormData();
		for (var i = 0; i < v.length; i++) {
			formda.append("file", v[i]);
		}
		formda.append("id", id);
		formda.append("type", "test");
		return this.http.post<any>(this.AlfrescoURL + "/PjAssociation/multiplefile", formda, { responseType: "blob" as "json" });
	}

	getByIdFiles(f): Observable<any> {
		return this.http.get<Observable<any>>(this.AlfrescoURL + "/PjAssociation/Allpjs/" + f);
	}
	getByIdFiles2(f, repo): Observable<any> {
		return this.http.get<Observable<any>>(this.AlfrescoURL + "/" + repo + "/PjAssociation/" + f);
	}

	deletefiles(url, id: number): Observable<any> {
		return this.http.delete<any>(this.AlfrescoURL + url + id);
	}

	// for data source files toPromise
	async getFilesById(url, id) {
		return await this.http
			.get<any>(this.AlfrescoURL + url + id)
			.pipe(delay(1000))
			.toPromise();
	}
	/*
		deleteOnCasscadAssociation(idAss) {
		this.deletefiles("/associationService/ByIdAssociation/", idAss)
		.subscribe((data) => {
		});
	  }
	  */
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// SEARCHE MANDAT BETWEEN DATES
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	getMondatBureauBetweenDates(d1, d2): Observable<any> {
		return this.http.get<any>(this.apiURL + "/mandatBureau/date/" + d1 + "&" + d2);
	}
	// ++++++++++++++++++++++++++++++++++++++++   Association    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	getMarcheByFilterOnlyDate(dateDebut, dateFin) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.apiURL + "/association/rechercheDate", { params: queryParams });
	}

	getMarcheByFilterParameters(dateDebut, dateFin, typeActiviteAssociation) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("typeActiviteAssociation", typeActiviteAssociation);
		return this.http.get<any[]>(this.apiURL + "/association/recherche", { params: queryParams });
	}
	getMarcheByFilterParameters1(dateDebut, dateFin, typeActiviteAssociation, classification) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("typeActiviteAssociation", typeActiviteAssociation);
		queryParams = queryParams.append("classification", classification);
		return this.http.get<any[]>(this.apiURL + "/association/rechercheFindAllbyDateAndType_activiteAndCommune", { params: queryParams });
	}

	getMarcheByFilterParameters2(dateDebut, dateFin, typeActiviteAssociation, classification, communeActivite) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("typeActiviteAssociation", typeActiviteAssociation);
		queryParams = queryParams.append("classification", classification);
		queryParams = queryParams.append("communeActivite", communeActivite);
		return this.http.get<any[]>(this.apiURL + "/association/rechercheFindByAllParameters", { params: queryParams });
	}

	getMarcheByFilterParameters3(dateDebut, dateFin, classification) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("classification", classification);
		return this.http.get<any[]>(this.apiURL + "/association/rechercheFindByParameters3", { params: queryParams });
	}

	getMarcheByFilterParameters4(dateDebut, dateFin, communeActivite) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("communeActivite", communeActivite);
		return this.http.get<any[]>(this.apiURL + "/association/rechercheFindByParameters4", { params: queryParams });
	}

	getMarcheByFilterParameters5(dateDebut, dateFin, typeActiviteAssociation, communeActivite) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("typeActiviteAssociation", typeActiviteAssociation);
		queryParams = queryParams.append("communeActivite", communeActivite);
		return this.http.get<any[]>(this.apiURL + "/association/rechercheFindByParameters5", { params: queryParams });
	}

	getMarcheByFilterParameters6(dateDebut, dateFin, classification, communeActivite) {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("classification", classification);
		queryParams = queryParams.append("communeActivite", communeActivite);
		return this.http.get<any[]>(this.apiURL + "/association/rechercheFindByParameters6", { params: queryParams });
	}


	downoldFile(alfresco_id, a) {
		const options = {

			responseType: 'arraybuffer' as 'json'
		};
		this.http.get(this.baseUrl1 + '/' + alfresco_id, options)
			.subscribe((data: any) => {
				if (a == 'pdf.svg') {
					const blob = new Blob([data], { type: 'application/pdf' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				else if (a == 'png.svg') {
					const blob = new Blob([data], { type: 'image/png' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				else if (a == 'xls.svg') {
					const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				else if (a == 'doc.svg') {
					const blob = new Blob([data], { type: 'application/msword' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				else if (a == 'jpg.svg') {
					const blob = new Blob([data], { type: 'image/jpeg' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				else if (a == 'csv.svg') {
					const blob = new Blob([data], { type: 'text/csv' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				else if (a == 'txt.svg') {
					const blob = new Blob([data], { type: 'text/plain' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				} else if (a == 'txt.svg') {
					const blob = new Blob([data], { type: 'text/plain' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}

			});
	}
}
