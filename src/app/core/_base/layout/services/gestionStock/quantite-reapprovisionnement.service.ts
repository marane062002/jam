import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuantiteReapprovisionnement } from '../../models/quantite-reapprovisionnement';
import { SharedURLS } from '../../shared/shared-url';


@Injectable({
  providedIn: 'root'
})
export class QuantiteReapprovisionnementService {


  constructor(private http:HttpClient) { }

  all() :Observable<QuantiteReapprovisionnement[]>{
    return  this.http.get<QuantiteReapprovisionnement[]>(SharedURLS.quantiteReapprovisionnement+'list');
   }
   pageable(page: number ,  size:number) :Observable<QuantiteReapprovisionnement[]>{
    return  this.http.get<QuantiteReapprovisionnement[]>(SharedURLS.quantiteReapprovisionnement+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<QuantiteReapprovisionnement[]>{
    return  this.http.get<QuantiteReapprovisionnement[]>(SharedURLS.quantiteReapprovisionnement+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }

   ///article/pageable?page=1&size=1
  save(entree: QuantiteReapprovisionnement):Observable<QuantiteReapprovisionnement>{
   return  this.http.post<QuantiteReapprovisionnement>(SharedURLS.quantiteReapprovisionnement+'new', entree , {responseType :'text' as  'json'}) ;
  }

  getById(id: number):Observable<QuantiteReapprovisionnement>{
    return  this.http.get<QuantiteReapprovisionnement>(SharedURLS.quantiteReapprovisionnement+'getById/'+id ) ;
   }
   update(id: number,quantiteReapprovisionnement:QuantiteReapprovisionnement):Observable<QuantiteReapprovisionnement>{
    return  this.http.put<QuantiteReapprovisionnement>(SharedURLS.quantiteReapprovisionnement+'update/'+id, quantiteReapprovisionnement, {responseType :'text' as  'json'}) ;
   }
   
  
}
