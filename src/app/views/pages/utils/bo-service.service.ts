import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable, forkJoin, throwError } from "rxjs";
import { environment } from "./../../../../environments/environment";
import * as XLSX from "xlsx";
import * as $ from "jquery";
import { DatePipe } from '@angular/common';
import { retry, catchError } from 'rxjs/operators';
import { Sort } from "@angular/material";
import { Pageable } from "./pagination/pageable";
import { Page } from "./pagination/page";
import { SaerchcourrierEntrantsDTO } from "./class/saerchcourrier-entrants-dto";
import { createRequestOption } from "../gestion-parc-auto/common/request/request-util";

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const BACKEND_URL = environment.API_BUREAU_ORDRE_URL;
const BACKEND_URL_P = environment.personnelUrl;
const GED_URL = environment.API_ALFRESCO_URL;
export type EntityResponseType = HttpResponse<any>;

@Injectable({
	providedIn: "root",
})
export class BoServiceService {
	public apiURL = `${BACKEND_URL}`;
	public apiURLP = `${BACKEND_URL_P}`;
	public AlfrescoURL = `${GED_URL}`;
	numF: any;

	constructor(private http: HttpClient, private datePipe: DatePipe) { }

	// get division & servive & peesonnel

	async getRessourceById(id: number, url) {
		return await this.http.get<any>(this.apiURL + url + id).toPromise();
	}
	async getPersonnelById(id: number) {
		return await this.http.get<any>(this.apiURL + '/personnels/show/' + id).toPromise();

	}
	updateSatutCourrie(id: number, status) {
		return this.http.get<any>(this.apiURL + "/courrierEntrants/edit/" + id + "/" + status);
	}
	nouvellepj(v, id, typeS, sModule, username) {

		const formda: FormData = new FormData();
		if (v != null) {
			if (v.length != 0) {
				for (var i = 0; i < v.length; i++) {
					//console.log("File service : " + v[i]);
					formda.append("file", v[i]);
				}
			}
		}

		formda.append("id", id);
		formda.append("type", typeS);
		formda.append("sModule", sModule);
		formda.append("user", username);

		return this.http.post<any>(this.AlfrescoURL + "/PJCourrierController/multiplefile",
			formda, { responseType: 'blob' as 'json' }
		);

	}

	// =====================================
	getFileByIdCourrier(f): Observable<any> {
		return this.http.get<Observable<any>>(
			this.AlfrescoURL + "/PJCourrierController/Allpjs/" + f
		);
	}
	getFileByIdCourriersortant(f): Observable<any> {
		return this.http.get<Observable<any>>(
			this.AlfrescoURL + "/PjCourriersSortants/" + f
		);
	}
	public getData(): Observable<any> {
		let type = this.http.get(this.apiURL + "/typeCourriers/index");
		let origineCE_PM = this.http.get(this.apiURL + "/origineCourierEntrants/type/pm");
		let topOrigineCE_PM = this.http.get(this.apiURL + "/origineCourierEntrants/top10/pm");
		//let origineCE_PP = this.http.get(this.apiURL + "/origineCourierEntrants/type/pp");
		let criticite = this.http.get(this.apiURL + "/criticiteCourriers/index");
		let division = this.http.get(this.apiURL + "/divisions/index");
		let traite = this.http.get(this.apiURL + "/statusCourriers/index");
		//let origineCS = this.http.get(this.apiURL + "/origineCourrierSortants/index");
		return forkJoin([type, origineCE_PM, topOrigineCE_PM, criticite, division, traite]);
	}
	// ====================================
	// methodes service statistiques
	// ====================================
	getNbrCourrierEntrantByParams(origine: any[], type: any[], dateD, dateF): Observable<any[]> {

		var Saerch = new SaerchcourrierEntrantsDTO(origine, type, dateD, dateF, null, null);

		console.log(Saerch)
		return this.http.post<any[]>(this.apiURL + "/courrierEntrants/stats/" + origine + "&" + type + "&" + dateD + "&" + dateF, Saerch);
	}

