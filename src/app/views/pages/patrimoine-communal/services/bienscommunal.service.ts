import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BienscommunalService {

 //for server
  //private baseUrl = 'http://192.168.1.230:8080/gateway/BC/Bc';

  //for dev
  private baseUrl = environment.biencommunalUrl;
  private pjUrl = environment.API_ALFRESCO_URL;

  private destUrl = '/destinationsEco'
  private statutUrl= '/statuts'
  private arrondissementUrl ='/arrondissements'
  private typeMarcheUrl= '/typesMarches'
  private marcheUrl = '/marches'
  private habitationUrl = '/habitations'
  private magasinUrl = '/magasins'
  private appartementUrl = '/appartementls'
  private loyerUrl = '/loyers'
  private ligneloyerUrl = '/lignesloyer'
  private loyerApptUrl = '/loyersApp'
  private ligneloyerApptUrl = '/lignesloyerApp'
  private locataireUrl = '/locataires'
  private benificUrl = '/beneficiaires'
  private toiletteUrl = '/toilettes'
  private loyerToiletteUrl = '/loyersToilette'
  private ligneloyerToiletteUrl = '/lignesloyerToilette'
  private domaineUrl = '/domaines'
  private loyerDomaineUrl = '/loyersDomaine'
  private ligneloyerDomaineUrl = '/lignesloyerDomaine'
  

 
  constructor(private http:HttpClient,
              ) { } 

  //**************************Marche**************************** */
        //**********Index*****************/
        public getMarches(): Observable <any>{

          let marches = this.http.get(this.baseUrl+this.marcheUrl+'/index').toPromise();
          return forkJoin([marches])
        }
        //************Show***************  */
        public getMarcheById(id: number): Observable<any> {
          let marche = this.http.get<any>(this.baseUrl+this.marcheUrl+'/show/' + id).toPromise();
          return forkJoin([marche])
        }
        
        //************Save***************  */
        public saveMarche(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.marcheUrl+'/new', ressource);    
        }
        //************Delete***************  */
        public deleteMarche(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.marcheUrl+'/delete/'+ id, { responseType: 'text' });
        }
        //************Update***************  */
        public updateMarche(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.marcheUrl+'/edit/'+id, ressource);
        }

  //**************************Magasin**************************** */
        //**********Index*****************/
        public getMagasins(): Observable <any>{

          return this.http.get(this.baseUrl+this.magasinUrl+'/index');
        }
        //************Show***************  */
        async getMagasinById(id: number) {
          return await this.http.get<any>(this.baseUrl+this.magasinUrl+'/show/' + id).toPromise();
        }
        //************Save***************  */
        public saveMagasin(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.magasinUrl+'/new', ressource);
        }
        //************Delete***************  */
        public deleteMagasin(id: number): Observable<any> {
           return this.http.delete(this.baseUrl+ this.magasinUrl+'/delete/'+ id, { responseType: 'text' });
          // return this.http.delete("http://localhost:9101/BC/magasins/delete/"+id);
        }
        //************Update***************  */
        public updateMagasin(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.magasinUrl+'/edit/'+id, ressource);
        }
       //************get magasin by marche***************  */
        async getMagasinsByMarche(id) {
          return await this.http.get<any>(this.baseUrl+ this.magasinUrl+'/marche/' + id).toPromise();
          
        }

        //************get data for update magasin***************  */
        async getMagasinData(id) {
          let magasin =  await this.http.get<any>(this.baseUrl+ this.magasinUrl+'/show/' + id);
          let destinationEco = await this.http.get(this.baseUrl+this.destUrl+'/index');
          return forkJoin([magasin,destinationEco]).toPromise()
        }
    //**************************************************************    
        public getDestinationEcos(): Observable <any>{

          return this.http.get(this.baseUrl+this.destUrl+'/index');
        }

        async getStatut(){
          return await this.http.get<any>(this.baseUrl+this.statutUrl+'/index').toPromise();
        }

        async getType(){
          return await this.http.get<any>(this.baseUrl+this.typeMarcheUrl+'/index').toPromise();
        }

        async getArrondissement(){
          return await this.http.get<any>(this.baseUrl+this.arrondissementUrl+'/index').toPromise();
        }

  //**************************Loyer**************************** */
        //**********Index*****************/
        public getLoyers(): Observable <any>{

          return this.http.get(this.baseUrl+this.loyerUrl+'/index');
        }
        //************Show***************  */
        async getLoyerById(id: number) {
          return await this.http.get<any>(this.baseUrl+this.loyerUrl+'/show/' + id).toPromise();
        }
        //************Save***************  */
        public saveLoyer(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.loyerUrl+'/new', ressource);
        }
        //************Delete***************  */
        public deleteLoyer(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.loyerUrl+'/delete/'+ id, { responseType: 'text' });
        }
        //************Update***************  */
        public updateLoyer(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.loyerUrl+'/edit/'+id, ressource);
        }

         //************get loyers by magasin***************  */
         async getLoyersByMagasin(id) {
          return await this.http.get<any>(this.baseUrl+ this.loyerUrl+'/magasin/' + id).toPromise();
          
        }

       
    //***************************Locataire***********************************    
     //**********Index*****************/
     async getLocataires(){

    return await this.http.get<any>(this.baseUrl+this.locataireUrl+'/index').toPromise();
   
    }
    //************Show***************  */
    public getLocataireById(id: number): Observable<any> {
     let locataire = this.http.get<any>(this.baseUrl+this.locataireUrl+'/show/' + id).toPromise();
     return forkJoin([locataire])
    }
    //************Save***************  */
    public saveLocataire(ressource: Object): Observable<Object> {
      return this.http.post(this.baseUrl+this.locataireUrl+'/new', ressource);
    }
    //************Delete***************  */
    public deleteLocataire(id: number): Observable<any> {
      return this.http.delete(this.baseUrl+ this.locataireUrl+'/delete/'+ id, { responseType: 'text' });
    }
    //************Update***************  */
    public updateLocataire(ressource: Object,id: number): Observable<Object> {
      return this.http.put(this.baseUrl+ this.locataireUrl+'/edit/'+id, ressource);
    }

  //***************************Beneficiaire***********************************    
     //**********Index*****************/
     async getBeneficiaires(){

      return await this.http.get<any>(this.baseUrl+this.benificUrl+'/index').toPromise();
     
      }
      //************Show***************  */
      public getBeneficiaireById(id: number): Observable<any> {
       let locataire = this.http.get<any>(this.baseUrl+this.benificUrl+'/show/' + id).toPromise();
       return forkJoin([locataire])
      }
      //************Save***************  */
      public saveBeneficiaire(ressource: Object): Observable<Object> {
        return this.http.post(this.baseUrl+this.benificUrl+'/new', ressource);
      }
      //************Delete***************  */
      public deleteBeneficiaire(id: number): Observable<any> {
        return this.http.delete(this.baseUrl+ this.benificUrl+'/delete/'+ id, { responseType: 'text' });
      }
      //************Update***************  */
      public updateBeneficiaire(ressource: Object,id: number): Observable<Object> {
        return this.http.put(this.baseUrl+ this.benificUrl+'/edit/'+id, ressource);
      }


