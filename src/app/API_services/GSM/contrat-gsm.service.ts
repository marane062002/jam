import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ContratGSM} from "../../API_Models/ContratGSM";
import { Observable } from 'rxjs';
import {OriginalFactureGSMFilename} from "../../API_Models/OriginalFactureGSMFilename";
import {OriginalContratGSMFilename} from "../../API_Models/OriginalContratGSMFilename";

@Injectable({
  providedIn: 'root'
})
export class ContratGSMService {

	private baseURL = "http://localhost:8080/GSM/Contrats";

	constructor(private http: HttpClient) {}

	/*save_uploadContratGSM2(formData: FormData, params: HttpParams): Observable<ContratGSM> {
		const headers = new HttpHeaders();
		return this.http.post<ContratGSM>(`${this.baseURL}/save`, formData, { headers, params });
	}*/

	save_uploadContratGSM1(selectedFile: File, date_debut: Date, date_fin: Date, num_contrat: number, montant_annuel: number): Observable<any> {
		const formData: FormData = new FormData();
		formData.append('file', selectedFile);

		const params = new HttpParams()
		//	.set('date_debut', date_debut.toString())
		//	.set('date_fin', date_fin.toString())
			.set('num_contrat', num_contrat.toString())
			.set('montant_annuel', montant_annuel.toString());

		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');

		return this.http.post<any>(`${this.baseURL}/save?date_debut=${date_debut}&date_fin=${date_fin}`, formData, { headers, params });
	}

	updateContratGSM1(id: number,selectedFile: File, date_debut: Date, date_fin: Date, num_contrat: number, montant_annuel: number): Observable<any> {
		const formData: FormData = new FormData();
		formData.append('file', selectedFile);

		const params = new HttpParams()
			.set('date_debut', date_debut.toString())
			.set('date_fin', date_fin.toString())
			.set('num_contrat', num_contrat.toString())
			.set('montant_annuel', montant_annuel.toString());

		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');

		return this.http.put<any>(`${this.baseURL}/update/${id}`, formData, { headers, params });
	}


	getAllContratsGSM(): Observable<ContratGSM[]> {
		return this.http.get<ContratGSM[]>(`${this.baseURL}/get/all`);
	}

	getAllContratsGSMPagination(nextPage: number, pageSize: number): Observable<ContratGSM[]> {
		return this.http.get<ContratGSM[]>(`${this.baseURL}/get/all/pagination?nextPage=${nextPage}&pageSize=${pageSize}`);
	}

	getContratGSMByID(id: number): Observable<ContratGSM> {
		return this.http.get<ContratGSM>(`${this.baseURL}/get/id?id=${id}`);
	}

	getOriginalContratGSMByID(id: number): Observable<Blob> {
		const url=`${this.baseURL}/get/orginalContrat/download/${id}`
		const options = { responseType: 'blob' as 'json', observe: 'response' as 'body' };
		return this.http.get<Blob>(url, options);
	}

	getOriginalContratGSMFileNameByID(id: number): Observable<OriginalContratGSMFilename> {
		return this.http.get<OriginalContratGSMFilename>(`${this.baseURL}/get/originalContrat/${id}`);
	}

	deleteOriginalContrat(id:number): Observable<Blob> {
		const url=`${this.baseURL}/delete/originalContrat/${id}`
		const options = { responseType: 'blob' as 'json', observe: 'response' as 'body' };
		return this.http.delete<Blob>(url, options);
	}

	deleteContratGSMByID(id: number): Observable<ContratGSM> {
		return this.http.delete<ContratGSM>(`${this.baseURL}/delete/id?id=${id}`);
	}
	generateContratGSM(idContrat: number): Observable<Blob> {
		const url = `${this.baseURL}/generate/pdf/download?idContrat=${idContrat}`;
		const options = { responseType: 'blob' as 'json', observe: 'response' as 'body' };
		return this.http.get<Blob>(url, options);
	}

}

