import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { DatePipe } from '@angular/common';
import { Observable } from "rxjs";
@Injectable({
	providedIn: "root",
})
export class ConventionMarcheService {
	
	private baseUrl = environment.marcheUrl + "/MarcheConvention/";
	private baseUrl1 = environment.API_ALFRESCO_URL + "/MarcheConvention";
    constructor(private http: HttpClient) { }
	searchConventionsByMontantRange(minMontant: number, maxMontant: number): Observable<any[]> {
		const params = new HttpParams()
		  .set('minMontant', minMontant.toString())
		  .set('maxMontant', maxMontant.toString());
	
		return this.http.get<any[]>(`${this.baseUrl}search`, { params });
	  }

	  getconventionBySousProjet(idSp): Observable<any[]> {
		
		return this.http.get<any[]>(`${this.baseUrl}getconventionBySousProjet/${idSp}`);
	  }
	  getConventionsByPartiePreneurs(partiePreneurIds: number[]): Observable<any> {
		const url = `${this.baseUrl}byPartiePreneurs?partiePreneurIds=${partiePreneurIds.join(',')}`;
		return this.http.get(url);
	  }

	  searchByPartiePreneursAndMontantRange(partiePreneurIds: number[],minMontant:any,maxMontant:any): Observable<any> {
		const url = `${this.baseUrl}searchByPartiePreneursAndMontantRange?partiePreneurIds=${partiePreneurIds.join(',')}&minMontant=${minMontant}&maxMontant=${maxMontant}`;
		return this.http.get(url);
	  }
	downoldFile(alfresco_id){
	 	const options = {
			
			responseType: 'arraybuffer' as 'json'
		  }; 
		
		  this.http.get(this.baseUrl1+'/'+alfresco_id, options)
			.subscribe((data: any) => {
			  const blob = new Blob([data], { type: 'application/pdf' });
			  const url = window.URL.createObjectURL(blob);
			  window.open(url);
			});
		}
	
    save(convention:any){
		return this.http.post<any>(this.baseUrl+"new",convention,{responseType: 'text' as 'json'});
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
	getByIdFiles(f): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1 + "/Allpjs/" + f);
	}



}