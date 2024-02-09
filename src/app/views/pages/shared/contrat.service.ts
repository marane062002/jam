import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private baseUrl1 = environment.marcheUrl+'/Contrat/';
	private baseUrl4 = environment.API_ALFRESCO_URL + "/PjContrat";
	private baseUrl6 = environment.marcheUrl + "/Reports/";

  constructor(private http : HttpClient) { }

  async getAllContratByCreateurUser(createurUser){

    return await this.http.get<any>(this.baseUrl1 + 'AllContratByCreateurUser/'+createurUser).pipe(delay(300)).toPromise();
  }
  sendOffres(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl1+ 'AddOffreDeposeeContrat',f);
  }

  getOffresByIdContrat(id): Observable<any> {
	return this.http.get<Observable<any>>(this.baseUrl1+'findOffreDeposeeContratByIdContrat/'+id);
  }
  sendContrat(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl1+'AddContrat',f);
  }

  updloadContratFile(v, id, type,sModule,Label): Observable<any> {
		console.log("taille de fichier  :" + v.length);
		const formda: FormData = new FormData();
		for (var i = 0; i < v.length; i++) {
			formda.append("file", v[i]);
		}
		formda.append("id", id);
		formda.append("type", type);
    formda.append("sModule", sModule);

		formda.append("Label", Label);

		console.log("id  :" + id + " / type : " + type);
		return this.http.post<any>(this.baseUrl4 + "/multiplefileupload", formda, { responseType: 'blob' as 'json' });
	}

	deleteContratfiles(id: number): Observable<any> {
		return this.http.delete<any>(this.baseUrl4 + "/" + id);
	}
	getByIdContrat(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1+'show/'+id);
	  }
	  getAllLotMarcheByContrat(idAo): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl1 + "lotMarche/" + idAo
		);
	}

	  getByIdContratFiles(f): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl4 + "/allById/" + f);
	}
	async getAllContrat() {
		return await this.http
			.get<any>(this.baseUrl1 + "All")
			.pipe(delay(300))
			.toPromise();
	}

	updateStatutContrat(obj: any): Observable<any> {
		return this.http.put<any>(this.baseUrl1 + "updateStatutContrat/" + obj.id, obj);
	}

	patchContrat(f): Observable<any> {
		return this.http.patch<Observable<any>>(this.baseUrl1 + "patchContrat", f);
	}

	
	
}
