import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { FormControl } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { InterfaceArrondissement } from "../../parametrage-bmh/list-arrondissement/list-arrondissement.component";
import Swal from "sweetalert2";
@Component({
	selector: "kt-upd-etablissement",
	templateUrl: "./upd-etablissement.component.html",
	styleUrls: ["./upd-etablissement.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdEtablissementComponent implements OnInit {
	Visible: any = 0;
	typeControl = new FormControl();
	communeControl = new FormControl();
	quartierControl = new FormControl();
	arrondissementControl = new FormControl();
	controleurControl=new FormControl();

	etablissementId: number;
    etablissementDetails: any;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	  
	denomination:string;
	natureEtablissement:any;
	remarque:string;
	mesuresPrises:any;
	saisisDestruction: any;
	valeurSaisieDestruction:any;
	etatHygiene:string;
	rc: any;
	nom: any;
	prenom: any;
	cin: any;
	tel: any;
	nomProp: any;
	prenomProp: any;
	cinPro: any ;
	nomGerant: any;
	prenomGerant: any;
	cinGerant: any;
	adresse: any;
	personne:any;
	proprGerant:any;
	date=new Date();
  
	types: any[] = [];
	controleur:any[]=[];
	commune: any[] = [];
	quartier: any[] = [];
	arrondissement: any[] = [];
  //   data: any[] =[];
	private baseUrl = environment.API_BMH_URL;
  
	constructor(private router: Router, private httpClient: HttpClient,private route: ActivatedRoute) {}
	isSelected: boolean = false;
  
	ngOnInit(): void {
	  this.fetchTypes();
	  this.fetchCommune();
	  this.fetchQuartier();
	  this.fetchArrondissement();
	  this.fetchControleur()
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
			this.remarque = this.etablissementDetails.remarque;
			this.mesuresPrises = this.etablissementDetails.mesuresPrises;
			this.saisisDestruction = this.etablissementDetails.saisisDestruction;
            this.natureEtablissement = this.etablissementDetails.natureEtablissement;
			this.rc = this.etablissementDetails.rc;
			this.valeurSaisieDestruction = this.etablissementDetails.valeurSaisieDestruction;

			this.etatHygiene = this.etablissementDetails.etatHygiene;
			this.tel = this.etablissementDetails.tel;
			this.nomProp = this.etablissementDetails.nomProp;
		    this.prenomProp = this.etablissementDetails.prenomProp;
			this.cinPro = this.etablissementDetails.cinPro;
			this.nomGerant = this.etablissementDetails.nomGerant;
			// INFOS PROPRIETAIRE //
			this.prenomGerant = this.etablissementDetails.prenomGerant;
			this.cinGerant = this.etablissementDetails.cinGerant;
			this.adresse = this.etablissementDetails.adresse;
			this.personne = this.etablissementDetails.personne;
            // INFOS GERANT //
			this.proprGerant = this.etablissementDetails.proprGerant;
			// this.prenomgerant = this.etablissementDetails.prenomGerant;
			// this.cingerant = this.etablissementDetails.cinGerant;
			// this.telgerant =this.etablissementDetails.telGerant;

			this.typeControl.setValue(this.etablissementDetails.typeControleSanitaire.id);
			this.controleurControl.setValue(this.etablissementDetails.controleur.id);
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
	private fetchControleur(): void {
		this.httpClient.get<any[]>(`${this.baseUrl}controleur`,{ headers: this.headers }).subscribe(
		  (response) => {
			this.controleur = response;
		  },
		  (error) => {
			console.error("Error fetching controleur:", error);
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
		//   this.stypes = response;
		},
		(error) => {
		  console.error("Error fetching types:", error);
		}
	  );
	}

   
	updateEtab(): void {
	  const data: any = {
		denomination:this.denomination,
      natureEtablissement:this.natureEtablissement,
      remarque:this.remarque,
      mesuresPrises:this.mesuresPrises,
      saisisDestruction:this.saisisDestruction,
      valeurSaisieDestruction:this.valeurSaisieDestruction,
      etatHygiene:this.etatHygiene,
      personne:this.personne,
      proprGerant:this.proprGerant,
        tel: this.tel,
        adresse: this.adresse,
        nomProp: this.nomProp,
        prenomProp: this.prenomProp,
        cinPro: this.cinPro,
        nomGerant: this.nomGerant,
        prenomGerant: this.prenomGerant,
        cinGerant: this.cinGerant,
        date:this.date,
		typeControleSanitaire : { id: this.typeControl.value },
		commune : { id: this.communeControl.value },
		arrondissement : { id: this.arrondissementControl.value },
		quartier : { id: this.quartierControl.value },
		controleur : { id: this.controleurControl.value }
	  };
  
	  if(this.proprGerant==="Proprietaire"){
      
		data.nomProp=this.nomProp;  
		data.prenomProp=this.prenomProp;  
		data.cinPro=this.cinPro;
	  }else{
		data.nomGerant=this.nomGerant;
		data.rc=this.rc;
	  }
	  if (this.personne === "MORALE") {
		data.rc = this.rc;
		data.nom = this.nom;
	} else if (this.personne === "PHYSIQUE") {
		data.nom = this.nom;
		data.prenom = this.prenom;
		data.cin = this.cin;
	}
  
	 
	  console.log(data);
	  this.httpClient.put<any>(`${this.baseUrl}etablissements/${this.etablissementId}`, data,{ headers: this.headers }).subscribe(
		  (response) => {
			  console.log("Etablissement updated successfully:", response);
			  Swal.fire({
				title: 'Enregistrement réussi!',
				text: 'Enregistré avec succès.',
				icon: 'success',
				confirmButtonText: 'OK'
			  }).then(() => {
				this.router.navigate(["/etablissement/list-etablissement"]);
				this.ngOnInit(); 
			  });
			
			(err) => {
			  console.error(err);
			  Swal.fire({
				title: 'Erreur!',
				text: 'Un problème est survenu lors de l\'enregistrement du Constateur.',
				icon: 'error',
				confirmButtonText: 'OK'
			  });
			}
			  
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
