import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../gestion-parc-auto/common/request/request-util';
import { environment } from '../../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GestionPeseeService {
	constructor(private http: HttpClient) { }
	private baseUrl = environment.API_MARCHEGROS


	
}
