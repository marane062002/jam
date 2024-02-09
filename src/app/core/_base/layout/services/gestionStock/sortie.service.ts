import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { Sortie } from '../../models/sortie';
import { SharedURLS } from '../../shared/shared-url';


@Injectable({
  providedIn: 'root'
})
export class SortieService {

  constructor(  private http:HttpClient) { }

  all() :Observable<Sortie[]>{
    return  this.http.get<Sortie[]>(SharedURLS.sortie+'list');
   }
   pageable(page: number ,  size:number) :Observable<Sortie[]>{
    return  this.http.get<Sortie[]>(SharedURLS.sortie+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<Sortie[]>{
    return  this.http.get<Sortie[]>(SharedURLS.sortie+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
   ///article/pageable?page=1&size=1
  save(sortie: Sortie):Observable<Sortie>{
   return  this.http.post<Sortie>(SharedURLS.sortie+'new', sortie  , {responseType :'text' as  'json'}) ;
  }

  getBonSortieById(id: number){

    window.open(SharedURLS.sortie+'generateBonSortie/'+id )
   // return  this.http.get(SharedURLS.entreeStock+'generateBonRection/'+id ) ;
   }
   getById(id){
    return  this.http.get<Sortie>(SharedURLS.sortie+id);
   }

}
