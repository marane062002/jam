import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PersonnelService } from '../rh/services/personnel.service';



@Injectable({
  providedIn: 'root'
})
export class OrganisationService {


  private baseUrl = environment.organisationUrl;

  constructor(private http: HttpClient,
    private personnelService: PersonnelService,) { }

  public getDivisions(): Observable<any> {

    let divisions = this.http.get(this.baseUrl + '/divisions/index').toPromise();
    return forkJoin([divisions]);
  }
  public getDivisionServices(id): Observable<any> {

    return this.http.get(this.baseUrl + '/services/divisions/' + id);
  }

  public getRessource(url): Observable<any> {

    return this.http.get(this.baseUrl + url);
  }

  public getRessourceById(id: number, url): Observable<any> {
    return this.http.get<any>(this.baseUrl + url + id);
  }

  public postRessource(ressource: Object, url): Observable<Object> {
    return this.http.post(this.baseUrl + url, ressource);
  }

  public deleteRessource(id: number, url): Observable<any> {
    return this.http.delete(this.baseUrl + url + id, { responseType: 'text' });
  }

  public updateRessource(ressource: Object, id: number, url): Observable<Object> {
    return this.http.put(this.baseUrl + url + id, ressource);
  }
  public getDivisionServicesAndPersonnels(id): Observable<any> {
    let services = this.getDivisionServices(id)
    let personnels = this.personnelService.getPersonnelsByDivision(id)

    return forkJoin([services, personnels]);
  }
  public findEntityById(id: number, url): Observable<any> {
    return this.http.get<any>(this.baseUrl + url + id);
  }

}
