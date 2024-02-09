import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from '../models/transfer';
import { TransferArticleStock } from '../models/transfer-article-stock';
import { SharedURLS } from '../shared/shared-url';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor( private http:HttpClient) { }

  all() :Observable<Transfer[]>{
    return  this.http.get<Transfer[]>(SharedURLS.transfer+'list');
   }
   findArticlestock(id:number) :Observable<TransferArticleStock[]>{
    return  this.http.get<TransferArticleStock[]>(SharedURLS.transfer+'findArticleStock/'+id);
   }
   pageable(page: number ,  size:number) :Observable<Transfer[]>{
    return  this.http.get<Transfer[]>(SharedURLS.transfer+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<Transfer[]>{
    return  this.http.get<Transfer[]>(SharedURLS.transfer+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
   ///article/pageable?page=1&size=1
  save(transfer: TransferArticleStock[]):Observable<Transfer>{
   return  this.http.post<Transfer>(SharedURLS.transfer+'new', transfer  , {responseType :'text' as  'json'}) ;
  }
  update(id: number,transfer:Transfer):Observable<Transfer>{
    return  this.http.put<Transfer>(SharedURLS.transfer+'update/'+id, transfer, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.transfer+id,{responseType :'text' as  'json'}) ;
   }
  getBonById(id: number){

    window.open(SharedURLS.transfer+'generateBonTransfer/'+id )
   // return  this.http.get(SharedURLS.entreeStock+'generateBonRection/'+id ) ;
   }
}
