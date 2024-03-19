import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueEtablissementService {
  baseUrl=environment.API_BMH_URL

  // private baseUrl = 'http://localhost:8080/statistique'; // Endpoint de votre backend

  constructor(private http: HttpClient) { }

  // Récupérer le nombre d'établissements contrôlés par arrondissement
  getNombreEtablissementsControlesParArrondissement(params): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`+'statistique', { params });
  }

  // Récupérer les statistiques par arrondissement (état d'hygiène)
 getStatistiquesParArrondissement(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`+'statistique/arrondissements');
  } totalEtatHg

  getStatistiquesParNature(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`+'statistique/nature');
  } 

  getStatistiquesParMesures(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`+'statistique/mesures');
  }

  getStatistiquesParUnite(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`+'statistique/unite');
  }

  getSommeMesuresParArrondissement(): Observable<any> {
    
    return this.http.get<any>(`${this.baseUrl}statistique/totalMesure`);
  }
  getSommeMesuresParUnite(): Observable<any> {
    
    return this.http.get<any>(`${this.baseUrl}statistique/totalUnite`);
  }
  getSommeMesuresParEtatHg(): Observable<any> {
    
    return this.http.get<any>(`${this.baseUrl}statistique/totalEtatHg`);
  }
  getSommeMesuresParNature(): Observable<any> {
    
    return this.http.get<any>(`${this.baseUrl}statistique/totalNature`);
  }
  getEtablissements(dateDebut: string, dateFin: string): Observable<any> {
    // Set the request parameters
    const params = new HttpParams()
      .set('dateDebut', dateDebut)
      .set('dateFin', dateFin);

    // Make the GET request
    return this.http.get<any>(this.baseUrl+'/searchEtablissement', { params });
  }
}
