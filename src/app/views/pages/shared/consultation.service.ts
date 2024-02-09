import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private baseUrl = environment.marcheUrl+'/Consultation/';
  private baseUrl1 = environment.marcheUrl+'/BonCommande/';

  constructor(private http : HttpClient) { }
  getAllTypeConsultation(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllTypeConsultation');
  }
  updateStatutBC(obj: any): Observable<any> {
		return this.http.put<any>(this.baseUrl1 + "updateStatutBC/" + obj.id, obj);
	}
  getConsultationById(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl +'showConsultation/'+id);
  }

  getCommissionById(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+'showCommission/' +id);
  }
	async findBcByDateOuverturePlisOrderByIdDesc(dateOuverturePlis) {

		return await this.http.get<any>(this.baseUrl1 + "findBcByDateOuverturePlisOrderByIdDesc/"+dateOuverturePlis)
			.pipe(delay(300))
			.toPromise();
	}
  /*getAllConsultation(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllConsultation');
  }*/

  async getAllConsultation(){

    return await this.http.get<any>(this.baseUrl + 'AllConsultation').pipe(delay(300)).toPromise();
  }

  getAllArticles(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllArticles');
  }

  getAllLigneCommandes(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllLigneCommande/'+f);
  }

  getAllOffreDeposee(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllOffreDeposee/'+f);
  }

  getAllOffreDeposeeByStatutTech(f): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllOffreDeposeeByStatutTech/'+f);
  }

  getAllCommission(f): Observable<any>{
    return this.http.get<Observable<any>>(this.baseUrl + 'AllCommission/'+f);
  }

  getOffreDeposeeAdjucataire(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'OffreDeposeeAdjucataire/'+id);
  }

  async getPEbyConsultation(id) {
    return await this.http.get<any>(this.baseUrl+'ParticipantExterneByConsultation/' +id).toPromise();
  }

  async getPIbyConsultation(id)  {
    return  this.http.get<any>(this.baseUrl+'ParticipantInterneByConsultation/' +id).toPromise();
  }

  sendconsultation(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'newConsultation',f);
  }

  editconsultation(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'editConsultation',f);
  }

  addCommandeConsultation(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'addCommandeConsultation',f);
  }

  CloseConsultation(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'CloseConsultation',f);
  }

  sendArticle(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'AddArticle',f);
  }

  sendCommande(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'AddCommande',f);
  }

  sendLigneCommande(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'LigneCommande',f);
  }

  sendOffreDeposee(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'OffreDeposee',f);
  }

  sendCommission(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'Commission',f);
  }

  sendoffreCommandeetLigne(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'offreCommandeetLigne',f);
  }

  sendteste(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'teste',f);
  }

  sendPICommission(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'AddParticipantsInterneCommission',f);
  }
  sendPECommission(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'AddParticipantsExterneCommission',f);
  }

  sendOffres(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+ 'AddOffreDeposee',f);
  }

  /*getAllBonCommande(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl1+"All");
  }*/
  patchBc(f): Observable<any> {
		return this.http.patch<Observable<any>>(this.baseUrl1 + "patchBc", f);
	}
  async getAllBonCommande(){

    return await this.http.get<any>(this.baseUrl1 + 'All').pipe(delay(300)).toPromise();
  }

  async getAllBonCommandeByCreateurUser(createurUser){

    return await this.http.get<any>(this.baseUrl1 + 'AllByCreateurUser/'+createurUser).pipe(delay(300)).toPromise();
  }
  async findByStatutBCOrderByIdDesc(num){

    return await this.http.get<any>(this.baseUrl1 + 'findByStatutBCOrderByIdDesc/'+num).pipe(delay(300)).toPromise();
  }

  getByIdBonCommande(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl1+'show/'+id);
  }
  getStatBonCommande(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl1+'stat');
  }

  sendBonCommande(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl1+'AddBC',f);
  }
}
