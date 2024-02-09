import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventaire } from '../../models/inventaire';
import { SharedURLS } from '../../shared/shared-url';


@Injectable({
  providedIn: 'root'
})
export class InventaireService {

  constructor(private http:HttpClient) { }

  all() :Observable<Inventaire[]>{
    return  this.http.get<Inventaire[]>(SharedURLS.inventaire+'list');
   }
   pageable(page: number ,  size:number) :Observable<Inventaire[]>{
    return  this.http.get<Inventaire[]>(SharedURLS.inventaire+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<Inventaire[]>{
    return  this.http.get<Inventaire[]>(SharedURLS.inventaire+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
   ///article/pageable?page=1&size=1
  save(Inventaire: Inventaire):Observable<Inventaire>{
   return  this.http.post<Inventaire>(SharedURLS.inventaire+'new', Inventaire  , {responseType :'text' as  'json'}) ;
  }

 
}
