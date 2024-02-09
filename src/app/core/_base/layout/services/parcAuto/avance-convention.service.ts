import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvanceConvention } from '../../models/parcAUto/avance-convention';
import { SharedURLS } from '../../shared/shared-url';

@Injectable({
  providedIn: 'root'
})
export class AvanceConventionService {

  constructor(private http:HttpClient) { }

  all() :Observable<AvanceConvention[]>{
    return  this.http.get<AvanceConvention[]>(SharedURLS.AvanceConvention+'list');
   }
   findAllByType(type:String) :Observable<AvanceConvention[]>{
    return  this.http.get<AvanceConvention[]>(SharedURLS.AvanceConvention+'findAllByType/'+type);
   }
   
   pageable(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<AvanceConvention[]>(SharedURLS.AvanceConvention+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<AvanceConvention[]>{
    return  this.http.get<AvanceConvention[]>(SharedURLS.AvanceConvention+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
  save(entree: AvanceConvention):Observable<AvanceConvention>{
   return  this.http.post<AvanceConvention>(SharedURLS.AvanceConvention+'new', entree , {responseType :'text' as  'json'}) ;
  }

  getById(id: number):Observable<AvanceConvention>{
    return  this.http.get<AvanceConvention>(SharedURLS.AvanceConvention+'getById/'+id ) ;
   }
   update(id: number,AvanceConvention:AvanceConvention):Observable<AvanceConvention>{
    return  this.http.put<AvanceConvention>(SharedURLS.AvanceConvention+'update/'+id, AvanceConvention, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.AvanceConvention+id,{responseType :'text' as  'json'}) ;
   }

  }

