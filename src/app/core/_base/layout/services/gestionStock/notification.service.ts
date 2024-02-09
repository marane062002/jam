import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedURLS } from '../../shared/shared-url';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  all() :Observable<Notification[]>{
    return  this.http.get<Notification[]>(SharedURLS.notification+'list');
   }
  save(article: Notification):Observable<Notification>{
   return  this.http.post<Notification>(SharedURLS.notification+'new', article,{responseType :'text' as  'json'});
  }
  delete(id: number):Observable<Notification>{
    return  this.http.delete<Notification>(SharedURLS.notification+id,{responseType :'text' as  'json'});
   }
}