//**************************LigneLoyer**************************** */
        //**********Index*****************/
        public getLigneLoyers(): Observable <any>{

          return this.http.get(this.baseUrl+this.ligneloyerUrl+'/index');
        }
        //************Show***************  */
        async getLigneLoyerById(id: number) {
          return await this.http.get<any>(this.baseUrl+this.ligneloyerUrl+'/show/' + id).toPromise();
        }
        //************Save***************  */
        public saveLigneLoyer(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.ligneloyerUrl+'/new', ressource);
        }
        //************Delete***************  */
        public deleteLigneLoyer(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.ligneloyerUrl+'/delete/'+ id, { responseType: 'text' });
        }
        //************Update***************  */
        public updateLigneLoyer(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.ligneloyerUrl+'/edit/'+id, ressource);
        }
        //************get lignesLoyer by id loyer***************  */
        async getLignesLoyerByIdLoyer(id: number) {
          return await this.http.get<any>(this.baseUrl+this.ligneloyerUrl+'/loyer/' + id).toPromise();
        }

//**************************Habitation**************************** */
        //**********Index*****************/
        async getHabitations(){

          return await this.http.get<any>(this.baseUrl+this.habitationUrl+'/index').toPromise();
        }
        //************Show***************  */
        async getHabitationById(id: number) {
          return await this.http.get<any>(this.baseUrl+this.habitationUrl+'/show/' + id).toPromise();
        }
        //************Save***************  */
        public saveHabitation(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.habitationUrl+'/new', ressource);
        }
        //************Delete***************  */
        public deleteHabitation(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.habitationUrl+'/delete/'+ id, { responseType: 'text' });
        }
        //************Update***************  */
        public updateHabitation(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.habitationUrl+'/edit/'+id, ressource);
        }

