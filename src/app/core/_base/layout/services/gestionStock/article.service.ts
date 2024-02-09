import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../models/article';
import { SharedURLS } from '../../shared/shared-url';
import { environment } from '../../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  protected resourceUrl = environment.SERVER_URL_Stock;
token = localStorage.getItem('accessToken')
  constructor( private http:HttpClient) { }

  
     all1():Observable<any>{

      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(this.resourceUrl+'Stock/article/list',{ headers });
  }

  all3():Observable<any>{

  return this.http.get<any>(this.resourceUrl+'Stock/article/pageable');
}

  pageable(page: number ,  size:number):Observable<any> {
		let headers = new HttpHeaders().set("content-type", "application/json").set("Access-Control-Allow-Origin", "*");

    return this.http.get<any>(SharedURLS.article+'pageable?page='+page+'&size='+size, {  observe: "response", headers: headers });
   }


  //  async pages(page: number ,  size:number) {
  //   let headers = new HttpHeaders().set("content-type", "application/json").set("Access-Control-Allow-Origin", "*");
  //   return await this.http.get<any>('http://localhost:9101/Stock/article/list?page='+page+'&size='+size).toPromise();
  // }
  
   findAllVignete(page: number ,  size:number) :Observable<Article[]>{
    return  this.http.get<Article[]>(SharedURLS.article+'findAllVignete?page='+page+'&size='+size);
   }
   
   findAllByids(ids:any) :Observable<Article[]>{
    return  this.http.get<Article[]>(SharedURLS.article+'findAllByids/'+ids);
   }
   updateVignetteStatus(ids:any) :Observable<Article[]>{
    return  this.http.get<Article[]>(SharedURLS.article+'updateVignetteStatus/'+ids);
   }
   updateStatusVignette(ids:any) :Observable<Article[]>{
    return  this.http.get<Article[]>(SharedURLS.article+'updateStatusVignette/'+ids,{responseType :'text' as  'json'});
   }
   
   
   findAllVignetes() :Observable<Article[]>{
    return  this.http.get<Article[]>(SharedURLS.article+'findAllVignetes');
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<Article[]>{
    return  this.http.get<Article[]>(SharedURLS.article+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
   getByCategorieArticle( id:number  ) :Observable<any>{
    return  this.http.get<any>(SharedURLS.article+'ByCategorieArticle/'+id,{responseType :'text' as  'json'});
   }
   getByFornisseur( id:number  ) :Observable<Article[]>{
    return  this.http.get<Article[]>(SharedURLS.article+'findByFornissuer/'+id);
   }
   ///article/pageable?page=1&size=1
  save(article: Article):Observable<Article>{
   return  this.http.post<Article>(SharedURLS.article+'new', article , {responseType :'text' as  'json'}) ;
  }
  saveVignette(article: any):Observable<any>{
    return  this.http.post<any>(SharedURLS.article+'saveVignette', article , {responseType :'text' as  'json'}) ;
   }
  getById(id: number):Observable<Article>{
    return  this.http.get<Article>(SharedURLS.article+'getById/'+id ) ;
   }
   
   ficheMagasin(id: number,magasin_id:number){
    window.open(SharedURLS.article+'ficheMagasin/'+id+'/'+magasin_id )
   }
   update(id: number,Article:Article):Observable<Article>{
    return  this.http.put<Article>(SharedURLS.article+'update/'+id, Article, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.article+id,{responseType :'text' as  'json'}) ;
   }

 
}
