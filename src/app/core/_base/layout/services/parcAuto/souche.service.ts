import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Souche } from '../../models/parcAUto/souche';
import { SharedURLS } from '../../shared/shared-url';

@Injectable({
  providedIn: 'root'
})
export class SoucheService {

  constructor(private http:HttpClient) { }

  all(id:number) :Observable<Souche[]>{
    return  this.http.get<Souche[]>(SharedURLS.Souche+'list/'+id);
   }
   pageable(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<Souche[]>(SharedURLS.Souche+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<Souche[]>{
    return  this.http.get<Souche[]>(SharedURLS.Souche+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
  save(entree: Souche[]):Observable<Souche>{
   return  this.http.post<Souche>(SharedURLS.Souche+'new', entree , {responseType :'text' as  'json'}) ;
  }

  getById(id: number):Observable<Souche>{
    return  this.http.get<Souche>(SharedURLS.Souche+'getById/'+id ) ;
   }
   update(id: number,Souche:Souche):Observable<Souche>{
    return  this.http.put<Souche>(SharedURLS.Souche+'update/'+id, Souche, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.Souche+id,{responseType :'text' as  'json'}) ;
   }
}
