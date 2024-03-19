import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "./../../../../environments/environment";
import { Pageable } from './pagination/pageable';
import { Observable } from 'rxjs';
import { DialogData } from '../demandes/status-change-dialog/status-change-dialog.component';
import { delay } from "rxjs/operators";
const BACKEND_URL = environment.API_ASSOCIATION_URL;
const BACKEND_URL2 = environment.autorisationUrl;
const GED_URL = environment.API_ALFRESCO_URL;
@Injectable({
	providedIn: 'root'
})
export class DemandesService {
	public apiURL = `${BACKEND_URL}`;
	public apiURL2 = `${BACKEND_URL2}`;


	public AlfrescoURL = `${GED_URL}`;

	constructor(private http: HttpClient) { }
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Demandeds 
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	getAllDemandesByPage(url, pageable: Pageable): Observable<any[]> {
		let path = this.apiURL + url
			+ '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize
			+ '&sort=id,desc'
		return this.http.get<any[]>(path);
	}


	changeStatut(data: DialogData): Observable<any> {
		let path = this.apiURL + '/demandeJammati/changeStatus';
		return this.http.post<any>(path, data);
	}

	changeStatutFinancier(data: DialogData): Observable<any> {
		let path = this.apiURL + '/demandeJammati/changeStatusFinancier';
		return this.http.post<any>(path, data);
	}
	changeStatusLogistic(data: DialogData): Observable<any> {
		let path = this.apiURL + '/demandeJammati/changeStatusLogistic';
		return this.http.post<any>(path, data);
	}
	getDemandeByCode(url, id: string): Observable<any> {
		return this.http.get<any>(this.apiURL + url + id);
	}

	//demandes of public properties added le 13/03/2024
	changeStatutPubProp(data: DialogData): Observable<any> {
		let path = this.apiURL2 + 'demandeJammati/changeStatus';
		return this.http.post<any>(path, data);
	}
	findByMotCle(pageable: Pageable, motCle: any) {
		let path = this.apiURL + '/demandeJammati/ByMotCle' + '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize + '&sort=id,desc' + `${motCle ? '&motCle=' + motCle : ''}`

		return this.http.get<any[]>(`${path}`);
	}
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// get demandes lisences by status
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	getDemandesByStatus(pageable: Pageable, status: string): Observable<any[]> {
		let path = this.apiURL + '/demandeJammati/ByStatus' + '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize + '&sort=submissionDate,desc' + `${status ? '&status=' + status : ''}`
		return this.http.get<any[]>(path);
	}

	getDemandesSoutienFinancierByStatus(pageable: Pageable, status: string): Observable<any[]> {
		let path = this.apiURL + '/demandeJammati/SoutienFinancierByStatus' + '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize + '&sort=submissionDate,desc' + `${status ? '&status=' + status : ''}`
		return this.http.get<any[]>(path);
	}
	getDemandesSoutienLogisticByStatus(pageable: Pageable, status: string): Observable<any[]> {
		let path = this.apiURL + '/demandeJammati/SoutienLogistiqueByStatus' + '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize + '&sort=submissionDate,desc' + `${status ? '&status=' + status : ''}`
		return this.http.get<any[]>(path);
	}
	getDemandesSoutienLogisticByStatusAndDemandeurType(pageable: Pageable, status: string, demandeur_type: string): Observable<any[]> {
		let path = this.apiURL + '/demandeJammati/ByStatusAndDemandeurType' + '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize + '&sort=submissionDate,desc' + `${status ? '&status=' + status : ''}` + `${demandeur_type ? '&demandeur_type=' + demandeur_type : ''}`
		return this.http.get<any[]>(path);
	}
	getDemandeLicenseByStatusAndDemandeType(pageable: Pageable, status: string, demandeur_type: string): Observable<any[]> {
		let path = this.apiURL + '/demandeJammati/demandesLisencesByStatusAndType' + '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize + '&sort=submissionDate,desc' + `${status ? '&status=' + status : ''}` + `${demandeur_type ? '&demandeur_type=' + demandeur_type : ''}`
		return this.http.get<any[]>(path);
	}

	//demandes of public properties added le 13/03/2024
	getDemandesPubPropByStatusAndDemandeType(pageable: Pageable, status: string, demandeur_type: string): Observable<any[]> {
		let path = this.apiURL2 + 'demandeJammati/ByStatusAndDemandeurType' + '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize + '&sort=submissionDate,desc' + `${status ? '&status=' + status : ''}` + `${demandeur_type ? '&demandeur_type=' + demandeur_type : ''}`
		return this.http.get<any[]>(path);
	}
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// get demandes by id 
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	getDemandesById(url, id: Number): Observable<any> {
		return this.http.get<any>(this.apiURL + url + id);
	}
	//added by saad le 13/03/2024
	getDemandesByIdPubProp(url, id: Number): Observable<any> {
		return this.http.get<any>(this.apiURL2 + url + id);
	}
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// ALFRESCO
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	uploadf(formData: FormData) {
		const httpOptions = {
			reportProgress: true,
			Observe: 'events',

		};

		return this.http.post(this.AlfrescoURL + '/PjDemande/multiplefile', formData, httpOptions);
	}
	//this for demandes public properties added le 13/03/2024
	uploadfPubProp(formData: FormData) {
		const httpOptions = {
			reportProgress: true,
			Observe: 'events',

		};
		return this.http.post(this.AlfrescoURL + '/PjDemandePubProp/multiplefile', formData, httpOptions);
	}

	updloadFile(v, id): Observable<any> {
		console.log("taille de fichier demandes :" + v.length);
		const formda: FormData = new FormData();
		for (var i = 0; i < v.length; i++) {
			formda.append("file", v[i]);
		}
		formda.append("id", id);
		formda.append("type", "test");
		return this.http.post<any>(this.AlfrescoURL + "/PjDemande/multiplefile", formda, { responseType: "blob" as "json" });
	}

	getByIdFiles(f): Observable<any> {
		return this.http.get<Observable<any>>(this.AlfrescoURL + "/PjDemande/Allpjs/" + f);
	}
	getByIdRequestsOrResponse(f, type): Observable<any> {
		return this.http.get<Observable<any>>(this.AlfrescoURL + "/PjDemande/Allpjs/" + f + type);
	}

	//for demandes public properties added le 13/03/2024
	getByIdRequestsOrResponsePubProp(f, type): Observable<any> {
		return this.http.get<Observable<any>>(this.AlfrescoURL + "/PjDemandePubProp/Allpjs/" + f + type);
	}

	getByIdFiles2(f, repo): Observable<any> {
		return this.http.get<Observable<any>>(this.AlfrescoURL + "/" + repo + "/PjDemande/" + f);
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

}