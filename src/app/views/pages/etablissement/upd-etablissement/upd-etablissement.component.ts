import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { FormControl } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
	selector: "kt-upd-etablissement",
	templateUrl: "./upd-etablissement.component.html",
	styleUrls: ["./upd-etablissement.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdEtablissementComponent implements OnInit {
	Visible: any = 0;
	typeControl = new FormControl();
	stypeControl = new FormControl();
	communeControl = new FormControl();
	quartierControl = new FormControl();
	arrondissementControl = new FormControl();

	etablissementId: number;
    etablissementDetails: any;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	rs: any;
	rc: any;
	nom: any;
	prenom: any;
	cin: any;
	description: any;
	activites: any;
	tel: any;
	fax: any;
	nomprop: any;
	prenomprop: any;
	cinprop: any ;
	telprop: any;
	nomgerant: any;
	prenomgerant: any;
	cingerant: any;
	telgerant: any;
	idf: any;
	adresse: any;
	checkedChoisi: any;
  
	types: any[] = [];
	stypes: any[] = [];
	commune: any[] = [];
	quartier: any[] = [];
	arrondissement: any[] = [];
  //   data: any[] =[];
	private baseUrl = environment.API_BMH_URL;
  
	constructor(private router: Router, private httpClient: HttpClient,private route: ActivatedRoute) {}
	isSelected: boolean = false;
  
	ngOnInit(): void {
	  this.fetchTypes();
	  this.SousTypes();
	  this.fetchCommune();
	  this.fetchQuartier();
	  this.fetchArrondissement();
	  this.route.params.subscribe((params) => {
		this.etablissementId = +params['id']; 
	  });
	  this.fetchEtablissementDetails();
	  
	}
	fetchEtablissementDetails(): void {
		const url = `${this.baseUrl}etablissements/${this.etablissementId}`;
	
		this.httpClient.get(url,{ headers: this.headers }).subscribe(
		  (response) => {
			this.etablissementDetails = response;
			console.log("Etablissement Details:", this.etablissementDetails);
			this.description = this.etablissementDetails.description;
			this.nom = this.etablissementDetails.nom;
			this.prenom = this.etablissementDetails.prenom;

			this.rc = this.etablissementDetails.rc;
			this.rs = this.etablissementDetails.rs;

			this.cin = this.etablissementDetails.cin;
			this.tel = this.etablissementDetails.tel;
			this.fax = this.etablissementDetails.fax;
		    this.adresse = this.etablissementDetails.adresse;
			this.activites = this.etablissementDetails.activite;
			this.idf = this.etablissementDetails.ifiscal;
			// INFOS PROPRIETAIRE //
			this.nomprop = this.etablissementDetails.nomProp;
			this.prenomprop = this.etablissementDetails.prenomProp;
			this.cinprop = this.etablissementDetails.cinPro;
			this.telprop = this.etablissementDetails.telProp;
            // INFOS GERANT //
			this.nomgerant = this.etablissementDetails.nomGerant;
			this.prenomgerant = this.etablissementDetails.prenomGerant;
			this.cingerant = this.etablissementDetails.cinGerant;
			this.telgerant =this.etablissementDetails.telGerant;

			this.typeControl.setValue(this.etablissementDetails.typeControleSanitaire.id);
			this.stypeControl.setValue(this.etablissementDetails.sousType.id);
		    this.communeControl.setValue(this.etablissementDetails.commune.id);
			this.arrondissementControl.setValue(this.etablissementDetails.arrondissement.id);
			this.quartierControl.setValue(this.etablissementDetails.quartier.id);

		  },
		  (error) => {
			console.error("Error fetching etablissement details:", error);
		  }
		);
	  }

	private fetchTypes(): void {
	  this.httpClient.get<any[]>(`${this.baseUrl}typectrl`,{ headers: this.headers }).subscribe(
		(response) => {
		  this.types = response;
		  
		},
		(error) => {
		  console.error("Error fetching types:", error);
		}
	  );
	}
  
	private fetchCommune(): void {
	  this.httpClient.get<any[]>(`${this.baseUrl}commune`,{ headers: this.headers }).subscribe(
		(response) => {
		  this.commune = response;
		},
		(error) => {
		  console.error("Error fetching types:", error);
		}
	  );
	}
  
	private fetchQuartier(): void {
	  this.httpClient.get<any[]>(`${this.baseUrl}quartier`,{ headers: this.headers }).subscribe(
		(response) => {
		  this.quartier = response;
		},
		(error) => {
		  console.error("Error fetching types:", error);
		}
	  );
	}
  
	private fetchArrondissement(): void {
	  this.httpClient.get<any[]>(`${this.baseUrl}arrondissement`,{ headers: this.headers }).subscribe(
		(response) => {
		  this.arrondissement = response;
		},
		(error) => {
		  console.error("Error fetching types:", error);
		}
	  );
	}
  
	private SousTypes(): void {
	  this.httpClient.get<any[]>(`${this.baseUrl}soustype`,{ headers: this.headers }).subscribe(
		(response) => {
		  this.stypes = response;
		},
		(error) => {
		  console.error("Error fetching types:", error);
		}
	  );
	}
   
	updateEtab(): void {
	  const data: any = {
		  description: this.description,
		  activite: this.activites,
		  tel: this.tel,
		  fax: this.fax,
		  ifiscal: this.idf,
		  adresse: this.adresse,
		  personne: this.etablissementDetails.personne,
		  nomProp: this.nomprop,
		  prenomProp: this.prenomprop,
		  cinPro: this.cinprop,
		  telProp: this.telprop,
		  nomGerant: this.nomgerant,
		  prenomGerant: this.prenomgerant,
		  cinGerant: this.cingerant,
		  telGerant: this.telgerant, 
		  typeControleSanitaire : { id: this.typeControl.value },
		  sousType : { id: this.stypeControl.value },
		  commune : { id: this.communeControl.value },
		  arrondissement : { id: this.arrondissementControl.value },
		  quartier : { id: this.quartierControl.value }
	  };
  
	  if (this.etablissementDetails.personne === "MORALE") {
		  data.rs = this.rs;
		  data.rc = this.rc;
	  } else if (this.etablissementDetails.personne === "PHYSIQUE") {
		  data.nom = this.nom;
		  data.prenom = this.prenom;
		  data.cin = this.cin;
	  }
  
	 
	  console.log(data);
	  this.httpClient.put<any>(`${this.baseUrl}etablissements/${this.etablissementId}`, data,{ headers: this.headers }).subscribe(
		  (response) => {
			  console.log("Etablissement updated successfully:", response);
			  this.router.navigate(["/etablissement/list-etablissement"]);
		  },
		  (error) => {
			  console.error("Error updating etablissement:", error);
		  }
	  );
  }
  
  
  
  


	RetourEmbalages() {
		this.router.navigate(["/etablissement/list-etablissement"]);
	}
}
