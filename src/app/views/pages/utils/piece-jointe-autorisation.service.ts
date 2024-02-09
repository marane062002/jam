import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "./../../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class PieceJointeAutorisationService {
	private baseUrl = environment.marcheUrl + "/PieceJointeAcquisition/";
	private baseUrl1 = environment.API_ALFRESCO_URL + "/PieceJointeAcquisition";
	constructor(private http: HttpClient) {}

	downoldFile(alfresco_id) {
		const options = {
			responseType: "arraybuffer" as "json",
		};

		this.http.get(this.baseUrl1 + "/" + alfresco_id, options).subscribe((data: any) => {
			const blob = new Blob([data], { type: "application/pdf" });
			const url = window.URL.createObjectURL(blob);
			window.open(url);
		});
	}

	save(autorisation: any) {
		return this.http.post<any>(this.baseUrl + "new", autorisation, { responseType: "text" as "json" });
	}
	deleteByIdFiles(f): Observable<any> {
		return this.http.delete<Observable<any>>(this.baseUrl1 + "/" + f);
	}

	all() {
		return this.http.get<any[]>(this.baseUrl + "all");
	}
	findById(id: number) {
		return this.http.get<any[]>(this.baseUrl + "details/" + id);
	}
	delete(id) {
		return this.http.delete(this.baseUrl + "delete/" + id, { responseType: "text" as "json" });
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
			return this.http.post<any>(this.baseUrl1 + "/multiplefileupload", formda, { responseType: "blob" as "json" });
		}
	}
	getByIdFiles(f): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1 + "/Allpjs/" + f);
	}
}
