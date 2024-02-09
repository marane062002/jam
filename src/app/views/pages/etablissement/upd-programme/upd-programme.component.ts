import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormControl } from "@angular/forms";
@Component({
	selector: "kt-upd-programme",
	templateUrl: "./upd-programme.component.html",
	styleUrls: ["./upd-programme.component.scss"],
})
export class UpdProgrammeComponent implements OnInit {
	progarmmeDetails: any;
	progarammeId: any;

	etablisteControl = new FormControl();
	typeControl = new FormControl();
	conventionControl = new FormControl() ;
	sousTypeControl = new FormControl();
	agentControl = new FormControl();

	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
    
	datef: Date;
    motifV : any;
	date : any;
	etabliste : any[] = [];
	type : any[] = [];
	stype : any [] = [];
	convention : any[] = [];
	agent : any[] = [];

	// selected = ["etablissements2"];
	// selected1 = "Type1";
	// selected2 = "Sous2";
	// selected3 = "Convention3";
	private baseUrl = environment.API_BMH_URL;
	constructor(private router: Router, private httpClient:HttpClient, private route: ActivatedRoute) {}


	ngOnInit():void {
		this.route.params.subscribe((params) => {
			this.progarammeId = +params['id']; 
		  });
		  this.fetchPrograms();
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

	fetchPrograms():void {
		const url = `${this.baseUrl}programme/${this.progarammeId}`;
		this.httpClient.get(url,{ headers: this.headers }).subscribe(
		  (response) => {
			this.progarmmeDetails = response;

			const selectedEtablissements = this.progarmmeDetails.listEtablissements.map(etab => etab.id);
			const selectedAgents = this.progarmmeDetails.agents.map(agent => agent.id);

			this.motifV = this.progarmmeDetails.motifVisite;
			this.etablisteControl.setValue(selectedEtablissements);
			this.typeControl.setValue(this.progarmmeDetails.typeAnalyse.id);
			this.sousTypeControl.setValue(this.progarmmeDetails.sousType.id);
			this.conventionControl.setValue(this.progarmmeDetails.convention.id);
			this.agentControl.setValue(selectedAgents);
        	this.datef = new Date(this.progarmmeDetails.date);
			this.date = this.datef.toISOString().split('T')[0];
			console.log(this.date)	  
        },
		  (error) => {
			console.error("Error fetching etablissement details:", error);
		  }
		  )
	}
	updateProgram(): void {
		const data: any = {
		  date: this.date,
		  motifVisite: this.motifV,
		  convention: { id: this.conventionControl.value },
		  typeAnalyse: { id: this.typeControl.value },
		  sousType: { id: this.sousTypeControl.value },
		  listEtablissements: this.etablisteControl.value.map((id: number) => ({ id })),
		  agents: this.agentControl.value.map((id: number) => ({ id })),
		};
	  
		console.log(data);
		this.httpClient.put<any>(`${this.baseUrl}programme/${this.progarammeId}`, data,{ headers: this.headers }).subscribe(
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
}








// <item>
// <id>250</id>
// <date>1519084800000</date>
// <lieu>182 New Road</lieu>
// <adresse>63 First Drive</adresse>
// <procesVerbal>1705681377672_66589074-47289617.jpg</procesVerbal>
// <remarques>669 West New Drive</remarques>
// <pieceJointe>1705681377672_hotel.png</pieceJointe>
	// <equipes>
	// 	<equipes>
	// 		<id>3</id>
	// 		<nom>ghgh</nom>
	// 		<prenom>ghgh</prenom>
	// 		<cin>ghgh</cin>
	// 		<tel>fgh</tel>
	// 	</equipes>
	// 	<equipes>
	// 		<id>2</id>
	// 		<nom>hghgh</nom>
	// 		<prenom>fghfg</prenom>
	// 		<cin>hfgh</cin>
	// 		<tel>585854</tel>
	// 	</equipes>
	// </equipes>
	// <objetSortie>
	// 	<id>3</id>
	// 	<libelle>dfg</libelle>
	// 	<description>fdgfdg</description>
	// </objetSortie>
	// <typeTraitement>
	// 	<id>3</id>
	// 	<libelle>dfgf</libelle>
	// 	<description>fgdfg</description>
	// </typeTraitement>
	// <commune>
	// 	<id>2</id>
	// 	<libelle>fghfgh</libelle>
	// 	<description>fghfgh</description>
	// </commune>
	// <arrondissement>
	// 	<id>3</id>
	// 	<libelle>fghfgh</libelle>
	// 	<description>fghfgh</description>
	// </arrondissement>
	// <quartier>
	// 	<id>3</id>
	// 	<libelle>fghfgh</libelle>
	// 	<description>fghfgh</description>
	// </quartier>
	// <produitUtilise>
	// 	<id>3</id>
	// 	<libelle>ghfghfgh</libelle>
	// 	<description>fghfgh</description>
	// </produitUtilise>
	// <quantite>
	// 	<id>3</id>
	// 	<libelle>fghfgh</libelle>
	// 	<description>ghfgh</description>
	// </quantite>
// </item>