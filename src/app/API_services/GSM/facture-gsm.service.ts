import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {FactureGSM} from "../../API_Models/FactureGSM";
import {OriginalFactureLANFilename} from "../../API_Models/OriginalFactureLANFilename";
import {OriginalFactureGSMFilename} from "../../API_Models/OriginalFactureGSMFilename";


@Injectable({
  providedIn: 'root'
})
export class FactureGSMService {

	private baseURL = "http://localhost:8080/GSM/Facture-GSM";

	constructor(private http: HttpClient) {}

	save_uploadFactureGSM1(selectedFile: File, date_facturation: Date, montant: number, etat: Facture_PaiementStatut, mode_payement:string): Observable<any> {
		const formData: FormData = new FormData();
		formData.append('file', selectedFile);

		const params = new HttpParams()
			.set('Montant', montant.toString())
			.set('etat', etat.toString())
			.set('mode_paiement', mode_payement.toString());

		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');

		return this.http.post<any>(`${this.baseURL}/save?dateFacture=${date_facturation}`, formData, { headers, params });
	}

	updateFactureGSM1(id:number, selectedFile: File, date_facturation: Date, montant: number, etat: Facture_PaiementStatut, mode_payement:string): Observable<any> {
		const formData: FormData = new FormData();
		formData.append('file', selectedFile);

		const params = new HttpParams()
			.set('Montant', montant.toString())
			.set('etat', etat.toString())
			.set('mode_paiement', mode_payement.toString());

		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');

		return this.http.put<any>(`${this.baseURL}/update/${id}?dateFacture=${date_facturation}`, formData, { headers, params });
	}

	getAllFactureGSMs(): Observable<FactureGSM[]> {
		return this.http.get<FactureGSM[]>(`${this.baseURL}/get/all`);
	}

	getAllFacturesGSMPagination(nextPage: number, pageSize: number): Observable<FactureGSM[]> {
		return this.http.get<FactureGSM[]>(`${this.baseURL}/get/all/pagination?nextPage=${nextPage}&pageSize=${pageSize}`);
	}

	getFactureGSMByID(id: number): Observable<FactureGSM> {
		return this.http.get<FactureGSM>(`${this.baseURL}/get/${id}`);
	}

	getOriginalFactureGSMFileNameByID(id: number): Observable<OriginalFactureGSMFilename> {
		return this.http.get<OriginalFactureGSMFilename>(`${this.baseURL}/get/originalFacture/${id}`);
	}

	getOriginalFactureGSMByID(id: number): Observable<Blob> {
		const url=`${this.baseURL}/get/orginalFacture/download/${id}`
		const options = { responseType: 'blob' as 'json', observe: 'response' as 'body' };
		return this.http.get<Blob>(url, options);
	}

	deleteOriginalFacture(id:number): Observable<Blob> {
		const url=`${this.baseURL}/delete/originalFacture/${id}`
		const options = { responseType: 'blob' as 'json', observe: 'response' as 'body' };
		return this.http.delete<Blob>(url, options);
	}

	deleteFactureGSMByID(id: number): Observable<FactureGSM> {
		return this.http.delete<FactureGSM>(`${this.baseURL}/delete/id?id=${id}`);
	}



	generateFactureGSM(idFacture: number): Observable<Blob> {
		const url = `${this.baseURL}/generate/pdf/download?idFacture=${idFacture}`;
		const options = { responseType: 'blob' as 'json', observe: 'response' as 'body' };
		return this.http.get<Blob>(url, options);
	}


}

