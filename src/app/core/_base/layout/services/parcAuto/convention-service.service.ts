import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Convention } from '../../models/parcAUto/convention';
import { SharedURLS } from '../../shared/shared-url';

@Injectable({
  providedIn: 'root'
})
export class ConventionServiceService {

  constructor(private http:HttpClient) { }

  all() :Observable<Convention[]>{
    return  this.http.get<Convention[]>(SharedURLS.Convention+'list');
   }
   findAllByType(type:String) :Observable<Convention[]>{
    return  this.http.get<Convention[]>(SharedURLS.Convention+'findAllByType/'+type);
   }
   
   pageable(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Convention[]>(SharedURLS.Convention+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<Convention[]>{
    return  this.http.get<Convention[]>(SharedURLS.Convention+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
  save(entree: Convention):Observable<Convention>{
   return  this.http.post<Convention>(SharedURLS.Convention+'new', entree , {responseType :'text' as  'json'}) ;
  }

  getById(id: number):Observable<Convention>{
    return  this.http.get<Convention>(SharedURLS.Convention+'getById/'+id ) ;
   }
   update(id: number,Convention:Convention):Observable<Convention>{
    return  this.http.put<Convention>(SharedURLS.Convention+'update/'+id, Convention, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.Convention+id,{responseType :'text' as  'json'}) ;
   }

  }
   

   
   


