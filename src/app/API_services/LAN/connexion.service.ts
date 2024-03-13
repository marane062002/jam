import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Connexion} from "../../API_Models/Connexion";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
	private baseURL = "http://localhost:8080/LAN/parametrage-connexions";

	constructor(private http: HttpClient) {}

	saveConnexion(connexion: Connexion): Observable<Connexion> {
		return this.http.post<Connexion>(`${this.baseURL}/save`, connexion);
	}

	updateConnexion(id: number,connexion: Connexion): Observable<Connexion> {
		return this.http.put<Connexion>(`${this.baseURL}/update/${id}`, connexion);
	}

	getAllConnexions(): Observable<Connexion[]> {
		return this.http.get<Connexion[]>(`${this.baseURL}/get/all`);
	}

	getAllConnexionsPagination(nextPage: number, pageSize: number): Observable<Connexion[]> {
		return this.http.get<Connexion[]>(`${this.baseURL}/get/all/pagination?nextPage=${nextPage}&pageSize=${pageSize}`);
	}

	getConnexionByID(id: number): Observable<Connexion> {
		return this.http.get<Connexion>(`${this.baseURL}/get/id?idConnexion=${id}`);
	}
	/*deleteConnexionByID(id: number): Observable<Connexion> {
		return this.http.delete<Connexion>(`${this.baseURL}/delete/id?idConnexion=${id}`);
	}*/
}

