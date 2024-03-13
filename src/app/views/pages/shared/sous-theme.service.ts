import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { delay } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
	providedIn: "root",
})
export class sousThemeService {

    private baseUrl = environment.marcheUrl + "/Sous_Theme/";
    constructor(private http: HttpClient, private datePipe: DatePipe) { }

 
	async findAllByPages() {

		return await this.http.get<any>(this.baseUrl + "All-Pages")
			.pipe(delay(300))
			.toPromise();
	}
    Pagination(page, size) {
        return this.http.get<any[]>(this.baseUrl + "All-Pages?page=" + page + "&size=" + size);
    }
	save(f){
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddSousTheme",
			f
		);	}

		findById(id): Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl+'findById/'+id);
		  }
		  
		  findByTheme_Id(id): Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl+'findByTheme_Id/'+id);
		  }
	delete(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl + "DeleteSousTheme/" + id);
	}
}