import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { Entree } from '../../models/entree';
import { EntreeArticleStock } from '../../models/entree-article-stock';
import { SharedURLS } from '../../shared/shared-url';


@Injectable({
  providedIn: 'root'
})
export class EntreeStockService {

  constructor( private http:HttpClient) { }

  all() :Observable<Entree[]>{
    return  this.http.get<Entree[]>(SharedURLS.entreeStock+'list');
   }
   pageable(page: number ,  size:number) :Observable<Entree[]>{
    return  this.http.get<Entree[]>(SharedURLS.entreeStock+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<Entree[]>{
    return  this.http.get<Entree[]>(SharedURLS.entreeStock+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }

   ///article/pageable?page=1&size=1
  save(entree: Entree):Observable<Entree>{
   return  this.http.post<Entree>(SharedURLS.entreeStock+'new', entree , {responseType :'text' as  'json'}) ;
  }
  saveArticlewithQte(entree: EntreeArticleStock[]):Observable<Entree>{
    return  this.http.post<Entree>(SharedURLS.entreeArticleStock+'new', entree , {responseType :'text' as  'json'}) ;
   }
  getById(id: number):Observable<Entree>{
    return  this.http.get<Entree>(SharedURLS.entreeStock+'getById/'+id ) ;
   }

   getBonReceptionById(id: number){

    window.open(SharedURLS.entreeStock+'generateBonRection/'+id )
   // return  this.http.get(SharedURLS.entreeStock+'generateBonRection/'+id ) ;
   }

   allArticleByEntree(entree:number):Observable<EntreeArticleStock[]>{
    return  this.http.get<EntreeArticleStock[]>(SharedURLS.entreeArticleStock+'list/'+entree) ;
   }

   update(id: number,entite:Entree):Observable<Entree>{
    return  this.http.put<Entree>(SharedURLS.entreeStock+'update/'+id, entite, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.entreeStock+id,{responseType :'text' as  'json'});
   }
   
}
