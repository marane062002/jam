import { Injectable, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { DatePipe } from '@angular/common';

@Injectable({
	providedIn: "root",
})
export class PrestataireService {
	private baseUrl = environment.marcheUrl + "/Ao/";
	private baseUrl2 = environment.marcheUrl + "/Prestataire/";

	constructor(private http: HttpClient, private datePipe: DatePipe) { }
	SM: number;
	PourcentageTechnique: number;
	PourcentageFinancier: number;
	ModePassationAo: String;

	getAllPrestataireNomAndId(): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "all"
		);
	}

	getAllById(id:any): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "findById/"+id
		);
	}

	updatePrestataire(data): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "updatePrestataire", data
		);
	}
		
}
