import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { Reference } from '../../models/reference';
import { SharedURLS } from '../../shared/shared-url';


@Injectable({
  providedIn: 'root'
})
export class RefernceService {

  
  constructor(private http:HttpClient) { }

  all() :Observable<Reference[]>{
    return  this.http.get<Reference[]>(SharedURLS.reference+'list');
   }
   pageable(page: number ,  size:number) :Observable<Reference[]>{
    return  this.http.get<Reference[]>(SharedURLS.reference+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<Reference[]>{
    return  this.http.get<Reference[]>(SharedURLS.reference+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
  save(entree: Reference):Observable<Reference>{
   return  this.http.post<Reference>(SharedURLS.reference+'new', entree , {responseType :'text' as  'json'}) ;
  }

  getById(id: number):Observable<Reference>{
    return  this.http.get<Reference>(SharedURLS.reference+'getById/'+id ) ;
   }
   update(id: number,Reference:Reference):Observable<Reference>{
    return  this.http.put<Reference>(SharedURLS.reference+'update/'+id, Reference, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.reference+id,{responseType :'text' as  'json'}) ;
   }
}
