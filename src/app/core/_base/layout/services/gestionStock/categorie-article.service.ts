import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorieArticle } from '../../models/categorie-article';
import { SharedURLS } from '../../shared/shared-url';
@Injectable({
  providedIn: 'root'
})
export class CategorieArticleService {

  constructor(  private http:HttpClient) { }

  all() :Observable<any>{
    return  this.http.get<any>(SharedURLS.CategorieArticle+'pageable');
   }
  save(categorie: CategorieArticle):Observable<CategorieArticle>{
   return  this.http.post<CategorieArticle>(SharedURLS.CategorieArticle+'new', categorie,{responseType :'text' as  'json'});
  }
  pageable(page: number ,  size:number) :Observable<CategorieArticle[]>{
    return  this.http.get<CategorieArticle[]>(SharedURLS.CategorieArticle+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:string  ) :Observable<CategorieArticle[]>{
    return  this.http.get<CategorieArticle[]>(SharedURLS.CategorieArticle+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
   update(id: number,CategorieArticle:CategorieArticle):Observable<CategorieArticle>{
    return  this.http.put<CategorieArticle>(SharedURLS.CategorieArticle+'update/'+id, CategorieArticle, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.CategorieArticle+id,{responseType :'text' as  'json'}) ;
   }
}
