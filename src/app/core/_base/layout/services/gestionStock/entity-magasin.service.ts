import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityMagasin } from '../../models/entity-magasin';
import { SharedURLS } from '../../shared/shared-url';



@Injectable({
  providedIn: 'root'
})
export class EntityMagasinService {

  constructor(private http:HttpClient) { }

  all() :Observable<EntityMagasin[]>{
    return  this.http.get<EntityMagasin[]>(SharedURLS.entiteMagasin+'list');
   }
   pageable(page: number ,  size:number) :Observable<EntityMagasin[]>{
    return  this.http.get<EntityMagasin[]>(SharedURLS.entiteMagasin+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:string  ) :Observable<EntityMagasin[]>{
    return  this.http.get<EntityMagasin[]>(SharedURLS.entiteMagasin+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
   ///article/pageable?page=1&size=1
  save(entityMagasinfer: EntityMagasin):Observable<EntityMagasin>{
   return  this.http.post<EntityMagasin>(SharedURLS.entiteMagasin+'new', entityMagasinfer  , {responseType :'text' as  'json'}) ;
  }
  update(id: number,EntityMagasin:EntityMagasin):Observable<EntityMagasin>{
    return  this.http.put<EntityMagasin>(SharedURLS.entiteMagasin+'update/'+id, EntityMagasin, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.entiteMagasin+id,{responseType :'text' as  'json'}) ;
   }
}
