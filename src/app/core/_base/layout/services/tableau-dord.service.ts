import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedURLS } from '../shared/shared-url';

@Injectable({
  providedIn: 'root'
})
export class TableauDordService {

  constructor(private http:HttpClient) { }

  getTableauDordGestionStokc() :Observable<any>{
    return  this.http.get<any>(SharedURLS.tableauDord);
   }
}
