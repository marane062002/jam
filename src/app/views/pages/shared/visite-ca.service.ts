import { VisiteCa } from "./../marche/models/visite-ca";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class VisiteCaService {
	private consultationArchitectural = environment.marcheUrl + "/ca/";
	private architecte = environment.marcheUrl + "/architecte/";
	private journaux = environment.marcheUrl + "/journaux/";
	private visite = environment.marcheUrl + "/visiteCA/";
	private baseUrl1 = environment.API_ALFRESCO_URL + "/PjAoG";
	private baseUrl3 = environment.API_ALFRESCO_URL + "/PjMarche";
	private baseUrl4 = environment.API_ALFRESCO_URL + "/PjBC";
	private baseUrl5 = environment.marcheUrl + "/Config/";
	private baseUrl6 = environment.marcheUrl + "/Reports/";
	constructor(private http: HttpClient) {}

	getAll(): Observable<VisiteCa[]> {
		return this.http.get<VisiteCa[]>(this.visite, {
			responseType: "text" as "json",
		});
	}

	getVisiteBYId(id: any): Observable<VisiteCa> {
		return this.http.get<VisiteCa>(this.visite + id, {
			responseType: "text" as "json",
		});
	}

	getVisiteBYCAID(id: any): Observable<VisiteCa[]> {
		return this.http.get<VisiteCa[]>(this.visite + "getByIdCA/" + id, {
			responseType: "text" as "json",
		});
	}

	addVisite(consulation: VisiteCa): Observable<VisiteCa> {
		return this.http.post<VisiteCa>(this.visite, consulation, {
			responseType: "text" as "json",
		});
	}
	editVisite(consulation: VisiteCa): Observable<VisiteCa> {
		return this.http.post<VisiteCa>(this.visite, consulation, {
			responseType: "text" as "json",
		});
	}

	deleteVisite(id: any): Observable<string> {
		return this.http.delete<string>(this.visite + id, {
			responseType: "text" as "json",
		});
	}
}
