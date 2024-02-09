import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { DatePipe } from '@angular/common';
@Injectable({
	providedIn: "root",
})
export class ProgrammePhase {
	
	private baseUrl = environment.marcheUrl + "/ProgrammePhaseBD/";
    constructor(private http: HttpClient) { }
    save(convention:any){
		return this.http.post<any[]>(this.baseUrl+"new",convention,{responseType: 'text' as 'json'});
	}
	
	all(){
		return this.http.get<any[]>(this.baseUrl+"all");
	}
	finAllByCode(code:string){
		return this.http.get<any[]>(this.baseUrl+"all/code/"+code);
	}

	
    findById(id:number){
		return this.http.get<any[]>(this.baseUrl+"details/"+id);
	}
    getPhases(){
		return this.http.get<any[]>(this.baseUrl+"Phase");
	}

    
}