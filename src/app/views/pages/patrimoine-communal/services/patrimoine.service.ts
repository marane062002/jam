import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OrganisationService } from "../../organisation/organisation.service";
import { Observable, forkJoin } from "rxjs";
import { environment } from "../../../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class PatrimoineService {
	private baseUrl = environment.patrimoineUrl;

	private patrimoineUrl = "/patrimoines";
	private origineUrl = "/origines";
	private ssOrigineUrl = "/ssOrigines";
	private mvmlUrl = "/mouvementLs";
	private typetUrl = "/typesTransactions";
	private mvmtUrl = "/mouvementTs";
	private typePatrimoineUrl = "/typesPatrimoines";

	private baseUrl1 = environment.API_ALFRESCO_URL + "/PjPc";


	// private statutProjetUrl = '/statutProjets'
	// private statutPhaseUrl = '/statutPhaseProjets'

	private typeRefFoncierUrl = "/ReferenceFonciers";
	//  private SpecialitePatrimoineUrl ='/specialites'
	private villePatrimoineUrl = "/villePatrimoines";
	private arrondissementUrl = "/arrondissements";
	private locataireUrl = "/locataires";

	constructor(
		private http: HttpClient,
		private orgService: OrganisationService
	) {}

	//**************************Patrimoine**************************** */
	//**********Index*****************/
	public getPatrimoines(): Observable<any> {
		let patrimoines = this.http
			.get(this.baseUrl + this.patrimoineUrl + "/index")
			.toPromise();
		return forkJoin([patrimoines]);
	}
	//************Show***************  */
	public getPatrimoineById(id: number): Observable<any> {
		let patrimoine = this.http
			.get<any>(this.baseUrl + this.patrimoineUrl + "/show/" + id)
			.toPromise();
		return forkJoin([patrimoine]);
	}
	//************Save***************  */
	public savePatrimoine(ressource: Object): Observable<Object> {
		return this.http.post(
			this.baseUrl + this.patrimoineUrl + "/new",
			ressource
		);
	}

	
	deleteByIdFiles(f): Observable<any> {
		return this.http.delete<Observable<any>>(this.baseUrl1 + "/" + f);
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
			return this.http.post<any>(this.baseUrl1 + "/multiplefileupload",
				formda, { responseType: 'blob' as 'json' }
			);
		}
	}

	getAllPjImm(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1 + "/Allpjs/" + id);
	}

	downoldFile(alfresco_id,a){
		const pattern1 = /pdf$/i;
		const pattern2 = /png$/i;
		const pattern3 = /xlsx$/i;
		const pattern4 = /docx$/i;
		const pattern5 = /jpeg$/i;
		const pattern6 = /csv$/i;
		const options = {
		   
		   responseType: 'arraybuffer' as 'json'
		 }; 
	   
		 this.http.get(this.baseUrl1+'/'+alfresco_id, options)
		   .subscribe((data: any) => {
			if (pattern1.test(a)) {
				const blob = new Blob([data], { type: 'application/pdf' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			}
			if (pattern2.test(a)) {
				const blob = new Blob([data], { type: 'image/png' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			}
			if(pattern3.test(a)){
				const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			}
			if(pattern4.test(a)){
				const blob = new Blob([data], { type: 'application/msword' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			}
			if(pattern5.test(a)){
				const blob = new Blob([data], { type: 'image/jpeg' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			}
			if(pattern6.test(a)){
				const blob = new Blob([data], { type: 'text/csv' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			}
		   });
	   }

	//************Delete***************  */
	public deletePatrimoine(id: number): Observable<any> {
		return this.http.delete(
			this.baseUrl + this.patrimoineUrl + "/delete/" + id,
			{ responseType: "text" }
		);
	}
	//************Update***************  */
	public updatePatrimoine(ressource: Object, id: number): Observable<Object> {
		return this.http.put(
			this.baseUrl + this.patrimoineUrl + "/edit/" + id,
			ressource
		);
	}
	//**************Data for new patrimoine*************/
	public getDataPatrimoine(): Observable<any> {
		let origines = this.getRessources(this.origineUrl);
		let typesPatrimoine = this.getRessources(this.typePatrimoineUrl);
		let divisions = this.orgService.getRessource("/divisions/index");

		let references = this.getRessources(this.typeRefFoncierUrl);
		//         let specialites = this.getRessources(this.SpecialitePatrimoineUrl);
		let villes = this.getRessources(this.villePatrimoineUrl);
		let arrondissements = this.getRessources(this.arrondissementUrl);
		//        return forkJoin([origines,typesPatrimoine,divisions,references,specialites,villes,arrondissements]);
		return forkJoin([
			origines,
			typesPatrimoine,
			divisions,
			references,
			villes,
			arrondissements,
		]);
	}
	//************ Statistique***************  */
	public getSatatPAermoineByCategorie(categorie: number[]): Observable<any[]> {
		return this.http.get<any[]>(this.baseUrl + this.patrimoineUrl + "/stat/"+categorie);
	}
	public getSatatPAermoineByCategorieAndArrondisment(categorie: number[],arrondissement: number[]): Observable<any[]> {
		return this.http.get<any[]>(this.baseUrl + this.patrimoineUrl + "/stat/"+categorie+"/"+arrondissement);
	}public getSatatPAermoineByTranche(categorie: number[]): Observable<any[]> {
		return this.http.get<any[]>(	environment.biencommunalUrl+ "/beneficiaires/stat/tanche/"+categorie);
	}
	public getSatatCountCatgorieVoieByType(categorie: number[]): Observable<any[]> {
		return this.http.get<any[]>(this.baseUrl + this.patrimoineUrl + "/stat/CountCatgorieVoieByType/"+categorie);
	}
	public findCountClasseMarche(): Observable<any[]> {
		return this.http.get<any[]>(this.baseUrl + this.patrimoineUrl + "/stat/findCountClasseMarche");
	}
	public findCountStatutGroup(): Observable<any[]> {
		return this.http.get<any[]>(this.baseUrl + this.patrimoineUrl + "/stat/findCountStatutGroup");
	}
	
	getTotalSuperficieByType(types: number[]): Observable<any[]> {
		return this.http.get<any[]>(this.baseUrl + this.patrimoineUrl + "/stat/getTotalSuperficieByType/"+types);
	}

	public getInitformPatrimoine(): Observable<any> {
		return this.getInitForm(this.patrimoineUrl);
	}

	//**************************MvMLocation**************************** */

	//************Show***************  */
	public getMvmLById(id: number): Observable<any> {
		let mvmL = this.http
			.get<any>(this.baseUrl + this.mvmlUrl + "/show/" + id)
			.toPromise();
		return forkJoin([mvmL]);
	}
	//************Save***************  */
	public saveMvmL(ressource: Object): Observable<Object> {
		return this.http.post(this.baseUrl + this.mvmlUrl + "/new", ressource);
	}
	//************Mvm Locations ByPatrimoine**************************** */
	public getMvmLbyPatrimoine(id): Observable<any> {
		let mvmLs = this.http.get<any>(
			this.baseUrl + this.mvmlUrl + "/patrimoine/" + id
		);
		return forkJoin([mvmLs]);
	}
	//*******************delete**************** */
	public deleteMvmL(id: number): Observable<any> {
		return this.http.delete(this.baseUrl + this.mvmlUrl + "/delete/" + id, {
			responseType: "text",
		});
	}
	//************Update***************  */
	public updateMvmL(ressource: Object, id: number): Observable<Object> {
		return this.http.put(
			this.baseUrl + this.mvmlUrl + "/edit/" + id,
			ressource
		);
	}
	//*******************Locataire Data for new MVMT**************** */
	async getDataMVML() {
		let locataires = await this.http.get<any>(
			environment.biencommunalUrl + this.locataireUrl + "/index"
		);
		return forkJoin([locataires]).toPromise();
	}
	//**************************MvMTransaction**************************** */

	//************Show***************  */
	public getMvmTById(id: number): Observable<any> {
		let mvmT = this.http
			.get<any>(this.baseUrl + this.mvmtUrl + "/show/" + id)
			.toPromise();
		return forkJoin([mvmT]);
	}
	//************Save***************  */
	public saveMvmT(ressource: Object): Observable<Object> {
		return this.http.post(this.baseUrl + this.mvmtUrl + "/new", ressource);
	}
	//***********************type transaction */
	public getTypeTs(): Observable<any> {
		return this.http.get(this.baseUrl + this.typetUrl + "/index");
	}

	//************Mvm Transactions ByPatrimoine**************************** */
	public getMvmTbyPatrimoine(id): Observable<any> {
		let mvmTs = this.http.get<any>(
			this.baseUrl + this.mvmtUrl + "/patrimoine/" + id
		);
		return forkJoin([mvmTs]);
	}

	//*******************delete**************** */
	public deleteMvmT(id: number): Observable<any> {
		return this.http.delete(this.baseUrl + this.mvmtUrl + "/delete/" + id, {
			responseType: "text",
		});
	}
	//************Update***************  */
	public updateMvmT(ressource: Object, id: number): Observable<Object> {
		return this.http.put(
			this.baseUrl + this.mvmtUrl + "/edit/" + id,
			ressource
		);
	}

	//**************************Ressources**************************** */
	//**********Index*****************/
	public getRessources(url): Observable<any> {
		return this.http.get(this.baseUrl + url + "/index");
	}
	//**************getSsorigines****************** */
	getSsOriginesByIdOrigine(id): Observable<any> {
		return this.http.get(
			this.baseUrl + this.ssOrigineUrl + "/origineId/" + id
		);
	}
	//**********InitForm*****************/
	public getInitForm(url): Observable<any> {
		return this.http.get(this.baseUrl + url + "/initform");
	}
}
