import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Architecte } from "../marche/models/architecte";
export class ValideCommisionFinance {
	id?: number;
	nt?: DoubleRange;
	nf?: DoubleRange;
	ne?: DoubleRange;
}
export class MotifDeRejet {
	id?: number;
	motifDeRejet?: string;
}

@Injectable({
	providedIn: "root",
})
export class ArchitecteService {
	private consultationArchitectural = environment.marcheUrl + "/ca/";
	private architecte = environment.marcheUrl + "/architecte/";
	private journaux = environment.marcheUrl + "/journaux/";
	private baseUrl1 = environment.API_ALFRESCO_URL + "/PjAoG";
	private baseUrl3 = environment.API_ALFRESCO_URL + "/PjMarche";
	private baseUrl4 = environment.API_ALFRESCO_URL + "/PjBC";
	private baseUrl5 = environment.marcheUrl + "/Config/";
	private baseUrl6 = environment.marcheUrl + "/Reports/";
	constructor(private http: HttpClient) {}
	getAll(): Observable<Architecte[]> {
		return this.http.get<Architecte[]>(this.architecte, {
			responseType: "text" as "json",
		});
	}

	getArchitecteById(idArchitecte: any): Observable<Architecte> {
		return this.http.get<Architecte>(this.architecte + idArchitecte, {
			responseType: "text" as "json",
		});
	}
	addArchitecte(architecte: Architecte): Observable<Architecte> {
		return this.http.post<Architecte>(this.architecte, architecte, {
			responseType: "text" as "json",
		});
	}
	editArchitecte(architecte: Architecte): Observable<Architecte> {
		return this.http.post<Architecte>(
			this.architecte + "editerArchitecte",
			architecte,
			{
				responseType: "text" as "json",
			}
		);
	}
	deleteArchitecte(idArchitecte: any): Observable<string> {
		return this.http.delete<string>(this.architecte + idArchitecte, {
			responseType: "text" as "json",
		});
	}
	validerComissionFinance(id, nt: any, nf: any, ne: any): Observable<string> {
		const valideCommisionFinance: ValideCommisionFinance = {
			id: id,
			nt: nt,
			nf: nf,
			ne: ne,
		};
		console.log(valideCommisionFinance);
		return this.http.post<string>(
			this.architecte + "validerComissionFinance",
			valideCommisionFinance,
			{ responseType: "text" as "json" }
		);
	}

	imprimerAvis(id: any, idArchitect: any) {
		return this.http.get(
			this.baseUrl6 +
				"generateInviteArchitecte/" +
				id +
				"/" +
				idArchitect,
			{
				responseType: "arraybuffer" as "json",
			}
		);
	}
	imprimerAvisEcarte(id: any, idArchitect: any) {
		return this.http.get(
			this.baseUrl6 +
				"generateEcarteArchitecte/" +
				id +
				"/" +
				idArchitect,
			{
				responseType: "arraybuffer" as "json",
			}
		);
	}
	imprimerAvisAccepter(id: any, idArchitect: any) {
		return this.http.get(
			this.baseUrl6 +
				"generateAccepteArchitecte/" +
				id +
				"/" +
				idArchitect,
			{
				responseType: "arraybuffer" as "json",
			}
		);
	}

	motifDeRejet(id: any, motif: any): Observable<string> {
		let motifDeRejet: MotifDeRejet = {
			id: id,
			motifDeRejet: motif,
		};
		return this.http.post<string>(
			this.architecte + "motifRejet",
			motifDeRejet,
			{ responseType: "text" as "json" }
		);
	}
}
