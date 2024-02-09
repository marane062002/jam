import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from '../../models/fournisseur';
import { SharedURLS } from '../../shared/shared-url';



@Injectable({
  providedIn: 'root'
})
export class FournisseursService {

  constructor(private http:HttpClient) { }

  all(): Observable<any> {
    return this.http.get<Fournisseur[]>(SharedURLS.fournisseur+'list');
   }
   pageable(page: number ,  size:number) :Observable<Fournisseur[]>{
    return  this.http.get<Fournisseur[]>(SharedURLS.fournisseur+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<Fournisseur[]>{
    return  this.http.get<Fournisseur[]>(SharedURLS.fournisseur+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
   getByCategorieArticle( id:number  ) :Observable<Fournisseur[]>{
    return  this.http.get<Fournisseur[]>(SharedURLS.fournisseur+'/ByCategorieArticle/'+id);
   }
   ///article/pageable?page=1&size=1
  save(fournisseur: Fournisseur):Observable<Fournisseur>{
   return  this.http.post<Fournisseur>(SharedURLS.fournisseur+'new', fournisseur , {responseType :'text' as  'json'}) ;
  }
  getById(id: number):Observable<Fournisseur>{
    return  this.http.get<Fournisseur>(SharedURLS.fournisseur+'getById/'+id ) ;
   }
    update(id: number,fournisseur:Fournisseur):Observable<Fournisseur>{
    return  this.http.put<Fournisseur>(SharedURLS.fournisseur+'update/'+id, fournisseur, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.fournisseur+id,{responseType :'text' as  'json'}) ;
   }
}
