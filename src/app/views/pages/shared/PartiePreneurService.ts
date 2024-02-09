import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { DatePipe } from '@angular/common';
@Injectable({
	providedIn: "root",
})
export class PartiePreneurService {
	
	private baseUrl = environment.marcheUrl + "/MarchePP/";
    constructor(private http: HttpClient) { }
    save(convention:any){
		return this.http.post<any[]>(this.baseUrl+"new",convention,{responseType: 'text' as 'json'});
	}
	
	all(){
		return this.http.get<any[]>(this.baseUrl+"all");
	}
    findById(id:number){
		return this.http.get<any[]>(this.baseUrl+"details/"+id);
	}
	delete(id){
		return this.http.delete(this.baseUrl+"delete/"+id,{responseType: 'text' as 'json'});
	}


}