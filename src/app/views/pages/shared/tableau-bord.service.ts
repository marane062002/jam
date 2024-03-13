import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { delay } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
	providedIn: "root",
})
export class TableauBordService {

	private baseUrl = environment.marcheUrl + "/TableauBord/";
	constructor(private http: HttpClient, private datePipe: DatePipe) { }





	save(f) {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddTableauBord",
			f
		);
	}
	async findAllByPages() {

		return await this.http.get<any>(this.baseUrl + "All-Pages")
			.pipe(delay(300))
			.toPromise();
	}
	Pagination(page, size) {
		return this.http.get<any[]>(this.baseUrl + "All-Pages?page=" + page + "&size=" + size);
	}
	research(page, size, searchDto: any) {
		return this.http.post<any[]>(this.baseUrl + "?page=" + page + "&size=" + size, searchDto);
	}
		  
	delete(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl + "Delete/" + id);
	}
}