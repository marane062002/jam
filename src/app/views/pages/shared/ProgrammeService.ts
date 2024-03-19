import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { DatePipe } from '@angular/common';
import { Observable } from "rxjs";
@Injectable({
	providedIn: "root",
})
export class ProgrammeService {

	private baseUrl = environment.marcheUrl + "/MarcheProgramme/";
	private baseUrl1 = environment.API_ALFRESCO_URL + "/MarcheProgramme";

	constructor(private http: HttpClient) { }
	save(convention: any) {
		return this.http.post<any[]>(this.baseUrl + "new", convention, { responseType: 'text' as 'json' });
	}

	getByIdFiles(f: number): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1 + "/Allpjs/" + f);
	}

	deleteByIdFiles(f): Observable<any> {
		return this.http.delete<Observable<any>>(this.baseUrl1 + "/" + f);
	}

	downoldFile(alfresco_id, a) {
		const options = {

			responseType: 'arraybuffer' as 'json'
		};
		this.http.get(this.baseUrl1 + '/' + alfresco_id, options)
			.subscribe((data: any) => {
				if (a == 'pdf.svg') {
					const blob = new Blob([data], { type: 'application/pdf' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				else if (a == 'png.svg') {
					const blob = new Blob([data], { type: 'image/png' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				if (a == 'xls.svg') {
					const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				if (a == 'doc.svg') {
					const blob = new Blob([data], { type: 'application/msword' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				if (a == 'jpg.svg') {
					const blob = new Blob([data], { type: 'image/jpeg' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				if (a == 'csv.svg') {
					const blob = new Blob([data], { type: 'text/csv' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}

			});
	}

	nouvellepj(v, id, sModule) {
		if (v.length != 0) {
			const formda: FormData = new FormData();
			for (var i = 0; i < v.length; i++) {
				//console.log("File service : " + v[i]);
				formda.append("file", v[i]);
			}
			formda.append("id", id);
			formda.append("sModule", sModule);
			return this.http.post<any>(
				this.baseUrl1 + "/multiplefileupload",
				formda, { responseType: 'blob' as 'json' }
			);
		}
	}
	getByI

	all() {
		return this.http.get<any[]>(this.baseUrl + "all");
	}
	Pagination(page, size) {
		return this.http.get<any[]>(this.baseUrl + "?page=" + page + "&size=" + size);
	}
	finAllByCode(code: string) {
		return this.http.get<any[]>(this.baseUrl + "all/code/" + code);
	}

	findByCodeProjet(code: string) {
		return this.http.get<any[]>(this.baseUrl + "codeProjet/" + code);
	}


	findById(id: number) {
		return this.http.get<any[]>(this.baseUrl + "details/" + id);
	}
	delete(id) {
		return this.http.delete(this.baseUrl + "delete/" + id, { responseType: 'text' as 'json' });
	}
	research(page, size, searchDto: any) {
		return this.http.post<any[]>(this.baseUrl + "?page=" + page + "&size=" + size, searchDto);
	}

	research1(year: any, page, size) {
		return this.http.get<any[]>(this.baseUrl + "byDate/" + year + "?page=" + page + "&size=" + size);
	}
	
	research2(year: any, page, size) {
		return this.http.get<any[]>(this.baseUrl + "byDateFin/" + year + "?page=" + page + "&size=" + size);
	}


	research3(year1: any, year2: any, page, size) {
		return this.http.get<any[]>(this.baseUrl + "byDateAndDateFin/" + year1 + "/" + year2 + "?page=" + page + "&size=" + size);
	}
	researchByDateDebutAndDateFin(year1: any, year2: any) {
		return this.http.get<any[]>(this.baseUrl + "byDateDebutAndDateFin/" + year1 + "/" + year2 );
	}

	allChefProjets() {
		return this.http.get<any[]>(this.baseUrl + "chefProjets");
	}



	allChefProjetsAr() {
		return this.http.get<any[]>(this.baseUrl + "chefProjetsAr");
	}



	allOrientationStrategique() {
		return this.http.get<any[]>(this.baseUrl + "orientationStrategique");
	}
	allnameProjet() {
		return this.http.get<any[]>(this.baseUrl + "nameProjet");
	}
	allnameProjetAr() {
		return this.http.get<any[]>(this.baseUrl + "nameProjetAr");
	}
	allObjectifStrategique() {
		return this.http.get<any[]>(this.baseUrl + "objectifStrategique");
	}

	allObjectifOperationnel() {
		return this.http.get<any[]>(this.baseUrl + "objectifOperationnel");
	}

	allLocalisation() {
		return this.http.get<any[]>(this.baseUrl + "localisation");
	}
	allDateDebut() {
		return this.http.get<any[]>(this.baseUrl + "date-debut");
	}
	allDateFin() {
		return this.http.get<any[]>(this.baseUrl + "date-fin");
	}
	allMaitreOuvrage() {
		return this.http.get<any[]>(this.baseUrl + "maitreOuvrage");
	}

	allMaitreOuvrageDelegue() {
		return this.http.get<any[]>(this.baseUrl + "maitreOuvrageDelegue");
	}

	allOrientationStrategiqueAr() {
		return this.http.get<any[]>(this.baseUrl + "orientationStrategiqueAr");
	}

	allObjectifStrategiqueAr() {
		return this.http.get<any[]>(this.baseUrl + "objectifStrategiqueAr");
	}

	allObjectifOperationnelAr() {
		return this.http.get<any[]>(this.baseUrl + "objectifOperationnelAr");
	}

	allLocalisationAr() {
		return this.http.get<any[]>(this.baseUrl + "localisationAr");
	}

	allAxe() {
		return this.http.get<any[]>(this.baseUrl + "axe");
	}

	allAxeAr() {
		return this.http.get<any[]>(this.baseUrl + "axeAr");
	}

	allObjectifStrategiqueByOS(OS: string) {
		return this.http.get<any[]>(this.baseUrl + "objectifStrategiqueByOS/" + OS);
	}

	allObjectifOperationnelByOS(OS: string) {
		return this.http.get<any[]>(this.baseUrl + "objectifOperationnelByOS/" + OS);
	}

	allAxeByOS(OS: string) {
		return this.http.get<any[]>(this.baseUrl + "axeByOS/" + OS);
	}

	allObjectifStrategiqueArByOS(OS: string) {
		return this.http.get<any[]>(this.baseUrl + "objectifStrategiqueArByOS/" + OS);
	}

	allObjectifOperationnelArByOS(OS: string) {
		return this.http.get<any[]>(this.baseUrl + "objectifOperationnelArByOS/" + OS);
	}

	allAxeArByOS(OS: string) {
		return this.http.get<any[]>(this.baseUrl + "axeArByOS/" + OS);
	}
}