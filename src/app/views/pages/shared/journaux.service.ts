import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Journaux } from "../marche/models/journaux";

@Injectable({
	providedIn: "root",
})
export class JournauxService {
	private consultationArchitectural = environment.marcheUrl + "/ca/";
	private architecte = environment.marcheUrl + "/architecte/";
	private journaux = environment.marcheUrl + "/journaux/";
	private baseUrl1 = environment.API_ALFRESCO_URL + "/PjAoG";
	private baseUrl3 = environment.API_ALFRESCO_URL + "/PjMarche";
	private baseUrl4 = environment.API_ALFRESCO_URL + "/PjBC";
	private baseUrl5 = environment.marcheUrl + "/Config/";
	private baseUrl6 = environment.marcheUrl + "/Reports/";
	constructor(private http: HttpClient) {}

	getAll(): Observable<Journaux[]> {
		return this.http.get<Journaux[]>(this.journaux, {
			responseType: "text" as "json",
		});
	}

	getJournalById(idJournal: any): Observable<Journaux> {
		return this.http.get<Journaux>(this.journaux + idJournal, {
			responseType: "text" as "json",
		});
	}
	addJournal(journal: Journaux): Observable<Journaux> {
		return this.http.post<Journaux>(
			this.journaux,
			journal, {
			responseType: "text" as "json",
		});
	}

	addJournale(journal: Journaux): Observable<Journaux> {
		return this.http.post<Journaux>(
			this.journaux + "add",
			journal, {
			responseType: "text" as "json",
		});
	}

	editJuurnal(journal: Journaux): Observable<Journaux> {
		return this.http.post<Journaux>(
			this.journaux + "editerJournale",
			journal,
			{
				responseType: "text" as "json",
			}
		);
	}
	deleteJournal(idJournal: any): Observable<string> {
		return this.http.delete<string>(this.journaux + idJournal, {
			responseType: "text" as "json",
		});
	}
	imprimerJournal(id: any, idjournale: any) { 
		return this.http.get(
			this.baseUrl6 + "generateJournale/" + id + "/" + idjournale,
			{
				responseType: "arraybuffer" as "json",
			}
		);
	}

	imprimerJournalAo(id: any, idjournale: any) {
		return this.http.get(
			this.baseUrl6 + "AO/generateJournal/" + id + "/" + idjournale,
			{
				responseType: "arraybuffer" as "json",
			}
		);
	}
}
