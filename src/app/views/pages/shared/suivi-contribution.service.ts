import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuiviContributionService {


	private baseUrl = environment.marcheUrl + "/suiviConsrubution/";
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
