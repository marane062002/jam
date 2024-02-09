import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Emballage } from '../../../../core/_base/layout/models/emballage';
import { createRequestOption } from '../../gestion-parc-auto/common/request/request-util';

@Injectable({
  providedIn: 'root'
})
export class MarchandiseEtCarreauxService {
  private baseUrl = environment.API_MARCHEGROS;;
  constructor(private http: HttpClient) { }

  

}
