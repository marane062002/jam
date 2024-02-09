import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffairesConseilService {
  private baseUrl = environment.affaireConseilUrl;
  constructor(private http : HttpClient) { }

  getAllRoleMembreConseil(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllRoleMembreConseil');
  }

  getAllMondat(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'AllMondat');
  }

  getMondatById(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'showMondat/'+ id);
  }

  editMondat(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'editMondat',f);
  }
  getAllMembreConseilByIdMondat(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'MembreConseilByMondat/' + id);
  }

  getAllMembreConseilByMondatActuel(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'MembreConseilByMondatActuel');
  }

  getAllSession(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'AllSession');
  }

  getSessionById(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl +'Session/'+ id);
  }

  getCommissionById(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl +'showCommission/'+ id);
  }

  getAllTypePoint(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'AllTypePoint');
  }

  getSessionOperationnelle(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'SessionOperationnelle');
  }

  getAllPointBySession(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'AllPointBySession/'+id);
  }

  getAllRoleMembreCommission(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'AllRoleCommission');
  }

  getPointById(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'Point/'+id);
  }

  getPointValideDivisionAffaireConseil(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'PointsValideDivisionAffaireConseil/'+id);
  }

  getMondatActuel(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'MondatActuel/');
  }

  getStatutsPoint(statut): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'StatutsPoint/'+statut);
  }

  getAllCommissionActuelles(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'AllCommissionActuelles');
  }

  getMembreConseilCommissionByCommission(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'MembreConseilCommissionByCommission/'+id);
  }

  getPersonnelCommissionByCommission(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'PersonnelCommissionByCommission/'+id);
  }

  getPointByCommission(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'PointByCommission/'+id);
  }

  getPointByCommissionEtStatut(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'PointByCommissionEtStatut/'+id);
  }

  getAllCommission(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'AllCommission');
  }

  getAllPoints(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'AllPoint');
  }

  getAllReunionCommission(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'AllReunionCommission');
  }

  getReunionById(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'ReunionById/'+id);
  }

  PointsForAudience(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'PointsForAudience/'+id);
  }

  getAllAudience(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'AllAudience');
  }

  getAudienceById(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'AudienceById/'+id);
  }

  getPointByAudience(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'PointByAudience/'+id);
  }

  getPersonnelByAudience(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'PersonnelByAudience/'+id);
  }

  getMembreConvoqueByAudience(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'MembreConvoqueByAudience/'+id);
  }

  getMembreBureauByAudience(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'MembreBureauByAudience/'+id);
  }

  getPointByCommissionEtSession(id,id1): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'PointByCommissionEtSession/'+id+'/'+id1);
  }

  getListPointByCommissionEtSession(id,id1): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'ListPointByCommissionEtSession/'+id+'/'+id1);
  }

  getPointBySessionForBureau(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'PointBySessionForBureau/'+id);
  }

  getMembresByReunion(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'MembresByReunion/'+id);
  }

  getPersonnelsByReunion(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'PersonnelsByReunion/'+id);
  }

  getPointsByReunion(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'PointsByReunion/'+id);
  }

  getEluById(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'EluById/'+id);
  }

  getCommByPoint(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'CommissionByPoint/'+id);
  }

  getdecisionByPoint(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'DecisionByPoint/'+id);
  }

  getresultatByDecision(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'ResultatByDecision/'+id);
  }

  getdecisionBySession(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'DecisionBySession/'+id);
  }

  getdecisionById(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'DecisionById/'+id);
  }

  getAllOrdreJourSession(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'AllOrdreJourSession');
  }

  getAllReunionBureau(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'AllReunionBureau');
  }

  getOrdreJourSessionById(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'OrdreJourSessionById/'+id);
  }

  getAllStatutsPoint(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'AllStatutsPoint');
  }

  PointByStatutEtSession(id,id1): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'PointByStatutEtSession/'+id+'/'+id1);
  }

  countPoint(id): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl+ 'countPoint/'+id);
  }



  sendmondat(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'addMondat',f);
  }

  sendreunionBureau(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'AddReunionBureau',f);
  }

  sendresultat(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'AddResultatDecisionPoint',f);
  }

  sendOrdreJourSession(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl+'addOrdreJour',f);
  }

  sendMembreConseil(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddMembreConseil',f);
  }

  sendSession(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddSession',f);
  }

  editSession(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'editSession',f);
  }

  sendMembreConseilSession(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddMembreConseilSession',f);
  }

  sendPoint(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddPoint',f);
  }

  sendPointCommission(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddPointCommission',f);
  }

  editPoint(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'editPoint',f);
  }

  affecterPoint(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'affecterPoint',f);
  }

  sendPoints(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'EvaluerPointsParBureau',f);
  }

  sendPoints1(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'EvaluerPointsParAudience',f);
  }

  sendDecisions(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddDecisions',f);
  }



  sendCommission(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddCommission',f);
  }

  editCommission(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'editCommission',f);
  }

  sendMembreConseilCommission(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddMembreConseilCommission',f);
  }

  sendPersonnelCommission(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddPersonnelCommission',f);
  }

  sendReunion(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddReunion',f);
  }

  editReunion(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'editReunion',f);
  }

  sendPointReunion(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddPointReunion',f);
  }

  sendMembreReunion(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddmembreReunion',f);
  }

  sendPersonnelReunion(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddpersonnelReunion',f);
  }

  sendAudience(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddAudience',f);
  }


  sendRemarqueAudience(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddRemarquesAudience',f);
  }

  editAudience(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'editAudience',f);
  }

  sendPersonnelsAudience(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddpersonnelAudience',f);
  }

  sendMembresConcoquesAudience(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddmembreConvoqueAudience',f);
  }

  sendmembreBureauAudience(f): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'AddmembreBureauAudience',f);
  }

}
