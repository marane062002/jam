import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { DatePipe } from '@angular/common';
import { Observable } from "rxjs";
@Injectable({
	providedIn: "root",
})
export class ProgrammeRetroService {

	private baseUrl = environment.marcheUrl + "/MarcheProgrammeRetro/";

	constructor(private http: HttpClient) { }
	save(programmeRetro: any) {
		return this.http.post<any[]>(this.baseUrl + "new", programmeRetro, { responseType: 'text' as 'json' });
	}

	all() {
		return this.http.get<any[]>(this.baseUrl + "all");
	}
	Pagination(page, size) {
		return this.http.get<any[]>(this.baseUrl + "?page=" + page + "&size=" + size);
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

	findByEmplacement(emplacement: string) {
		return this.http.get<any[]>(this.baseUrl + "all/emplacement/" + emplacement);
	}

	findByConsistance(consistance: string) {
		return this.http.get<any[]>(this.baseUrl + "all/consistance/" + consistance);
	}


}