	getNbrCourrierEntrantByParamsdiv(origine: any[], type: any[], dateD, dateF, idDiv: any[], traite: any[]): Observable<any[]> {

		var Saerch = new SaerchcourrierEntrantsDTO(origine, type, dateD, dateF, idDiv, traite);

		console.log(Saerch)
		return this.http.post<any[]>(this.apiURL + "/courrierEntrantsdiv/stats", Saerch);
	}

	getNbrCourrierSortantByParams(type: any[], dateD, dateF): Observable<any[]> {
		var Saerch = new SaerchcourrierEntrantsDTO(null, type, dateD, dateF, null, null);
		return this.http.post<any[]>(this.apiURL + "/courrierSortants/stats/" + type + "&" + dateD + "&" + dateF, Saerch);
	}

	// ====================================
	// methodes service courriers entrants
	// ====================================

	public getDivisionById(url, id: number): Observable<any> {
		return this.http.get<any>(this.apiURL + url + id);
	}

	getAllObject(url): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL + url);
	}
	async getAllObject2(url) {
		return await this.http.get<any[]>(this.apiURL + url).toPromise();
	}

	async getAllObject3(url, pageable: Pageable) {
		let path = this.apiURLP + url 
			+ '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize
			+ '&sort=id,desc'
		return await this.http.get<any[]>(path).toPromise();
	}
	
	getAllObjectById(url, id: number): Observable<any[]> {
		return this.http.get<any[]>(this.apiURL + url + id);
	}
	getAllDestinataireInterneByIdCourrierEntrant(url, id: number, pageable: Pageable): Observable<any[]> {
		let path = this.apiURL + url + id
			+ '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize
			+ '&sort=id,desc'
		return this.http.get<any[]>(path);
	}
	getAllcourrierEntrantsBypersonnelchefId(url, id: number, pageable: Pageable): Observable<any[]> {
		let path = this.apiURL + url + id
			+ '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize
			+ '&sort=id,desc'
		return this.http.get<any[]>(path);
	}

	getObjectById(url, id: number): Observable<any> {
		return this.http.get<any>(this.apiURL + url + id);
	}

	createObject(url, obj: Object): Observable<Object> {
		return this.http.post(this.apiURL + url, obj);
	}

	updateObject(url, obj: any): Observable<any> {
		return this.http.put<any>(this.apiURL + url + obj.id, obj);
	}

	deleteObject(url, id: number): Observable<any> {
		return this.http.delete<any>(this.apiURL + url + id);
	}

	getNumCorrierByAnnee(url, id: String): Observable<any> {
		return this.http.get(this.apiURL + url + id, { responseType: 'text' });
	}
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Qurey service With paginator updated on 03.02.2021 param !: (path: string, pageable: Pageable, sortableColumn: Sort)
	public getAllObjectByPage(path: string, pageable: Pageable)
		: Observable<Page<any>> {
		let url = this.apiURL + path
			+ '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize
			+ '&sort=id,desc'
		return this.http.get<Page<any>>(url);
	}
	// filter & pagination
	public getAllObjectByFilterPage(path: string, filter: string, pageable: Pageable)
		: Observable<Page<any>> {
		let url = this.apiURL + path
			+ '?keyword=' + filter
			+ '&page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize
			+ '&sort=id,desc'
		return this.http.get<Page<any>>(url);
	}
	// filter & pagination with two param
	public filterByRefOrDatePage(path: string, ref, dt, pageable: Pageable)
		: Observable<Page<any>> {
		let url = this.apiURL + path
			+ '?ref=' + ref
			+ '&dt=' + dt
			+ '&page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize
			+ '&sort=id,desc'
		return this.http.get<Page<any>>(url);
	}

	// sort methode ++++++++++++++++++++++++++++++++++++++
	private getSortParameters(sortableColumn: Sort): string {
		if (sortableColumn == null) {
			return '&sort=id,desc';
		}
		return '&sort=' + sortableColumn.active + ',' + sortableColumn.direction;
	}

	// ====================================
	// Upload file
	// ====================================
	updloadFiles(v, id): Observable<any> {
		console.log("taille de fichier :" + v.length);
		console.log('id file ' + id);
		const formda: FormData = new FormData();
			formda.append("file", v);

		formda.append("id", id);
		
		return this.http.post<any>(this.AlfrescoURL + "/PjCourriersEntrants/multiplefile", formda, { responseType: 'blob' as 'json' });
	}
	uploadSejoursScan(data:any,res:any): Observable<EntityResponseType> {
		

		// const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "*");

		return this.http.post<any>(`${this.AlfrescoURL}/PjCourriersEntrants/base64ToFile?id=`+res, data, {
			observe: "response",
			reportProgress: true,
		});
	}
	uploadSejoursScanCS(data:any,res:any): Observable<EntityResponseType> {
		

		// const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "*");

		return this.http.post<any>(`${this.AlfrescoURL}/PjCourriersSortants/base64ToFile?id=`+res, data, {
			observe: "response",
			reportProgress: true,
		});
	}
	uploadSejours(file: File, fileName?: string, data?: any): Observable<EntityResponseType> {
		const formData = new FormData();

		formData.append("file", file);
		formData.append("fulname", fileName);
		formData.append("id", data.id);


		return this.http.post<any>(`${this.AlfrescoURL}upload-sejours`, formData, {
			observe: "response",
			reportProgress: true,
		});
	}
	// ====================================
	// Multiple Upload file / speciale case
	// ====================================
	updloadFilesSC(file, idCE) {
		console.log("taille de fichier :" + file.length);
		for (var i = 0; i < file.length; i++) {
			console.info("ID_COURRIER :: " + idCE + " & File :: " + file[i].name);
			idCE = idCE + 1;
		}
		return console.log("taille de fichier :" + file.length);
	}

	updloadFilesToServer(file, idCE): Observable<any> {
		const formda: FormData = new FormData();
		console.info("fSize :: " + file.size)
		//for (var i = 0; i < file.length; i++) {
		console.info("ID_COURRIER :: " + idCE + " & File :: " + file.name);
		formda.append("file", file);
		formda.append("id", idCE);
		//idCE = idCE +1;
		//}
		return this.http.post<any>(this.AlfrescoURL + "/PjCourriersEntrants/multiplefile", formda, { responseType: 'blob' as 'json' });
	}
	// =====================================
	getByIdCourrierFiles(f): Observable<any> {
		return this.http.get<Observable<any>>(
			this.AlfrescoURL + "/PjCourriersEntrants/Allpjs/" + f
		);
	}

	deletefiles(url, id: number): Observable<any> {
		return this.http.delete<any>(this.AlfrescoURL + url + id);
	}
	// ==================== pour le test
	updloadFiles2(v, id): Observable<any> {
		const formda: FormData = new FormData();
			formda.append("file", v);
		
		formda.append("id", id);
		return this.http.post<any>(
			this.AlfrescoURL + "/PjCourriersSortants/multiplefile",
			formda, { responseType: 'blob' as 'json' }
		);
	}

	getByIdCourrierFiles2(f): Observable<any> {
		return this.http.get<Observable<any>>(
			this.AlfrescoURL + "/PjCourriersSortants/Allpjs/" + f
		);
	}

	// export data as excel file
	exportToExcel(tableId: string, name?: string) {
		let now = new Date();
		let timeSpan = this.datePipe.transform(now, "ddMMyyyyHHmmss");
		//let timeSpans = new Date().toISOString();
		let prefix = name;
		let fileName = `${prefix}-${timeSpan}`;
		let targetTableElm = document.getElementById(tableId);
		let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
		XLSX.writeFile(wb, `${fileName}.xlsx`);
	}
	// ====================================
	// file size detector
	// ====================================
	fileSizeDetector(): void {

		$(function () {
			// We can attach the `fileselect` event to all file inputs on the page
			$(document).on("change", ":file", function () {
				var input = $(this),
					numFiles = input.get(0).files
						? input.get(0).files.length
						: 1,
					label = (new String((new String(input.val())))).replace(/\\/g, "/").replace(/.*\//, "");
				input.trigger("fileselect", [numFiles, label]);
			});

			// We can watch for our custom `fileselect` event like this
			$(document).ready(function () {
				$(":file").on("fileselect", function (event, numFiles, label) {
					var input = $(this).parents(".input-group").find(":text"),
						log = numFiles > 1 ? numFiles + " وثائق مختارة" : label;

					if (input.length) {
						input.val(log);
					} else {
						if (log) alert(log);
					}
				});
			});
		});
	}

	// options file
	getFileName(file: any) {
		if (file.lastIndexOf(".") != -1 && file.lastIndexOf(".") != 0)
			return file.substring(0, file.lastIndexOf("."));
	}
	// extrension file
	getExtensionFile(file: any) {
		if (file.lastIndexOf(".") != -1 && file.lastIndexOf(".") != 0) {
			var ext = file.substring(file.lastIndexOf(".") + 1);
			switch (ext) {
				case 'txt':
					return 'txt.svg';
				case 'pdf':
					return 'pdf.svg';
				case 'jpg':
					return 'jpg.svg';
				case 'png':
					return 'png.svg';
				case 'doc':
					return 'doc.svg';
				case 'docx':
					return 'doc.svg';
				case 'xls':
					return 'xls.svg';
				case 'xlsx':
					return 'xls.svg';
				case 'ppt':
					return 'ppt.svg';
				case 'pptx':
					return 'ppt.svg';
				case 'csv':
					return 'csv.svg';
				case 'xml':
					return 'xml.svg';
				case 'zip':
					return 'zip.svg';
				case 'rar':
					return 'zip.svg';
				case 'html':
					return 'html.svg';
				default:
					return 'file.svg';
			}
		}
		else return "";
	}

	PrintGenerator(id) {
		const httpOptions = {
			responseType: 'arraybuffer' as 'json'
		};
		return this.http.get<any[]>(this.apiURL + "/courrierEntrants/print/" + id, httpOptions);
	}

	// ============================================
	// File size converter
	// ============================================
	getFormattedFileSizeService(size) {
		if (size < 1024) return size + ' B'
		let i = Math.floor(Math.log(size) / Math.log(1024))
		this.numF = (size / Math.pow(1024, i))
		let round = Math.round(this.numF)
		this.numF = round < 10 ? this.numF.toFixed(2) : round < 100 ? this.numF.toFixed(1) : round
		return `${this.numF} ${'KMGTPEZY'[i - 1]}B`
	}
	delete(id) {
		return this.http.delete<Observable<any>>(this.AlfrescoURL + "/PJCourrierController/" + id);
	}

	PrintGenerator2(id1, id2) {
		const httpOptions = {
			responseType: 'arraybuffer' as 'json'
		};
		return this.http.get<any[]>(this.apiURL + '/printConvocationRC/' + id1 + '/' + id2, httpOptions);
	}

	PrintGenerator3(id1, id2) {
		const httpOptions = {
			responseType: 'arraybuffer' as 'json'
		};
		return this.http.get<any[]>(this.apiURL + '/printRappelConvocationRC/' + id1 + '/' + id2, httpOptions);
	}


	countNumberTotalCourriers(url): Observable<any> {
		return this.http.get<any>(this.apiURL + url);
	}

	countNumberTotalCourriersBetweenTwoDates(url, dateDebut, dateFin): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.apiURL + url, { params: queryParams });
	}
	countNumberTotalCourriersBetweenTwoDatesParTypeCourrier(url, dateDebut, dateFin,typeId): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.apiURL + url+'/'+typeId, { params: queryParams });
	}
	tempsMoyenTraitementCourrier(url): Observable<any> {
		return this.http.get<any>(this.apiURL + url);
	}


	tempsMoyenTraitementCourrierBetweenTwoDates(url, dateDebut, dateFin): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.apiURL + url, { params: queryParams });
	}

	
	tempsMoyenTraitementCourrierBetweenTwoDatesParTypeCourrier(url, dateDebut, dateFin,tceId): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.apiURL + url+'/'+tceId, { params: queryParams });
	}
	countCourriersTraitesNonTraitesParEntite(url, idDivision): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("id_division", idDivision);
		return this.http.get<any[]>(this.apiURL + url + idDivision);
	}

	countCourriersTraitesNonTraitesParEntiteBetweenTwoDates(url, idDivision, dateDebut, dateFin): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("id_division", idDivision);
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.apiURL + url + idDivision + '?dateDebut=' + dateDebut + '&dateFin=' + dateFin);
	}
	countCourriersTraitesParEntiteBetweenTwoDatesParTypeCourrier(url, idDivision, dateDebut, dateFin,tceId): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("id_division", idDivision);
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.apiURL + url + idDivision+'/'+tceId + '?dateDebut=' + dateDebut + '&dateFin=' + dateFin);
	}
	countCourriersTraitesNonTraitesParPersonne(url, idPersonne): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("id_personne", idPersonne);
		return this.http.get<any[]>(this.apiURL + url + idPersonne);
	}

	countCourriersTraitesNonTraitesParPersonneBetweenTwoDates(url, idPersonne, dateDebut, dateFin): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("id_personne", idPersonne);
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.apiURL + url + idPersonne + '?dateDebut=' + dateDebut + '&dateFin=' + dateFin);
	}
	countCourriersConvocationCloturerParPersonneBetweenTwoDates(url, idPersonne, dateDebut, dateFin): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("id_personne", idPersonne);
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.apiURL + url + idPersonne + '?dateDebut=' + dateDebut + '&dateFin=' + dateFin);
	}
	countCourriersEntrantsCloturerParPersonneBetweenTwoDates(url, idPersonne, dateDebut, dateFin): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("id_personne", idPersonne);
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.apiURL + url + idPersonne + '?dateDebut=' + dateDebut + '&dateFin=' + dateFin);
	}

	countCourriersParPersonneBetweenTwoDatesParTypeCourrier(url, idPersonne, dateDebut, dateFin,idType): Observable<any> {
		let queryParams = new HttpParams();
		queryParams = queryParams.append("id_personne", idPersonne);
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		return this.http.get<any[]>(this.apiURL + url + idPersonne +'/'+idType+ '?dateDebut=' + dateDebut + '&dateFin=' + dateFin);
	}

	findByMotCle(pageable: Pageable, motCle:any,id:number){
		let path = this.apiURL + '/courrierEntrants/findBymotCle'+  '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize+ '&sort=id,desc'+ `${id ? '&idPersonne=' + id : ''}`+`${motCle ? '&motCle=' + motCle : ''}` 

			return this.http.get<any[]>(`${path}`);
	}
	findCSByMotCle(pageable: Pageable, motCle:any,id:number){
		let path = this.apiURL + '/courrierSortants/findBymotCle'+  '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize+ '&sort=id,desc'+ `${id ? '&idPersonne=' + id : ''}`+`${motCle ? '&motCle=' + motCle : ''}` 

			return this.http.get<any[]>(`${path}`);
	}
	downoldFile(alfresco_id, a) {
		const options = {

			responseType: 'arraybuffer' as 'json'
		};
		this.http.get( environment.API_ALFRESCO_URL + "/PjCourriersSortants/"  + alfresco_id, options)
			.subscribe((data: any) => {
				if (a == 'pdf.svg') {
					const blob = new Blob([data], { type: 'application/pdf' });
					const url = window.URL.createObjectURL(blob);
					window.open(environment.API_ALFRESCO_URL + "/PjCourriersSortants/"  + alfresco_id);
				}
				else if (a == 'png.svg') {
					const blob = new Blob([data], { type: 'image/png' });
					const url = window.URL.createObjectURL(blob);
					window.open(environment.API_ALFRESCO_URL + "/PjCourriersSortants/"+alfresco_id);
				}
				if(a=='xls.svg'){
					const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
					const url = window.URL.createObjectURL(blob);
					window.open(environment.API_ALFRESCO_URL + "/PjCourriersSortants/"  + alfresco_id);
				}
				if(a=='doc.svg'){
					const blob = new Blob([data], { type: 'application/msword' });
					const url = window.URL.createObjectURL(blob);
					window.open(environment.API_ALFRESCO_URL + "/PjCourriersSortants/"  + alfresco_id);
				}
			    if(a=='jpg.svg'){	
									const blob = new Blob([data], { type: 'image/jpeg' });
					const url = window.URL.createObjectURL(blob);
					window.open(environment.API_ALFRESCO_URL + "/PjCourriersSortants/"+alfresco_id);
				}
				if(a=='csv.svg'){
					const blob = new Blob([data], { type: 'text/csv' });
					const url = window.URL.createObjectURL(blob);
					window.open(environment.API_ALFRESCO_URL + "/PjCourriersSortants/"  + alfresco_id);
				}
				
			});
	}
}
