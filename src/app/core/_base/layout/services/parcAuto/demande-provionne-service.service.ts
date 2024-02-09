import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeProvionne } from '../../models/demande-provionne';
import { SharedURLS } from '../../shared/shared-url';

@Injectable({
  providedIn: 'root'
})
export class DemandeProvionneServiceService {

  constructor(private http:HttpClient) { }
  all() :Observable<DemandeProvionne[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'list');
   }
   pageable(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<DemandeProvionne[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
  save(entree: DemandeProvionne):Observable<DemandeProvionne>{
   return  this.http.post<DemandeProvionne>(SharedURLS.DemandeProvionne+'new', entree , {responseType :'text' as  'json'}) ;
  }

  getById(id: number):Observable<DemandeProvionne>{
    return  this.http.get<DemandeProvionne>(SharedURLS.DemandeProvionne+'getById/'+id ) ;
   }
   update(id: number,DemandeProvionne:DemandeProvionne):Observable<DemandeProvionne>{
    return  this.http.put<DemandeProvionne>(SharedURLS.DemandeProvionne+'update/'+id, DemandeProvionne, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.DemandeProvionne+id,{responseType :'text' as  'json'}) ;
   }
   affectionVehicule(demande_id:number,vehicule_id:number):Observable<DemandeProvionne>{
    return  this.http.get<DemandeProvionne>(SharedURLS.DemandeProvionne+'affectionVehicule/'+demande_id+'/'+vehicule_id, {responseType :'text' as  'json'}) ;
   }
   affectionvignette(demande_id:number,vehicule_id:string):Observable<DemandeProvionne>{
    return  this.http.get<DemandeProvionne>(SharedURLS.DemandeProvionne+'affectionvignette/'+demande_id+'/'+vehicule_id, {responseType :'text' as  'json'}) ;
   }
   
   affectionMission(demande_id:number,vehicule_id:number):Observable<DemandeProvionne>{
    return  this.http.get<DemandeProvionne>(SharedURLS.DemandeProvionne+'affectionMission/'+demande_id+'/'+vehicule_id, {responseType :'text' as  'json'}) ;
   }
   getallDemandeMisionVAlideBychefService(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'getallDemandeMisionVAlideBychefService/'+id+'?page='+page+'&size='+size);
   }
   getallDemandeMisionVAlideBychefDivison(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'getallDemandeMisionVAlideBychefDivison/'+id+'?page='+page+'&size='+size);
   }
   getallDemandeMisionVAlideByDirecteur(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'getallDemandeMisionVAlideByDirecteur/'+id+'?page='+page+'&size='+size);
   }
   getallDemandeMisionVAlideBycheflogistique(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'getallDemandeMisionVAlideBycheflogistique/'+id+'?page='+page+'&size='+size);
   }
   getallDemandeMisionVAlideBychefFinance(id:any, page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'getallDemandeMisionVAlideBychefFinance/'+id+'?page='+page+'&size='+size);
   }
   getallDemandeMisionaffectionVoiture(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'getallDemandeMisionaffectionVoiture?page='+page+'&size='+size);
   }
   getallDemandeMisionaffectinCarte(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'getallDemandeMisionaffectinCarte?page='+page+'&size='+size);
   }
   getallDemandeMisionaffectionVignete(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'getallDemandeMisionaffectionVignete?page='+page+'&size='+size);
   }
   
   
   getallDemandeMisionNotaffectionVoiture(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'getallDemandeMisionNotaffectionVoiture?page='+page+'&size='+size);
   }
   getallDemandeMisionaByStatusNotDeleted(statut:any,page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'getallDemandeMisionaByStatusNotDeleted/'+statut+'?page='+page+'&size='+size);
   }
   getallDemandeMisionaByStatusAndFoncionaireNotDeleted(fonctionaire:any, statut:any,page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<DemandeProvionne[]>(SharedURLS.DemandeProvionne+'getallDemandeMisionaByStatusAndFoncionaireNotDeleted/'+fonctionaire+'/'+statut+'?page='+page+'&size='+size);
   }
   
   getCountDemandeMision() :Observable<any>{
    return  this.http.get<number[]>(SharedURLS.DemandeProvionne+'count');
   }

   validerMision(validationMision:any){
    return  this.http.post<number[]>(SharedURLS.DemandeProvionne+'validerDemandeProvionne',validationMision,{responseType :'text' as  'json'});
   }
   TransfertMission(id:number, statut:number){
    return  this.http.get(SharedURLS.DemandeProvionne+'transfertMission/'+id+"/"+statut,{responseType :'text' as  'json'});
   }
}
