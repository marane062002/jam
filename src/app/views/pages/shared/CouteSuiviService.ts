import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
@Injectable({
	providedIn: "root",
})
export class CouteSuiviService {
	
	private baseUrl = environment.marcheUrl + "/MarcheCouteSuivi/";
    constructor(private http: HttpClient) { }
    save(convention:any){
		return this.http.post<any[]>(this.baseUrl+"new",convention,{responseType: 'text' as 'json'});
	}
	
	all( id){
		return this.http.get<any[]>(this.baseUrl+"all/"+id);
	}
    findById(id:number){
		return this.http.get<any[]>(this.baseUrl+"details/"+id);
	}
	delete(id){
		return this.http.delete(this.baseUrl+"delete/"+id,{responseType: 'text' as 'json'});
	}

}