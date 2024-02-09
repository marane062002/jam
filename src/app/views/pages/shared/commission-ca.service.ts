import { ParticipantExterneCommissionCA } from "./../marche/models/participant-externe-commission-c-a";
import { ParticipantInterneCommissionCA } from "./../marche/models/participant-interne-commission-c-a";
import { CommissionCA } from "./../marche/models/commission-c-a";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class CommissionCaService {
	private consultationArchitectural = environment.marcheUrl + "/ca/";
	private architecte = environment.marcheUrl + "/architecte/";
	private journaux = environment.marcheUrl + "/journaux/";
	private commisionCA = environment.marcheUrl + "/commission-ca/";
	private baseUrl1 = environment.API_ALFRESCO_URL + "/PjAoG";
	private baseUrl3 = environment.API_ALFRESCO_URL + "/PjMarche";
	private baseUrl4 = environment.API_ALFRESCO_URL + "/PjBC";
	private baseUrl5 = environment.marcheUrl + "/Config/";
	private baseUrl6 = environment.marcheUrl + "/Reports/";
	constructor(private http: HttpClient) {}

	getCommisionCaById(id: any): Observable<CommissionCA[]> {
		return this.http.get<CommissionCA[]>(this.commisionCA + id, {
			responseType: "text" as "json",
		});
	}

	addCommission(commissionCA: CommissionCA): Observable<CommissionCA> {
		return this.http.post<CommissionCA>(this.commisionCA, commissionCA, {
			responseType: "text" as "json",
		});
	}
	addParticipantInterne(
		list: any
	): Observable<ParticipantInterneCommissionCA[]> {
		console.log(list);
		return this.http.post<ParticipantInterneCommissionCA[]>(
			this.commisionCA + "ajouterParticipantInterneCommissionCA",
			list,
			{
				responseType: "text" as "json",
			}
		);
	}

	addParticipantExterne(
		list: any
	): Observable<ParticipantExterneCommissionCA[]> {
		console.log(list);
		return this.http.post<ParticipantExterneCommissionCA[]>(
			this.commisionCA + "ajouterParticipantExterneCommissionCA",
			list,
			{
				responseType: "text" as "json",
			}
		);
	}

	printPVCommissionFinancier(id: any) {
		return this.http.get(
			this.baseUrl6 + "generatePVCommissionFinancier/" + id,
			{
				responseType: "arraybuffer" as "json",
			}
		);
	}
	// abderrahim saybari 
	printPVCommissionTechnique(id: any) {
		return this.http.get(
			this.baseUrl6 + "generatePVCommissionTechnique/" + id,
			{
				responseType: "arraybuffer" as "json",
			}
		);
	}
	printPVCommissionJury(id: any) {
		return this.http.get(this.baseUrl6 + "generatePVCommissionJury/" + id, {
			responseType: "arraybuffer" as "json",
		});
	}

	getCommissionFinance(id: any): Observable<CommissionCA> {
		return this.http.get<CommissionCA>(
			this.commisionCA + "getCommissionFinnace/" + id,
			{
				responseType: "text" as "json",
			}
		);
	}
}
