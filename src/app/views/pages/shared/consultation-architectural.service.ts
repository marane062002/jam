import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ConsultationArchitecturale } from "../marche/models/consultation-architecturale";

@Injectable({
	providedIn: "root",
})
export class ConsultationArchitecturalService {
	private consultationArchitectural = environment.marcheUrl + "/ca/";
	private architecte = environment.marcheUrl + "/architecte/";
	private journaux = environment.marcheUrl + "/journaux/";
	private baseUrl1 = environment.API_ALFRESCO_URL + "/PjAoG";
	private baseUrl3 = environment.API_ALFRESCO_URL + "/PjMarche";
	private baseUrl4 = environment.API_ALFRESCO_URL + "/PjBC";
	private baseUrl5 = environment.marcheUrl + "/Config/";
	private baseUrl6 = environment.marcheUrl + "/Reports/";
	constructor(private http: HttpClient) {}

	getAll(): Observable<ConsultationArchitecturale[]> {
		return this.http.get<ConsultationArchitecturale[]>(
			this.consultationArchitectural,
			{ responseType: "text" as "json" }
		);
	}
	getAll2(): Observable<ConsultationArchitecturale[]> {
		return this.http.get<ConsultationArchitecturale[]>(
			this.consultationArchitectural,
			
		);
	}

	getConsultationBYId(id: any): Observable<ConsultationArchitecturale> {
		return this.http.get<ConsultationArchitecturale>(
			this.consultationArchitectural + id,
			{ responseType: "text" as "json" }
		);
	}
	getConsultationByNumCA(num?:string){
		return this.http.get<ConsultationArchitecturale>(
			this.consultationArchitectural +"findByNumCa/"+ num,
			
		);
	}

	addConsultation(
		consulation: ConsultationArchitecturale
	): Observable<ConsultationArchitecturale> {
		return this.http.post<ConsultationArchitecturale>(
			this.consultationArchitectural,
			consulation,
			{ responseType: "text" as "json" }
		);
	}

	editerConsultation(
		consulation: ConsultationArchitecturale
	): Observable<ConsultationArchitecturale> {
		return this.http.post<ConsultationArchitecturale>(
			this.consultationArchitectural,
			consulation,
			{ responseType: "text" as "json" }
		);
	}
	deleteConsultation(id: any): Observable<string> {
		return this.http.delete<string>(this.consultationArchitectural + id, {
			responseType: "text" as "json",
		});
	}

	valideParPresident(id: any, note: string): Observable<number> {
		return this.http.get<number>(
			this.consultationArchitectural +
				"valideParPresident/" +
				id +
				"/" +
				note,
			{ responseType: "text" as "json" }
		);
	}
	valideParDGS(id: any, note: string): Observable<number> {
		return this.http.get<number>(
			this.consultationArchitectural + "valideParDGS/" + id + "/" + note,
			{ responseType: "text" as "json" }
		);
	}
	valideParTresorier(id: any, note: string): Observable<number> {
		return this.http.get<number>(
			this.consultationArchitectural +
				"valideParTresorier/" +
				id +
				"/" +
				note,
			{ responseType: "text" as "json" }
		);
	}

	printAvisAR(id: any) {
		return this.http.get(this.baseUrl6 + "generateAvisARCA/" + +id, {
			responseType: "arraybuffer" as "json",
		});
	}
	printAvisFR(id: any) {
		return this.http.get(this.baseUrl6 + "generateAvisFRCA/" + +id, {
			responseType: "arraybuffer" as "json",
		});
	}

	printBordereau(id: any) {
		return this.http.get(this.baseUrl6 + "printBordereau/" + id, {
			responseType: "arraybuffer" as "json",
		});
	}

	printFicheOuvertureDesPlis(id: any) {
		return this.http.get(
			this.baseUrl6 + "generateFicheOuvertureDesPlis/" + id,
			{
				responseType: "arraybuffer" as "json",
			}
		);
	}
	printFinCommision(id: any) {
		return this.http.get(this.baseUrl6 + "generatePVCommissionFin/" + id, {
			responseType: "arraybuffer" as "json",
		});
	}

	printRapport(id: any) {
		return this.http.get(this.baseUrl6 + "generateRapportFinCA/" + id, {
			responseType: "arraybuffer" as "json",
		});
	}
}