//**************************Appartement**************************** */
        //**********Index*****************/
        public getAppartements(): Observable <any>{

          return this.http.get(this.baseUrl+this.appartementUrl+'/index');
        }
        //************Show***************  */
        async getAppartementById(id: number){
          return await this.http.get<any>(this.baseUrl+this.appartementUrl+'/show/' + id).toPromise();
        }
        //************Save***************  */
        public saveAppartement(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.appartementUrl+'/new', ressource);
        }
        //************Delete***************  */
        public deleteAppartement(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.appartementUrl+'/delete/'+ id, { responseType: 'text' });
        }
        //************Update***************  */
        public updateAppartement(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.appartementUrl+'/edit/'+id, ressource);
        }

        async getAppartementByHabitation(id){
          return await this.http.get<any>(this.baseUrl+ this.appartementUrl+'/habitation/' + id).toPromise();
        }

        async getAppartementEditData(id){
          let appartement = await this.http.get<any>(this.baseUrl+ this.appartementUrl+'/show/' + id);
          let destinationEco = await this.http.get(this.baseUrl+this.destUrl+'/index');
          return forkJoin([appartement,destinationEco]).toPromise()
        }
  //**************************LoyerAppt**************************** */
        //**********Index*****************/
        public getLoyersAppt(): Observable <any>{

          return this.http.get(this.baseUrl+this.loyerApptUrl+'/index');
        }
        //************Show***************  */
        public getLoyerApptById(id: number): Observable<any> {
          return this.http.get<any>(this.baseUrl+this.loyerApptUrl+'/show/' + id);
        }
        //************Save***************  */
        public saveLoyerAppt(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.loyerApptUrl+'/new', ressource);
        }
        //************Delete***************  */
        public deleteLoyerAppt(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.loyerApptUrl+'/delete/'+ id, { responseType: 'text' });
        }
        //************Update***************  */
        public updateLoyerAppt(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.loyerApptUrl+'/edit/'+id, ressource);
        }

        async getLoyersByAppartement(id) {
          return await this.http.get<any>(this.baseUrl+ this.loyerApptUrl+'/appartement/' + id).toPromise();
          
        }
  //**************************LigneLoyerAppt**************************** */
        //**********Index*****************/
        public getLigneLoyersAppt(): Observable <any>{

          return this.http.get(this.baseUrl+this.ligneloyerApptUrl+'/index');
        }
        //************Show***************  */
        public getLigneLoyerApptById(id: number): Observable<any> {
          return this.http.get<any>(this.baseUrl+this.ligneloyerApptUrl+'/show/' + id);
        }
        //************Save***************  */
        public saveLigneLoyerAppt(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.ligneloyerApptUrl+'/new', ressource);
        }
        //************Delete***************  */
        public deleteLigneLoyerAppt(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.ligneloyerApptUrl+'/delete/'+ id, { responseType: 'text' });
        }
        //************Update***************  */
        public updateLigneLoyerAppt(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.ligneloyerApptUrl+'/edit/'+id, ressource);
        }

        async getLignesLoyerByIdLoyerApp(id: number) {
          return await this.http.get<any>(this.baseUrl+this.ligneloyerApptUrl+'/loyer/' + id).toPromise();
        }
  //**************************Toilette**************************** */
        //**********Index*****************/
        async getToilettes(){

          return await this.http.get<any>(this.baseUrl+this.toiletteUrl+'/index').toPromise();
        }
        //************Show***************  */
        async getToiletteById(id: number) {
          return await this.http.get<any>(this.baseUrl+this.toiletteUrl+'/show/' + id).toPromise();
        }
        //************Save***************  */
        public saveToilette(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.toiletteUrl+'/new', ressource);
        }
        //************Delete***************  */
        public deleteToilette(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.toiletteUrl+'/delete/'+ id, { responseType: 'text' });
        }
        //************Update***************  */
        public updateToilette(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.toiletteUrl+'/edit/'+id, ressource);
        }
  //**************************LoyerToilette**************************** */
        //**********Index*****************/
        async getLoyersToilette(){

          return await this.http.get(this.baseUrl+this.loyerToiletteUrl+'/index').toPromise();
        }
        //************Show***************  */
        async getLoyerToiletteById(id: number) {
          return await this.http.get<any>(this.baseUrl+this.loyerToiletteUrl+'/show/' + id).toPromise();
        }
        //************Save***************  */
        public saveLoyerToilette(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.loyerToiletteUrl+'/new', ressource);
        }
        //************Delete***************  */
        public deleteLoyerToilette(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.loyerToiletteUrl+'/delete/'+ id, { responseType: 'text' });
        }
        //************Update***************  */
        public updateLoyerToilette(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.loyerToiletteUrl+'/edit/'+id, ressource);
        }

        //************get loyers by toilette***************  */
        async getLoyersByToilette(id) {
          return await this.http.get<any>(this.baseUrl+ this.loyerToiletteUrl+'/toilette/' + id).toPromise();
          
        }
  //**************************LigneLoyerToilette**************************** */
        //**********Index*****************/
        public getLigneLoyersToilette(): Observable <any>{

          return this.http.get(this.baseUrl+this.ligneloyerToiletteUrl+'/index');
        }
        //************Show***************  */
        async getLigneLoyerToiletteById(id: number) {
          return await this.http.get<any>(this.baseUrl+this.ligneloyerToiletteUrl+'/show/' + id).toPromise();
        }
        //************Save***************  */
        public saveLigneLoyerToilette(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.ligneloyerToiletteUrl+'/new', ressource);
        }
        //************Delete***************  */
        public deleteLigneLoyerToilette(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.ligneloyerToiletteUrl+'/delete/'+ id, { responseType: 'text' });
        }
        //************Update***************  */
        public updateLigneLoyerToilette(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.ligneloyerToiletteUrl+'/edit/'+id, ressource);
        }
 
        //************get lignesLoyer by id loyer***************  */
        async getLignesLoyerByIdLoyerToilette(id: number) {
          return await this.http.get<any>(this.baseUrl+this.ligneloyerToiletteUrl+'/loyer/' + id).toPromise();
        }

        async getDataLigneLoyerToilette(id){
          let ligne = await this.http.get<any>(this.baseUrl+this.ligneloyerToiletteUrl+'/show/' + id);
          let pj = await this.http.get<any>(this.pjUrl + "/PjLignesLoyerToilette/allById/" + id);
      
          return forkJoin([ligne,pj]).toPromise()
        }
