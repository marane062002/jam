import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ISousEntite } from '../models/sous-entite';
import { SharedURLS } from '../shared/shared-url';
export type SousEntiteArrayResponse = HttpResponse<ISousEntite[]>;
@Injectable({
  providedIn: 'root'
})
export class SousEntiteService {

}
