import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Agent} from "../../API_Models/Agent";

@Injectable({
  providedIn: 'root'
})
export class AgentService {
		private baseURL = "http://localhost:8080/GSM/Agent";

	constructor(private http: HttpClient) {}

	saveAgent(agent: Agent): Observable<Agent> {
		return this.http.post<Agent>(`${this.baseURL}/save`, agent);
	}

	updateAgent(id: number,agent: Agent): Observable<Agent> {
		return this.http.put<Agent>(`${this.baseURL}/update/${id}`, agent);
	}

	getAllAgents(): Observable<Agent[]> {
		return this.http.get<Agent[]>(`${this.baseURL}/get/all`);
	}

	getAllAgentsPagination(nextPage: number, pageSize: number): Observable<Agent[]> {
		return this.http.get<Agent[]>(`${this.baseURL}/get/all/pagination?nextPage=${nextPage}&pageSize=${pageSize}`);
	}

	getAgentByID(id: number): Observable<Agent> {
		return this.http.get<Agent>(`${this.baseURL}/get/id?idAgent=${id}`);
	}
	deleteAgentByID(id: number): Observable<Agent> {
		return this.http.delete<Agent>(`${this.baseURL}/delete/id?idAgent=${id}`);
	}
}

