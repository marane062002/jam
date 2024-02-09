import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {


  private baseUrl = environment.projetUrl;
  private pjUrl = environment.API_ALFRESCO_URL;

  private prestataireUrl = '/prestataires'
  private projetUrl = '/projets'
  private phaseUrl = '/phaseProjets'
  private typeUrl = '/typeProjets'
  private sourceUrl = '/sources'
  private natureDepenceUrl = '/natureDepence'
  private statutProjetUrl = '/statutProjets'
  private statutPhaseUrl = '/statutPhaseProjets'
  private sousTypeProjetUrl = '/sousTypeProjets'
  private sousSourceProjetUrl = '/sousSources'
  private arrondissementUrl = '/arrondissements'



  constructor(private http: HttpClient) { }

  //**************************Prestataire**************************** */
  //**********Index*****************/
  async getPrestataires() {

    return await this.http.get<any>(this.baseUrl + this.prestataireUrl + '/index').toPromise();
  }
  //************Show***************  */
  async getPrestataireById(id: number) {
    return await this.http.get<any>(this.baseUrl + this.prestataireUrl + '/show/' + id).toPromise();
  }

  getResourceById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.prestataireUrl + '/show/' + id);
  }
  //************Show***************  */
  public savePrestataire(ressource: Object): Observable<Object> {
    return this.http.post(this.baseUrl + this.prestataireUrl + '/new', ressource);
  }
  //************Delete***************  */
  public deletePrestataire(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + this.prestataireUrl + '/delete/' + id, { responseType: 'text' });
  }
  //************Update***************  */
  public updatePrestataire(ressource: Object, id: number): Observable<Object> {
    return this.http.put(this.baseUrl + this.prestataireUrl + '/edit/' + id, ressource);
  }

  //************Show***************  */
  async getDataShowPrestataireById(id: number) {
    let prestataire = await this.http.get<any>(this.baseUrl + this.prestataireUrl + '/show/' + id);
    let pjs = await this.http.get<any>(this.pjUrl + "/PjPrestataires/allById/" + id);
    return forkJoin([prestataire, pjs]).toPromise()
  }
  //**************************Projet**************************** */
  //**********Index*****************/
  async getProjets() {

    return await this.http.get<any>(this.baseUrl + this.projetUrl + '/index').toPromise();
  }
  //************Show***************  */
  async getProjetById(id: number) {
    return await this.http.get<any>(this.baseUrl + this.projetUrl + '/show/' + id).toPromise();
  }
  //************Show***************  */
  public saveProjet(ressource: Object): Observable<Object> {
    return this.http.post(this.baseUrl + this.projetUrl + '/new', ressource);
  }
  //************Delete***************  */
  public deleteProjet(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + this.projetUrl + '/delete/' + id, { responseType: 'text' });
  }
  //************Update***************  */
  public updateProjet(ressource: Object, id: number): Observable<Object> {
    return this.http.put(this.baseUrl + this.projetUrl + '/edit/' + id, ressource);
  }
  //**************Data for new project*************/
  async getDataProjet() {

    let types = await this.http.get<any>(this.baseUrl + this.typeUrl + '/index');
    let statuts = await this.http.get<any>(this.baseUrl + this.statutProjetUrl + '/index');
    let divisions = await this.http.get<any>(environment.organisationUrl + '/divisions/index');
    //let prestataires = this.getPrestataires();
    let sources = await this.http.get<any>(this.baseUrl + this.sourceUrl + '/index');
    let natureDepence = await this.http.get<any>(this.baseUrl + this.natureDepenceUrl + '/index');
    //         let arrondissements = await this.http.get<any>(this.baseUrl+this.arrondissementUrl+'/index');
    return forkJoin([types, statuts, divisions, sources, natureDepence]).toPromise();
    //          return forkJoin([types,statuts,divisions,prestataires,sources,arrondissements]).toPromise();
  }
  //************Show***************  */

  /*
  async getDataShowProjetById(id: number) {
   let projet = await this.http.get<any>(this.baseUrl+this.projetUrl+'/show/' + id);
   let pjs = await this.http.get<any>(this.pjUrl + "/PjProjets/allById/" + id);
   return forkJoin([projet,pjs]).toPromise()
  }
  */

  async getPjsProjetById(id: number) {
    return await this.http.get<any>(this.pjUrl + "/PjProjets/allById/" + id).toPromise();
  }

  async getDataShowProjetById(id: number) {
    return await this.http.get<any>(this.baseUrl + this.projetUrl + '/show/' + id).toPromise();
  }


  getSousTypes(id): Observable<any> {

    return this.http.get(this.baseUrl + this.sousTypeProjetUrl + '/TypeId/' + id);
  }

  getSousSources(id): Observable<any> {

    return this.http.get(this.baseUrl + this.sousSourceProjetUrl + '/SourceId/' + id);
  }

  async getArrondissement() {
    return await this.http.get<any>(this.baseUrl + this.arrondissementUrl + '/index').toPromise();
  }

  //**************************Phase**************************** */
  //**********Index*****************/
  public getPhases(): Observable<any> {

    return this.http.get(this.baseUrl + this.phaseUrl + '/index');
  }
  //************Show***************  */
  async getPhaseById(id: number) {
    return await this.http.get<any>(this.baseUrl + this.phaseUrl + '/show/' + id).toPromise();
  }
  //************Show***************  */
  public savePhase(ressource: Object): Observable<Object> {
    return this.http.post(this.baseUrl + this.phaseUrl + '/new', ressource);
  }
  //************Delete***************  */
  public deletePhase(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + this.phaseUrl + '/delete/' + id, { responseType: 'text' });
  }
  //************Update***************  */
  public updatePhase(ressource: Object, id: number): Observable<Object> {
    return this.http.put(this.baseUrl + this.phaseUrl + '/edit/' + id, ressource);
  }
  //************get phase by projet***************  */
  async getPhaseByProjetId(id: number) {
    return await this.http.get<any>(this.baseUrl + this.phaseUrl + '/projet/' + id).toPromise();
  }
  //**************get statuts phase*************/
  async getStatuts() {
    return await this.http.get(this.baseUrl + this.statutPhaseUrl + '/index').toPromise();
  }

  // ====================================
  // Gestion files
  // ====================================
  updloadFilet(v, id, type, url): Observable<any> {
    console.log("taille de fichier :" + v.length);
    console.log('id : ' + id)
    const formda: FormData = new FormData();
    for (var i = 0; i < v.length; i++) {
      formda.append("file", v[i]);
    }
    formda.append("id", id);
    formda.append("type", type)

    return this.http.post<any>(this.pjUrl + url, formda);
  }

  /*
  async getFilesById(id, url) {
    return await this.http.get<any>(this.pjUrl + url + id).toPromise();
  }
  */
  getFilesByIdAndType(id, type, url): Observable<any> {
    return this.http.get<any>(this.pjUrl + url + id + '/' + type);
  }

  getFilesById(id, url): Observable<any> {
    return  this.http.get<Observable<any>>(this.pjUrl + url + id);
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

  generateOrdreServiceSuivi(id): Observable<any> {
    return this.http.get<Observable<any>>(
      this.baseUrl+ this.projetUrl + "/generateOrdreServiceSuivi/" + id,{
        responseType :'arraybuffer' as 'json'
      }
    );
  }

  getStatProjetbyPeriode(dateDebut:string  , dateFin:string, souSources): Observable<any> {
    return this.http.get<Observable<any>>(   this.baseUrl+ this.projetUrl + "/stats/"+dateDebut+"&"+dateFin+"/"+souSources
    );
  }

  
}
