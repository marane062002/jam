import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehiculeFonction } from '../../models/parcAUto/vehicule-fonction';
import { SharedURLS } from '../../shared/shared-url';

@Injectable({
  providedIn: 'root'
})
export class VehiculeFonctionService {

  constructor(private http:HttpClient) { }

  all() :Observable<VehiculeFonction[]>{
    return  this.http.get<VehiculeFonction[]>(SharedURLS.VehiculeFonction+'list');
   }
   findAllByType(type:String) :Observable<VehiculeFonction[]>{
    return  this.http.get<VehiculeFonction[]>(SharedURLS.VehiculeFonction+'findAllByType/'+type);
   }
   
   pageable(page: number ,  size:number) :Observable<any[]>{
    return  this.http.get<VehiculeFonction[]>(SharedURLS.VehiculeFonction+'pageable?page='+page+'&size='+size);
   }
   Keyword(page: number ,  size:number, keyword:number  ) :Observable<VehiculeFonction[]>{
    return  this.http.get<VehiculeFonction[]>(SharedURLS.VehiculeFonction+'keyWord?page='+page+'&size='+size+'&keyword='+keyword);
   }
  save(entree: VehiculeFonction):Observable<VehiculeFonction>{
   return  this.http.post<VehiculeFonction>(SharedURLS.VehiculeFonction+'new', entree , {responseType :'text' as  'json'}) ;
  }

  getById(id: number):Observable<VehiculeFonction>{
    return  this.http.get<VehiculeFonction>(SharedURLS.VehiculeFonction+'getById/'+id ) ;
   }
   update(id: number,VehiculeFonction:VehiculeFonction):Observable<VehiculeFonction>{
    return  this.http.put<VehiculeFonction>(SharedURLS.VehiculeFonction+'update/'+id, VehiculeFonction, {responseType :'text' as  'json'}) ;
   }
   delete(id: number):Observable<any>{
    return  this.http.delete(SharedURLS.VehiculeFonction+id,{responseType :'text' as  'json'}) ;
   }

}