//**************************Domaine**************************** */
        //**********Index*****************/
        async getDomaines(){
 
          return await this.http.get<any>(this.baseUrl+this.domaineUrl+'/index').toPromise();
        }
        //************Show***************  */
        async getDomaineById(id: number) {
          return await this.http.get<any>(this.baseUrl+this.domaineUrl+'/show/' + id).toPromise();
        }
        //************Save***************  */
        public saveDomaine(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.domaineUrl+'/new', ressource);
        }
        //************Delete***************  */
        public deleteDomaine(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.domaineUrl+'/delete/'+ id, { responseType: 'text' });
        }
        //************Update***************  */
        public updateDomaine(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.domaineUrl+'/edit/'+id, ressource);
        }
  //**************************LoyerDomaine**************************** */
        //**********Index*****************/
        public getLoyersDomaine(): Observable <any>{

          return this.http.get(this.baseUrl+this.loyerDomaineUrl+'/index');
        }
        //************Show***************  */
        async getLoyerDomaineById(id: number) {
          return await this.http.get<any>(this.baseUrl+this.loyerDomaineUrl+'/show/' + id).toPromise();
        }
        //************Save***************  */
        public saveLoyerDomaine(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.loyerDomaineUrl+'/new', ressource);
        }
        //************Delete***************  */
        public deleteLoyerDomaine(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.loyerDomaineUrl+'/delete/'+ id, { responseType: 'text' });
        }
        //************Update***************  */
        public updateLoyerDomaine(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.loyerDomaineUrl+'/edit/'+id, ressource);
        }

         //************get loyers by domaine***************  */
         async getLoyersByDomaine(id) {
          return await this.http.get<any>(this.baseUrl+ this.loyerDomaineUrl+'/domaine/' + id).toPromise();
          
        }
  //**************************LigneLoyerDomaine**************************** */
        //**********Index*****************/
        public getLigneLoyersDomaine(): Observable <any>{

          return this.http.get(this.baseUrl+this.ligneloyerDomaineUrl+'/index');
        }
        //************Show***************  */
        async getLigneLoyerDomaineById(id: number) {
          return await this.http.get<any>(this.baseUrl+this.ligneloyerDomaineUrl+'/show/' + id).toPromise();
        }
        //************Save***************  */
        public saveLigneLoyerDomaine(ressource: Object): Observable<Object> {
          return this.http.post(this.baseUrl+this.ligneloyerDomaineUrl+'/new', ressource);
        }
        //************Delete***************  */
        public deleteLigneLoyerDomaine(id: number): Observable<any> {
          return this.http.delete(this.baseUrl+ this.ligneloyerDomaineUrl+'/delete/'+ id, { responseType: 'text' });
        }
        //************Update***************  */
        public updateLigneLoyerDomaine(ressource: Object,id: number): Observable<Object> {
          return this.http.put(this.baseUrl+ this.ligneloyerDomaineUrl+'/edit/'+id, ressource);
        }

        //************get lignesLoyer by id loyer***************  */
        async getLignesLoyerByIdLoyerDomaine(id: number) {
          return await this.http.get<any>(this.baseUrl+this.ligneloyerDomaineUrl+'/loyer/' + id).toPromise();
        }

        async getDataLigneLoyerDomaine(id){
          let ligne = await this.http.get<any>(this.baseUrl+this.ligneloyerDomaineUrl+'/show/' + id);
          let pj = await this.http.get<any>(this.pjUrl + "/PjLignesLoyerDomaine/allById/" + id);
      
          return forkJoin([ligne,pj]).toPromise()
        }
 // ====================================
	// Gestion files
	// ====================================
  updloadFile(v, id,url): Observable<any> {
    console.log("taille de fichier :" + v.length);
    console.log('id : '+ id)
		const formda: FormData = new FormData();
		for (var i = 0; i < v.length; i++) {
			formda.append("file", v[i]);
		}
    formda.append("id", id);
    
    
		return this.http.post<any>(this.pjUrl + url,formda);
	}
	updloadFilet(v, id,type,url): Observable<any> {
    console.log("taille de fichier :" + v.length);
    console.log('id : '+ id)
		const formda: FormData = new FormData();
		for (var i = 0; i < v.length; i++) {
			formda.append("file", v[i]);
		}
    formda.append("id", id);
    formda.append("type",type)
    
		return this.http.post<any>(this.pjUrl + url,formda);
	}

	async getFilesById(id,url) {
		return await this.http.get<any>(this.pjUrl + url + id).toPromise();
  }
  getFilesByIdAndType(id,type,url): Observable<any> {
		return this.http.get<any>(this.pjUrl + url + id +'/' + type);
	}

  /*************  Statistique*************** */
  getCountMagasinAndSeanceByMarche(id): Observable<any> {
    return  this.http.get<any>(this.baseUrl+ this.marcheUrl+'/count/' + id);
	}
}
