import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransactionEtRecettesService {
  private baseUrl = environment.API_MARCHEGROS;;
  constructor(private http: HttpClient) { }

  
}
