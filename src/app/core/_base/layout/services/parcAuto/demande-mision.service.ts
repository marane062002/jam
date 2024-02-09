import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeMission } from '../../models/demande-mission';
import { SharedURLS } from '../../shared/shared-url';

@Injectable({
  providedIn: 'root'
})
export class DemandeMisionService {
  constructor(private http:HttpClient) { }

  all() :Observable<DemandeMission[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'list');
   }
   pageable(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<DemandeMission[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
  save(entree: DemandeMission):Observable<DemandeMission>{
   return  this.http.post<DemandeMission>(SharedURLS.demandeMission+'new', entree , {responseType :'text' as  'json'}) ;
  }

  getById(id: number):Observable<DemandeMission>{
    return  this.http.get<DemandeMission>(SharedURLS.demandeMission+'getById/'+id ) ;
   }
   update(id: number,DemandeMission:DemandeMission):Observable<DemandeMission>{
    return  this.http.put<DemandeMission>(SharedURLS.demandeMission+'update/'+id, DemandeMission, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.demandeMission+id,{responseType :'text' as  'json'}) ;
   }
   affectionVehicule(demande_id:number,vehicule_id:number,status:any):Observable<DemandeMission>{
    return  this.http.post<DemandeMission>(SharedURLS.demandeMission+'affectionVehicule/'+demande_id+'/'+vehicule_id,status, {responseType :'text' as  'json'}) ;
   }

   livreVehicule(demande_id:number):Observable<DemandeMission>{
    return  this.http.get<DemandeMission>(SharedURLS.demandeMission+'livreVehicule/'+demande_id, {responseType :'text' as  'json'}) ;
   }
   affectionvignette(demande_id:number,vehicule_id:string,solde:number):Observable<DemandeMission>{
    return  this.http.get<DemandeMission>(SharedURLS.demandeMission+'affectionvignette/'+demande_id+'/'+vehicule_id+'/'+solde, {responseType :'text' as  'json'}) ;
   }
   
   affectionCarteJawaz(demande_id:number,vehicule_id:number):Observable<DemandeMission>{
    return  this.http.get<DemandeMission>(SharedURLS.demandeMission+'affectionCarteJawaz/'+demande_id+'/'+vehicule_id, {responseType :'text' as  'json'}) ;
   }
   getallDemandeMisionVAlideBychefService(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'getallDemandeMisionVAlideBychefService/'+id+'?page='+page+'&size='+size);
   }
   getallDemandeMisionVAlideBychefDivison(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'getallDemandeMisionVAlideBychefDivison/'+id+'?page='+page+'&size='+size);
   }
   getallDemandeMisionVAlideByDirecteur(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'getallDemandeMisionVAlideByDirecteur/'+id+'?page='+page+'&size='+size);
   }
   getallDemandeMisionVAlideBycheflogistique(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'getallDemandeMisionVAlideBycheflogistique/'+id+'?page='+page+'&size='+size);
   }
   getallDemandeMisionaLIvrevehucile( page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'getallDemandeMisionaLIvrevehucile?page='+page+'&size='+size);
   }
   getallDemandeMisionReception( page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'getallDemandeMisionReception?page='+page+'&size='+size);
   }
  
   getallDemandeMisionVAlideBychefFinance(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'getallDemandeMisionVAlideBychefFinance/'+id+'?page='+page+'&size='+size);
   }
   
   getallDemandeMisionaffectionVoiture(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'getallDemandeMisionaffectionVoiture?page='+page+'&size='+size);
   }
   getallDemandeMisionaffectinCarte(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'getallDemandeMisionaffectinCarte?page='+page+'&size='+size);
   }
   getallDemandeMisionaffectionVignete(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'getallDemandeMisionaffectionVignete?page='+page+'&size='+size);
   }
   
   
   getallDemandeMisionNotaffectionVoiture(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'getallDemandeMisionNotaffectionVoiture?page='+page+'&size='+size);
   }
   getallDemandeMisionaByStatusNotDeleted(statut:any,page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'getallDemandeMisionaByStatusNotDeleted/'+statut+'?page='+page+'&size='+size);
   }
   getallDemandeMisionaByStatusAndFoncionaireNotDeleted(fonctionaire:any, statut:any,page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeMission[]>(SharedURLS.demandeMission+'getallDemandeMisionaByStatusAndFoncionaireNotDeleted/'+fonctionaire+'/'+statut+'?page='+page+'&size='+size);
   }
   
   getCountDemandeMision() :Observable<any>{
    return  this.http.get<number[]>(SharedURLS.demandeMission+'count');
   }

   validerMision(validationMision:any){
    return  this.http.post<number[]>(SharedURLS.demandeMission+'validerDemandeMission',validationMision,{responseType :'text' as  'json'});
   }
   rejetDemandeMission(validationMision:any){
    return  this.http.post<number[]>(SharedURLS.demandeMission+'rejetDemandeMission',validationMision,{responseType :'text' as  'json'});
   }
   ReceptionVihucle(validationMision:any){
    return  this.http.post<number[]>(SharedURLS.demandeMission+'ReceptionVihucle',validationMision,{responseType :'text' as  'json'});
   }
   
   TransfertMission(id:number, statut:number){
    return  this.http.get(SharedURLS.demandeMission+'transfertMission/'+id+"/"+statut,{responseType :'text' as  'json'});
   }

   generateDocumentMession(id:number){
    window.open(SharedURLS.demandeMission+'generateDocumentMession/'+id )
   }
}
