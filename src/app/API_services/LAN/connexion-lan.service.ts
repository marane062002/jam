import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Connexion} from "../../API_Models/Connexion";
import {Observable} from "rxjs";
import {ConnexionLAN} from "../../API_Models/ConnexionLAN";

@Injectable({
  providedIn: 'root'
})
export class ConnexionLANService {
	private baseURL = "http://localhost:8080/LAN/Connexion-LAN";

	constructor(private http: HttpClient) {}

	saveConnexionLAN(connexion: ConnexionLAN): Observable<ConnexionLAN> {
		return this.http.post<ConnexionLAN>(`${this.baseURL}/save`, connexion);
	}

	updateConnexionLAN(id: number,connexion: ConnexionLAN): Observable<ConnexionLAN> {
		return this.http.put<ConnexionLAN>(`${this.baseURL}/update/${id}`, connexion);
	}

	getAllConnexionLANs(): Observable<ConnexionLAN[]> {
		return this.http.get<ConnexionLAN[]>(`${this.baseURL}/get/all`);
	}

	getAllConnexionLANsPagination(nextPage: number, pageSize: number): Observable<ConnexionLAN[]> {
		return this.http.get<ConnexionLAN[]>(`${this.baseURL}/get/all/pagination/?nextPage=${nextPage}&pageSize=${pageSize}`);
	}

	getConnexionLANByID(id: number): Observable<ConnexionLAN> {
		return this.http.get<ConnexionLAN>(`${this.baseURL}/get/${id}`);
	}
	deleteConnexionLANByID(id: number): Observable<ConnexionLAN> {
		return this.http.delete<ConnexionLAN>(`${this.baseURL}/delete/${id}`);
	}
}

