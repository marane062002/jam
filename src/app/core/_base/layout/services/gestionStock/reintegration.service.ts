import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { Reintegration } from '../../models/reintegration';
import { ReintegrationArticleStock } from '../../models/reintegration-article-stock';
import { SharedURLS } from '../../shared/shared-url';


@Injectable({
  providedIn: 'root'
})
export class ReintegrationService {

  constructor(private http:HttpClient) { }

  all() :Observable<Reintegration[]>{
    return  this.http.get<Reintegration[]>(SharedURLS.reitegration+'list');
   }
   findArticlestock(id:number) :Observable<ReintegrationArticleStock[]>{
    return  this.http.get<ReintegrationArticleStock[]>(SharedURLS.reitegration+'findArticleStock/'+id);
   }
   pageable(page: number ,  size:number) :Observable<Reintegration[]>{
    return  this.http.get<Reintegration[]>(SharedURLS.reitegration+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<Reintegration[]>{
    return  this.http.get<Reintegration[]>(SharedURLS.reitegration+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }

   ///article/pageable?page=1&size=1
  save(entree: ReintegrationArticleStock[]):Observable<Reintegration>{
   return  this.http.post<Reintegration>(SharedURLS.reitegration+'new', entree , {responseType :'text' as  'json'}) ;
  }
  update(id: number,reitegration:Reintegration):Observable<Reintegration>{
    return  this.http.put<Reintegration>(SharedURLS.reitegration+'update/'+id, reitegration, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.reitegration+id,{responseType :'text' as  'json'}) ;
   }
  getById(id: number):Observable<Reintegration>{
    return  this.http.get<Reintegration>(SharedURLS.reitegration+'getById/'+id ) ;
   }

   getBonById(id: number){

    window.open(SharedURLS.reitegration+'generateBonReintegration/'+id )
   // return  this.http.get(SharedURLS.entreeStock+'generateBonRection/'+id ) ;
   }

}
