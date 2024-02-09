import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { environment } from "../../../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class ImmatriculationService {
	private baseUrl = environment.immatriculationUrl;

	private immUrl = "/immatriculations";

	private typeUrl = "/typesBiens";
	private statutProjetUrl = "/statutProjets";
	private etatUrl = "/etatdossiers";
	private baseUrl1 = environment.API_ALFRESCO_URL + "/PjImm";

	constructor(private http: HttpClient) {}

	//**************************Immatriculation**************************** */
	//**********Index*****************/
	public getImmatriculations(): Observable<any> {
		let immatriculations = this.http
			.get(this.baseUrl + this.immUrl + "/index")
			.toPromise();
		return forkJoin([immatriculations]);
	}
	//************Show***************  */
	public getImmatriculationById(id: number): Observable<any> {
		let immatriculation = this.http
			.get<any>(this.baseUrl + this.immUrl + "/show/" + id)
			.toPromise();
		return forkJoin([immatriculation]);
	}
	//************Show***************  */
	public saveImmatriculation(ressource: Object): Observable<any> {
		return this.http.post(this.baseUrl + this.immUrl + "/new", ressource);
	}

	public deleteImmatriculation(id: number): Observable<any> {
		return this.http.delete(this.baseUrl + this.immUrl + "/delete/" + id, {
			responseType: "text",
		});
	}
	getAllPjImm(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1 + "/Allpjs/" + id);
	}
	nouvellepj(v, id, typeS, sModule) {
		if (v.length != 0) {
			const formda: FormData = new FormData();
			for (var i = 0; i < v.length; i++) {
				//console.log("File service : " + v[i]);
				formda.append("file", v[i]);
			}
			formda.append("id", id);
			formda.append("type", typeS);
			formda.append("sModule", sModule);
			return this.http.post<any>(this.baseUrl1 + "/multiplefileupload",
				formda, { responseType: 'blob' as 'json' }
			);
		}
	}
	delete(id){
		return this.http.get<any>(this.baseUrl1 + "/delete/"+id, { responseType: 'string' as 'json' });
	}
	nouvellepj1(v, id, typeS, sModule, idAlfresco) {
		const formda: FormData = new FormData();
		if (v!=null && v.length != 0) {
			for (var i = 0; i < v.length; i++) {
				//console.log("File service : " + v[i]);
				formda.append("file", v[i]);
			}
		}
			formda.append("id", id);
			formda.append("idAlfresco", idAlfresco);
			formda.append("type", typeS);
			formda.append("sModule", sModule);
			return this.http.put<any>(this.baseUrl1 + "/multiplefileupload",
				formda, { responseType: 'blob' as 'json' }
			);
		
	}
	//************Delete***************  */
	/* public deletePrestataire(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.prestataireUrl+'/delete/'+ id, { responseType: 'text' });
        } */
	//************Update***************  */
	/*  public updatePrestataire(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.prestataireUrl+'/edit/'+id, ressource);
        } */

	//**************Data for new project*************/
	public getDataImmatriculation(): Observable<any> {
		let types = this.http
			.get(this.baseUrl + this.typeUrl + "/index")
			.toPromise();
		let etats = this.http
			.get(this.baseUrl + this.etatUrl + "/index")
			.toPromise();
		return forkJoin([types, etats]);
	}

	public getInitFormForCreateImmatriculation(): Observable<any> {
		let types = this.http
			.get(this.baseUrl + this.immUrl + "/initForm")
			.toPromise();
		return forkJoin([types]);
	}
}
