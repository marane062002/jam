import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleStock } from '../../models/article-stock';
import { MAgasin } from '../../models/magasin';
import { SharedURLS } from '../../shared/shared-url';

@Injectable({
  providedIn: 'root'
})
export class MagasinService {


  constructor(private http:HttpClient) { }

  all() :Observable<MAgasin[]>{
    return  this.http.get<MAgasin[]>(SharedURLS.magasin+'list');
   }
  save(article: MAgasin):Observable<MAgasin>{
   return  this.http.post<MAgasin>(SharedURLS.magasin+'new', article,{responseType :'text' as  'json'});
  }
  saveArtickeStock(article: ArticleStock[]):Observable<any>{
    return  this.http.post<any>(SharedURLS.magasin+'newArticle', article,{responseType :'text' as  'json'});
   }
  pageable(page: number ,  size:number) :Observable<MAgasin[]>{
    return  this.http.get<MAgasin[]>(SharedURLS.magasin+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<MAgasin[]>{
    return  this.http.get<MAgasin[]>(SharedURLS.magasin+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
}
update(id: number,magasin:MAgasin):Observable<MAgasin>{
  return  this.http.put<MAgasin>(SharedURLS.magasin+'update/'+id, magasin, {responseType :'text' as  'json'}) ;
 }
 delete(id: number):Observable<any>{
  return  this.http.delete(SharedURLS.magasin+id,{responseType :'text' as  'json'}) ;
 }
 getMagasin(id: number):Observable<MAgasin>{
  return  this.http.get<MAgasin>(SharedURLS.magasin+id);
 }
}