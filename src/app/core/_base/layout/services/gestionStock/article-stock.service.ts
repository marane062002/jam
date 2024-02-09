import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleStock } from '../../models/article-stock';
import { SharedURLS } from '../../shared/shared-url';
import { createRequestOption } from '../../../../../core/request/request-util';




@Injectable({
  providedIn: 'root'
})
export class ArticleStockService {

  constructor(private http:HttpClient) { }

  AllArticleStockByMagasin(id: number):Observable<ArticleStock[]>{
    return  this.http.get<ArticleStock[]>(SharedURLS.articleStock+'list/'+id) ;
   }
   pageable(req?:any) :Observable<any>{
    const options = createRequestOption(req);
    let headers = new HttpHeaders().set("content-type", "application/json").set("Access-Control-Allow-Origin", "*");
    return  this.http.get<any[]>(SharedURLS.articleStock+'pageable', { params: options, observe: "response", headers: headers });
   }
   list(req?:any) :Observable<any>{
    const options = createRequestOption(req);
    let headers = new HttpHeaders().set("content-type", "application/json").set("Access-Control-Allow-Origin", "*");
    return  this.http.get<any[]>(SharedURLS.article+'list', { withCredentials: true });
   }

  deleteALL(articles: ArticleStock[]){
    return  this.http.post(SharedURLS.articleStock+'deleteALL',articles,{responseType :'text' as  'json'}) ;
   }
   findAllWithCreationDateTimeBefore(id:number):Observable<ArticleStock[]>{
    return  this.http.get<ArticleStock[]>(SharedURLS.articleStock+'findAllWithCreationDateTimeBefore/'+id) ;
   }
   ArticleStockById(id: number):Observable<ArticleStock>{
    return  this.http.get<ArticleStock>(SharedURLS.articleStock+id) ;
   }
   listArticleByMagasinAndQuantite(id: number):Observable<ArticleStock[]>{
    return  this.http.get<ArticleStock[]>(SharedURLS.articleStock+'listArticleByMagasinAndQuantite/'+id) ;
   }
   findArticleStockByMagasinAndCategorieArtcile(id: number, categorie:number):Observable<ArticleStock[]>{
    return  this.http.get<ArticleStock[]>(SharedURLS.articleStock+'findArticleStockByMagasinAndCategorieArtcile/'+id+'/'+categorie) ;
   }
   update(id: number,article:ArticleStock):Observable<ArticleStock>{
    return  this.http.put<ArticleStock>(SharedURLS.articleStock+'update/'+id, article, {responseType :'text' as  'json'}) ;
   }
   
}
