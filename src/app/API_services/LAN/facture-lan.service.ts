import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";
import {FactureLAN} from "../../API_Models/FactureLAN";
import {OriginalFactureLANFilename} from "../../API_Models/OriginalFactureLANFilename";

@Injectable({
  providedIn: 'root'
})
export class FactureLANService {

	private baseURL = "http://localhost:8080/LAN/Facture-LAN";

	constructor(private http: HttpClient) {}

	save_uploadFactureLAN(selectedFile: File, date_facturation: Date, montant: number, etat: Facture_PaiementStatut, mode_payement:string): Observable<any> {
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

	updateFactureLAN(id:number, selectedFile: File, date_facturation: Date, montant: number, etat: Facture_PaiementStatut, mode_payement:string): Observable<any> {
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

	getAllFactureLANs(): Observable<FactureLAN[]> {
		return this.http.get<FactureLAN[]>(`${this.baseURL}/get/all`);
	}

	getAllFacturesLANPagination(nextPage: number, pageSize: number): Observable<FactureLAN[]> {
		return this.http.get<FactureLAN[]>(`${this.baseURL}/get/all/pagination?nextPage=${nextPage}&pageSize=${pageSize}`);
	}

	getFactureLANByID(id: number): Observable<FactureLAN> {
		return this.http.get<FactureLAN>(`${this.baseURL}/get/${id}`);
	}

	getOriginalFactureLANByID(id: number): Observable<Blob> {
		const url=`${this.baseURL}/get/orginalFacture/download/${id}`
		const options = { responseType: 'blob' as 'json', observe: 'response' as 'body' };
		return this.http.get<Blob>(url, options);
	}
	getOriginalFactureLANFileNameByID(id: number): Observable<OriginalFactureLANFilename> {
		return this.http.get<OriginalFactureLANFilename>(`${this.baseURL}/get/originalFacture/${id}`);
	}

	deleteOriginalFactureLAN(id:number): Observable<Blob> {
		const url=`${this.baseURL}/delete/originalFacture/${id}`
		const options = { responseType: 'blob' as 'json', observe: 'response' as 'body' };
		return this.http.delete<Blob>(url, options);
	}

	deleteFactureLANByID(id: number): Observable<FactureLAN> {
		return this.http.delete<FactureLAN>(`${this.baseURL}/delete/${id}`);
	}
	generateFactureLAN(idFacture: number): Observable<Blob> {
		const url = `${this.baseURL}/generate/pdf/download?idFacture=${idFacture}`;
		const options = { responseType: 'blob' as 'json', observe: 'response' as 'body' };
		return this.http.get<Blob>(url, options);
	}

}
