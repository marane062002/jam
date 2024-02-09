import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reparation } from '../../models/parcAUto/reparation';
import { SharedURLS } from '../../shared/shared-url';

@Injectable({
  providedIn: 'root'
})
export class ReparationServiceService {

  constructor(private http:HttpClient) { }

  all() :Observable<Reparation[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'list');
   }
   pageable(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<Reparation[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
  save(entree: Reparation):Observable<Reparation>{
   return  this.http.post<Reparation>(SharedURLS.Reparation+'new', entree , {responseType :'text' as  'json'}) ;
  }

  getById(id: number):Observable<Reparation>{
    return  this.http.get<Reparation>(SharedURLS.Reparation+'getById/'+id ) ;
   }
   update(id: number,Reparation:Reparation):Observable<Reparation>{
    return  this.http.put<Reparation>(SharedURLS.Reparation+'update/'+id, Reparation, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.Reparation+id,{responseType :'text' as  'json'}) ;
   }
   affectionVehicule(demande_id:number,vehicule_id:number):Observable<Reparation>{
    return  this.http.get<Reparation>(SharedURLS.Reparation+'affectionVehicule/'+demande_id+'/'+vehicule_id, {responseType :'text' as  'json'}) ;
   }
   livreVehicule(demande_id:number):Observable<Reparation>{
    return  this.http.get<Reparation>(SharedURLS.Reparation+'livreVehicule/'+demande_id, {responseType :'text' as  'json'}) ;
   }
   affectionvignette(demande_id:number,vehicule_id:string,solde:number):Observable<Reparation>{
    return  this.http.get<Reparation>(SharedURLS.Reparation+'affectionvignette/'+demande_id+'/'+vehicule_id+'/'+solde, {responseType :'text' as  'json'}) ;
   }
   
   affectionCarteJawaz(demande_id:number,vehicule_id:number):Observable<Reparation>{
    return  this.http.get<Reparation>(SharedURLS.Reparation+'affectionCarteJawaz/'+demande_id+'/'+vehicule_id, {responseType :'text' as  'json'}) ;
   }
   getallDemandeMisionVAlideBychefService(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'getallReparationVAlideBychefService/'+id+'?page='+page+'&size='+size);
   }
   getallDemandeMisionVAlideBychefDivison(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'getallReparationVAlideBychefDivison/'+id+'?page='+page+'&size='+size);
   }
   getallDemandeMisionVAlideByDirecteur(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'getallDemandeMisionVAlideByDirecteur/'+id+'?page='+page+'&size='+size);
   }
   getallDemandeMisionVAlideBycheflogistique(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'getallReparationVAlideBycheflogistique/'+id+'?page='+page+'&size='+size);
   }
   getallDemandeMisionaLIvrevehucile( page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'getallDemandeMisionaLIvrevehucile?page='+page+'&size='+size);
   }
   getallDemandeMisionReception( page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'getallDemandeMisionReception?page='+page+'&size='+size);
   }
  
   getallDemandeMisionVAlideBychefFinance(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'getallReparationVAlideBychefFinance/'+id+'?page='+page+'&size='+size);
   }
   
   getallDemandeMisionaffectionVoiture(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'getallDemandeMisionaffectionVoiture?page='+page+'&size='+size);
   }
   getallDemandeMisionaffectinCarte(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'getallDemandeMisionaffectinCarte?page='+page+'&size='+size);
   }
   getallDemandeMisionaffectionVignete(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'getallDemandeMisionaffectionVignete?page='+page+'&size='+size);
   }
   
   
   getallDemandeMisionNotaffectionVoiture(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'getallDemandeMisionNotaffectionVoiture?page='+page+'&size='+size);
   }
   getallDemandeMisionaByStatusNotDeleted(statut:any,page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'getallReparationaByStatusNotDeleted/'+statut+'?page='+page+'&size='+size);
   }
   getallDemandeMisionaByStatusAndFoncionaireNotDeleted(fonctionaire:any, statut:any,page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Reparation[]>(SharedURLS.Reparation+'getallReparationByStatusAndFoncionaireNotDeleted/'+fonctionaire+'/'+statut+'?page='+page+'&size='+size);
   }
   
   getCountDemandeMision() :Observable<any>{
    return  this.http.get<number[]>(SharedURLS.Reparation+'count');
   }

   validerMision(validationMision:any){
    return  this.http.post<number[]>(SharedURLS.Reparation+'validerReparation',validationMision,{responseType :'text' as  'json'});
   }
   ReceptionVihucle(validationMision:any){
    return  this.http.post<number[]>(SharedURLS.Reparation+'ReceptionVihucle',validationMision,{responseType :'text' as  'json'});
   }
   
   TransfertMission(id:number, statut:number){
    return  this.http.get(SharedURLS.Reparation+'transfertMission/'+id+"/"+statut,{responseType :'text' as  'json'});
   }

   generateDocumentMession(id:number){
    window.open(SharedURLS.Reparation+'generateDocumentReparation/'+id )
   }
}
