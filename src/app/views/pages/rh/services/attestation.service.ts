import { Injectable } from '@angular/core';

import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { PersonnelService } from './personnel.service';


@Injectable({
  providedIn: 'root'
})
export class AttestationService {


  private baseUrl = environment.attestationUrl;
  private pjUrl = environment.API_ALFRESCO_URL;



  constructor(private http:HttpClient
      ) { }


  public getRessource(url): Observable <any>{

    let demandes = this.http.get(this.baseUrl+url).toPromise();
    return forkJoin([demandes]);
  }

  public getRessourceById(id: number,url): Observable<any> {
    return this.http.get<any>(this.baseUrl+url + id);
  }
  async postRessource(ressource: Object,url) {
    return await this.http.post<any>(this.baseUrl+url, ressource).toPromise();
  }

 public deleteRessource(id: number,url): Observable<any> {
    return this.http.delete(this.baseUrl+url + id, { responseType: 'text' });
  }

  public updateRessource(ressource: Object,id: number,url): Observable<Object> {
    return this.http.put(this.baseUrl+url+id, ressource);
  }
  public cancelDemande(ressource: Object,id: number): Observable<Object> {
    return this.http.put(this.baseUrl+'/demandes/cancel/'+id, ressource);
  }
  public validateDemande(ressource: Object,id: number): Observable<Object> {
    return this.http.put(this.baseUrl+'/demandes/validate/'+id, ressource);
  }
  public getType(): Observable<any>{

    let types = this.http.get(this.baseUrl+'/typeAttestations/index').toPromise()
    return forkJoin([types]);
  }
  async getDataValidate(id){

    let demande = await this.http.get(this.baseUrl+'/demandes/show/'+ id)
    let statuts = await this.http.get(this.baseUrl+'/statutAttestations/index')

    return forkJoin([demande,statuts]).toPromise();
}

public getAttestationByPersonnel(id: number): Observable<any> {
  return this.http.get<any>(this.baseUrl+'/demandes/personnel/' + id);
}

async getDemandeById(id){
return await this.http.get<any>(this.baseUrl+'/demandes/show/' + id).toPromise();
}
  // ====================================
	// Gestion files
	// ====================================

	async updloadFileAttestation(v, id) {
    console.log("taille de fichier attestation :" + v.length);
    console.log('id demande: '+ id)
		const formda: FormData = new FormData();
		for (var i = 0; i < v.length; i++) {
			formda.append("file", v[i]);
		}
		formda.append("id", id);
		return await this.http.post<any>(
			this.pjUrl + "/PjAttestations/multiplefile",
			formda
		).toPromise();
	}

	getFilesAttestationById(id): Observable<any> {
		return this.http.get<any>(this.pjUrl + "/PjAttestations/show/" + id);
  }

  async getDataShowAttestation(id){
    let demande = await this.http.get<any>(this.baseUrl+'/demandes/show/' + id);
    //let pj = await this.http.get<any>(this.pjUrl + "/PjAttestations/index/" + id);
	//return forkJoin([demande,pj]).toPromise()
    return forkJoin([demande]).toPromise()
  }

 /*  public openFile(idAlfresco){
    return this.http.get(this.pjUrl + "/PjAttestations/" + idAlfresco);
  } */

  printInvoice(): Observable<any> {

	const httpOptions = {
	  //responseType: 'arraybuffer' as 'json'
	  responseType  : 'blob' as 'json'        //This also worked
	};

	return this.http.get<any>(this.baseUrl + "/print/1", httpOptions);
	//return this.http.get<any>(this.baseUrl + '/print/1', httpOptions);
	 }

	 PrintGenerator(id){
		const httpOptions = {
            responseType: 'arraybuffer' as 'json'
		};
		return this.http.get<any[]>(this.baseUrl + "/print/" + id, httpOptions);
	 }

}
