import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class TypeMarcheService {
	private baseUrl2 = environment.marcheUrl + "/TypeMarche/";

	constructor(private http: HttpClient) { }

	getAllTypeMarche(): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "all"
		);
	}
		
}
