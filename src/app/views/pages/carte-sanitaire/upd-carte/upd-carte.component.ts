import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
	selector: "kt-upd-carte",
	templateUrl: "./upd-carte.component.html",
	styleUrls: ["./upd-carte.component.scss"],
})
export class UpdCarteComponent implements OnInit {
	isVisible: any;
	isSelected: boolean = false;
	data: any[] = [];
    employe: any[] = [];
	employeur: any [] = [];

	carteDetails: any;
	carteId : any;
	private headers = new HttpHeaders({
		// 'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	typeControl = new FormControl();
	statutControl = new FormControl();
	sexeControl = new FormControl();
	decisionControl = new FormControl()

	rs: any;
	ifiscal:any;
	nbremploye:any;
	ice:any;
	tel:any;
	fax:any;
	taxe:any;
	numauto:any;
	email:any;
	adresse:any;
	pieceJointemployeur : any;

    handleFileInput(event: any): void{
		this.pieceJointemployeur = event.target.files[0];
	}
  
	nom: any;
	prenom: any;
	cin: any;
	numcnss: any;
	datenaissance: any;
	telemploye: any;
	duree: any;
	adressemploye : any;
	emailemploye: any;
	fonctionemploye: any;

	daterecrutement: any;
	daterecrut : Date;

	datedemandecarte: any;
	datedmdcrt : Date;
	
	dateprocontrol: any;
	dateproch : Date;

	decision: any;
	dateresultat: any;

	dateRsult : Date;

	datequittance: any;
	datequitt : Date;
	
	numquitance: any;

	datedelivrance: any;
	datedelivran : Date;

    photo: any;
	pieceJointe: any;
    date : Date;


  handleImgInput(event: any): void{
    this.photo = event.target.files[0];
  }
  handlePieceJointe(event: any): void{
	this.pieceJointe = event.target.files[0];
  }

    private baseUrl = environment.API_BMH_URL;
	constructor(private router: Router, private httpClient:HttpClient, private route: ActivatedRoute) {}

	ngOnInit():void {
		this.route.params.subscribe((params) => {
			this.carteId = +params['id']; 
		  });
		  this.fetchCartDetails();
	}
	
	fetchCartDetails(): void {
		const url = `${this.baseUrl}employeur/${this.carteId}`;
		this.httpClient.get(url,{ headers: this.headers }).subscribe(
		  (response) => {
			this.carteDetails = response;
			console.log("Carte Details:", this.carteDetails);
			this.date = new Date(this.carteDetails.employe.dateNaissance);
			this.dateRsult = new Date(this.carteDetails.employe.dateResultat);
			this.datedelivran = new Date(this.carteDetails.employe.dateDelivranceCarte);
			this.datedmdcrt = new Date(this.carteDetails.employe.dateDemendeDeCarte);
			this.dateproch = new Date( this.carteDetails.employe.dateProchainControle);
			this.datequitt =new Date(this.carteDetails.employe.dateQuittance);
			this.daterecrut = new Date(this.carteDetails.employe.dateRecrutement);
			this.rs = this.carteDetails.raisonSocial;
			this.ifiscal = this.carteDetails.idFiscal;
			this.taxe = this.carteDetails.taxe;
			this.numauto = this.carteDetails.numeroAutorisation;
			this.nbremploye = this.carteDetails.nombreEmployes;
			this.ice = this.carteDetails.ice;
			this.tel = this.carteDetails.tel;
			this.fax = this.carteDetails.fax;
			this.email = this.carteDetails.email;
			this.adresse = this.carteDetails.adresse;
			this.nom = this.carteDetails.employe.nom;
			this.prenom = this.carteDetails.employe.prenom;
			this.cin = this.carteDetails.employe.cin;
			this.statutControl.setValue(this.carteDetails.employe.statutDemandeDeCarte);
			this.sexeControl.setValue(this.carteDetails.employe.sexe);
			this.decisionControl.setValue(this.carteDetails.employe.decision);
			this.numcnss = this.carteDetails.employe.cnss;
			this.datenaissance = this.date.toISOString().split('T')[0];
			this.datedemandecarte = this.datedmdcrt.toISOString().split('T')[0];
			this.telemploye = this.carteDetails.employe.tel;
			this.duree = this.carteDetails.employe.dureCarte;
			this.emailemploye = this.carteDetails.email;
			this.fonctionemploye = this.carteDetails.employe.fonction;
			this.daterecrutement = this.daterecrut.toISOString().split('T')[0];
			this.dateprocontrol = this.dateproch.toISOString().split('T')[0];
			this.dateresultat =this.dateRsult.toISOString().split('T')[0];
			this.decision = this.carteDetails.employe.decision;
			this.numquitance = this.carteDetails.employe.numQuittance;
			this.datequittance = this.datequitt.toISOString().split('T')[0];;
			this.datedelivrance = this.datedelivran.toISOString().split('T')[0];;
			this.adressemploye = this.carteDetails.employe.adresse;
			this.pieceJointe = this.carteDetails.employe.pieceJointe;
			this.photo = this.carteDetails.employe.photo;
			this.pieceJointemployeur = this.carteDetails.pieceJointes;
			this.typeControl.setValue(this.carteDetails.employe.typeAnalyseDemande);
		  },
		  (error) => {
			console.error("Error fetching etablissement details:", error);
		  }
		);
	  }


	updateCarte():void{
  
		const employee = {
			nom: this.nom,
			prenom: this.prenom,
			cin: this.cin,
			cnss: this.numcnss,
			dateNaissance: this.datenaissance,
			tel: this.telemploye,
			dureCarte: this.duree,
			email: this.emailemploye,
			fonction: this.fonctionemploye,
			dateRecrutement: this.daterecrutement,
			dateDemendeDeCarte: this.datedemandecarte,
			dateProchainControle: this.dateprocontrol,

			typeAnalyseDemande: this.typeControl.value,
			statutDemandeDeCarte: this.statutControl.value,
			sexe: this.sexeControl.value,

			decision: this.decisionControl.value,

			dateResultat: this.dateresultat,
			dateQuittance: this.datequittance,
			numQuittance: this.numquitance,
			dateDelivranceCarte: this.datedelivrance,
			adresse: this.adressemploye,
			// employeurd : {
			// 	raisonSocial: this.rs ,
			// 	idFiscal: this.ifiscal,
			// 	nombreEmployes : this.nbremploye,
			// 	taxe: this.taxe,
			// 	numeroAutorisation : this.numauto,
			// 	ice : this.ice,
			// 	tel : this.tel,
			// 	fax : this.fax,
			// 	email : this.email,
			// 	adresse: this.adresse,
			// }
		}
	    console.log(employee)
		const formDataemployeur = new FormData();
		const formData = new FormData();
		formData.append('employe', new Blob([JSON.stringify(employee)], { type: 'application/json' }));
		formData.append('photo', this.photo);
		formData.append('pieceJointe', this.pieceJointe);
		console.log(formData);
		setTimeout(() => {
		  this.httpClient.put(`${this.baseUrl}employe/${this.carteDetails.employe.id}`, formData,{ headers: this.headers })
			.subscribe(
			  (response) => {
				console.log('Employee updated successfully:', response);
				const employeur = {
					raisonSocial: this.rs ,
					idFiscal: this.ifiscal,
					nombreEmployes : this.nbremploye,
					taxe: this.taxe,
					numeroAutorisation : this.numauto,
					ice : this.ice,
					tel : this.tel,
					fax : this.fax,
					email : this.email,
					adresse: this.adresse,
					employe: {
						id: this.carteDetails.employe.id 
					}
				};
                formDataemployeur.append('employeur', new Blob([JSON.stringify(employeur)], { type: 'application/json' }));
				formDataemployeur.append('pieceJointes', this.pieceJointemployeur)
				this.httpClient.put(`${this.baseUrl}employeur/${this.carteId}`, formDataemployeur, {headers : this.headers})
				.subscribe(
					(employeurResponse) => {
					console.log('Employeur updated successfully:', employeurResponse);
					this.router.navigate(["/cartesanitaire/list-carte"])
					},
					(error) => {
					console.error('Error updating employeur:', error);
					}
				);
			  },
			  (error) => {
				console.error(error);
			  }
			);
		}, 100);
	}







	RetourEmbalages(): void {
		this.router.navigate(["/cartesanitaire/list-carte"]);
	}
}
