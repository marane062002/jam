import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormControl } from "@angular/forms";

@Component({
	selector: "kt-program-visit",
	templateUrl: "./program-visit.component.html",
	styleUrls: ["./program-visit.component.scss"],
})
export class ProgramVisitComponent implements OnInit {
	
	etabControl = new FormControl();
	typeControl = new FormControl();
	stypeControl = new FormControl();
    conventionControl = new FormControl();
	agentControl = new FormControl();
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	etabliste : any[] = [];
	type : any[] = [];
	stype : any [] = [];
	convention : any[] = [];
	agent : any[] = [];
	date : any;
	motifVisite : any;
	private baseUrl = environment.API_BMH_URL;
	constructor(private router: Router, private httpClient: HttpClient) {}

	ngOnInit() {
      this.SousTypes();
	  this.fetchAgent();
	  this.fetchConvention();
	  this.fetchEtab();
	  this.fetchTypes()
	}

	private fetchTypes(): void {
		this.httpClient.get<any[]>(`${this.baseUrl}typectrl`,{ headers: this.headers }).subscribe(
		  (response) => {
			this.type = response;
		  },
		  (error) => {
			console.error("Error fetching types:", error);
		  }
		);
	  }
	  private SousTypes(): void {
		this.httpClient.get<any[]>(`${this.baseUrl}soustype`,{ headers: this.headers }).subscribe(
		  (response) => {
			this.stype = response;
		  },
		  (error) => {
			console.error("Error fetching types:", error);
		  }
		);
	  }
	  private fetchConvention(): void {
		this.httpClient.get<any[]>(`${this.baseUrl}convention`,{ headers: this.headers }).subscribe(
		  (response) => {
			this.convention = response;
		  },
		  (error) => {
			console.error("Error fetching types:", error);
		  }
		);
	  }
	  private fetchAgent(): void {
		this.httpClient.get<any[]>(`${this.baseUrl}agent`,{ headers: this.headers }).subscribe(
		  (response) => {
			this.agent = response;
		  },
		  (error) => {
			console.error("Error fetching types:", error);
		  }
		);
	  }
	  private fetchEtab(): void {
		this.httpClient.get<any[]>(`${this.baseUrl}listEtb`,{ headers: this.headers }).subscribe(
		  (response) => {
			this.etabliste = response;
		  },
		  (error) => {
			console.error("Error fetching types:", error);
		  }
		);
	  }
	  saveProgramme(): void {
		const data: any = {
		  date: this.date,
		  motifVisite: this.motifVisite,
		  convention: { id: this.conventionControl.value },
		  typeAnalyse: { id: this.typeControl.value },
		  sousType: { id: this.stypeControl.value },
		  listEtablissements: this.etabControl.value.map((id: number) => ({ id })),
		  agents: this.agentControl.value.map((id: number) => ({ id })),
		};
	  
		console.log(data);
		this.httpClient.post<any>(`${this.baseUrl}programme`, data,{ headers: this.headers }).subscribe(
			(response) => {
				console.log("Programme created successfully:", response);
				this.router.navigate(["/etablissement/list-programme"]);
			},
			(error) => {
				console.error("Error creating etablissement:", error);
			}
		);
	  }
	  
	RetourEmbalages() {
		this.router.navigate(["/etablissement/list-programme"]);
	}

	Suivant() {
		this.router.navigate(["pages/Etablissement/list-visite"]);
	}
}
