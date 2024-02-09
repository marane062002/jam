import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { TypeVaccinationService } from "../../parametrage-bmh/services/type-vaccination.service";
import { AnimalService } from "../../parametrage-bmh/services/animal.service";
import { TraitementEffectueService } from "../../parametrage-bmh/services/traitement-effectue.service";
import { VStatutService } from "../../parametrage-bmh/services/v-statut.service";
@Component({
	selector: "kt-upd-vaccination",
	templateUrl: "./upd-vaccination.component.html",
	styleUrls: ["./upd-vaccination.component.scss"],
})
export class UpdVaccinationComponent implements OnInit {
	vaccinationId: any;
	vaccinationDetails: any;

	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});


	connu: any;
	minneur: any;

	typeVaccinationControl = new FormControl();
	typeDeclarationControl = new FormControl();
	dateMorsure: any;
	dateTraitement: any;
	lieuMorsure: any;
	animalControl = new FormControl();
	NbranimauxCapture: any;
	traitementEffectueControl = new FormControl();
	description: any;
	pieceJointe: any;

	nom: any;
	prenom: any;
	dateNaissaance: any;
	cin: any;
	NumBulletin: any;
	nationaliteControl = new FormControl();

	nomVictime: any;
	prenomVictime: any;
	dateNaissanceVictime: any;
	cinVictime: any;
	sexeControl = new FormControl();
	adresse: any;
	nomTuteur: any;
	prenomTuteur: any;
	cinTuteur: any;
	dateVaccinanation: any;
	statutVaccinationControl = new FormControl();
	datePrevuePremierAppel: any;
	statutPrmierRappelControl = new FormControl('premier rappel 1');
	dateDernierRappel: any;
	dateReellePremierRappel: any;
	datePrevueDernierRappel: any;
	dateReelleDernierRappel: any;
	statutDernierRappelControl = new FormControl();




	data: any[] = [];
	generale: any[] = [];
	victime: any[] = [];

	animal: any[] = [];
	typeVaccinantion: any[] = [];
	typeDecalration: any[] = [];
	traitementEffectue: any[] = [];
	statut: any[] = [];

	private baseUrl = environment.API_BMH_URL;

	handleFileInput(event: any): void {
		this.pieceJointe = event.target.files[0];
	}

	constructor(private router: Router, 
		 private route: ActivatedRoute, 
		 private httpClient: HttpClient,
		 private datePipe: DatePipe,
		 private servicev: TypeVaccinationService,
		 private animalv : AnimalService,
		 private typev: TypeVaccinationService,
		 private traitv: TraitementEffectueService,
		 private statusv: VStatutService
		 ) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.vaccinationId = +params["id"];
		});
		this.fetchVaccinationDetails();
		this.fetchAnimal();
		this.SousTypeVaccination();
		this.fetchTypeDeclaration();
		this.fetchTraitementEffectue();
		this.fetchStatut();
	}
	private fetchAnimal(): void {
		this.animalv.getAll().subscribe(
			(response) => {
				this.animal = response;
			},
			(error) => {
				console.error("Error fetching types:", error);
			}
		);
	}
	private SousTypeVaccination(): void {
		this.typev.getAll().subscribe(
			(response) => {
				this.typeVaccinantion = response;
			},
			(error) => {
				console.error("Error fetching types:", error);
			}
		);
	}
	private fetchTypeDeclaration(): void {
		this.servicev.getDec().subscribe(
			(response) => {
				this.typeDecalration = response;
			},
			(error) => {
				console.error("Error fetching types:", error);
			}
		);
	}
	private fetchTraitementEffectue(): void {
		this.traitv.getAll().subscribe(
			(response) => {
				this.traitementEffectue = response;
			},
			(error) => {
				console.error("Error fetching types:", error);
			}
		);
	}
	private fetchStatut(): void {
		this.statusv.getAll().subscribe(
			(response) => {
				this.statut = response;
			},
			(error) => {
				console.error("Error fetching types:", error);
			}
		);
	}
	selectedValuestatutVaccination(p1: any, p2: any) {
		if (p1 && p2) {
			return p1 === p2;
		}

		return false;
	}

	fetchVaccinationDetails(): void {
		const url = `${this.baseUrl}vaccination/${this.vaccinationId}`;
		this.httpClient.get(url,{ headers: this.headers }).subscribe(
			(response) => {
				this.vaccinationDetails = response;
				console.log("Vaccination Details:", this.vaccinationDetails);
				console.log("Vaccination Details:", this.vaccinationDetails.infosVictime.statutPremierRappel);
				this.statutVaccinationControl.setValue(this.vaccinationDetails.infosVictime.status.id);
                this.dateNaissanceVictime = this.formatDate(this.vaccinationDetails.infosVictime.dateNaissance);
				this.typeVaccinationControl.setValue(this.vaccinationDetails.tVacation.id);
				this.typeDeclarationControl.setValue(this.vaccinationDetails.declaration.id);
				this.traitementEffectueControl.setValue(this.vaccinationDetails.traitEffect.id);
				this.dateTraitement = this.formatDate(this.vaccinationDetails.dateTraitement);
				this.dateMorsure = this.formatDate(this.vaccinationDetails.dateMorsure);
				this.lieuMorsure = this.vaccinationDetails.lieuMorsure;
				this.NbranimauxCapture = this.vaccinationDetails.nbrAnimauxCapture;
				this.description = this.vaccinationDetails.description;
				this.pieceJointe = this.vaccinationDetails.pieceJointe;
				this.animalControl.setValue(this.vaccinationDetails.animal.id);

				if (this.vaccinationDetails.typeAnimal.connu) {
					this.connu = "true";
				} else {
					this.connu = "false";
				}

				this.nom = this.vaccinationDetails.typeAnimal.nom;
				this.prenom = this.vaccinationDetails.typeAnimal.prenom;
				this.dateNaissaance = this.formatDate(this.vaccinationDetails.typeAnimal.dateNaissance);
				this.cin = this.vaccinationDetails.typeAnimal.cin;
				this.NumBulletin = this.vaccinationDetails.typeAnimal.numBulletin;
				this.nationaliteControl.setValue(this.vaccinationDetails.typeAnimal.nationalite);

				this.statutPrmierRappelControl.setValue(this.vaccinationDetails.infosVictime.statutPremierRappel);
				
				this.minneur = this.vaccinationDetails.infosVictime.statutVictime;
				this.nomVictime = this.vaccinationDetails.infosVictime.nom;
				this.prenomVictime = this.vaccinationDetails.infosVictime.prenom;
				this.dateNaissaance = this.formatDate(this.vaccinationDetails.infosVictime.dateNaissance);
				this.cinVictime = this.vaccinationDetails.infosVictime.cin;
				this.sexeControl.setValue(this.vaccinationDetails.infosVictime.sexe);
				this.adresse = this.vaccinationDetails.infosVictime.adresse;
				this.nomTuteur = this.vaccinationDetails.infosVictime.nomTuteur;
				this.prenomTuteur = this.vaccinationDetails.infosVictime.prenomTuteur;
				this.cinTuteur = this.vaccinationDetails.infosVictime.cinTuteur;
				this.dateVaccinanation = this.formatDate(this.vaccinationDetails.infosVictime.dateVaccination);
				this.datePrevuePremierAppel = this.formatDate(this.vaccinationDetails.infosVictime.datePremierAppel);

				this.dateReellePremierRappel = this.formatDate(this.vaccinationDetails.infosVictime.dateReellePremierRappel);
				this.datePrevueDernierRappel = this.formatDate(this.vaccinationDetails.infosVictime.datePrvDernierRappel);
				this.statutDernierRappelControl.setValue(this.vaccinationDetails.infosVictime.statutDernierRappel);
				this.dateReelleDernierRappel = this.formatDate(this.vaccinationDetails.infosVictime.dateReelleDernierRappel);
				this.statut = this.vaccinationDetails.infosVictime.status;
			},
			(error) => {
				console.error("Error fetching etablissement details:", error);
			}
		);
	}

	UpdateVaccination(): void {
		const animalType = {
			connu: this.connu,
			cin: this.cin,
			dateNaissance: this.dateNaissaance,
			nom: this.nom,
			prenom: this.prenom,
			numBulletin: this.NumBulletin,
			nationalite: this.nationaliteControl.value,
		};
		const infosVictimes = {
			statutVictime: this.minneur,
			nom: this.nomVictime,
			prenom: this.prenomVictime,
			dateNaissance: this.dateNaissanceVictime,
			cin: this.cinVictime,
			sexe: this.sexeControl.value,
			adresse: this.adresse,
			nomTuteur: this.nomTuteur,
			prenomTuteur: this.prenomTuteur,
			cinTyteur: this.cinTuteur,
			dateVaccination: this.dateVaccinanation,
			status: { id: this.statutVaccinationControl.value },
			datePremierAppel: this.datePrevuePremierAppel,
			statutPremierRappel: this.statutPrmierRappelControl.value,
			dateReellePremierRappel: this.dateReellePremierRappel,
			datePrvDernierRappel: this.datePrevueDernierRappel,
			statutDernierRappel: this.statutDernierRappelControl.value,
			dateReelleDernierRappel: this.dateReelleDernierRappel,
		};

		console.log("infos victimes :", infosVictimes);
		console.log("type d'animal :", animalType);
		const formData = new FormData();

		console.log(formData);
		setTimeout(() => {
			this.httpClient.put(`${this.baseUrl}type-animal/${this.vaccinationDetails.typeAnimal.id}`, animalType,{ headers: this.headers }).subscribe(
				(animal: any) => {
					console.log("animal created successfully:", animal);
					this.httpClient.put(`${this.baseUrl}infos-victimes/${this.vaccinationDetails.infosVictime.id}`, infosVictimes,{ headers: this.headers }).subscribe(
						(victime: any) => {
							console.log("victime created successfully:", animal);
							console.log("animal id:", animal.id);
							console.log("victime id:", victime.id);
							const infosGenerales = {
								dateTraitement: this.dateTraitement,
								dateMesure: this.dateMorsure,
								lieuMesure: this.lieuMorsure,
								nbrAnimauxCapture: this.NbranimauxCapture,
								description: this.description,
								tVacation: { id: this.typeVaccinationControl.value },
								declaration: { id: this.typeDeclarationControl.value },
								traitEffect: { id: this.traitementEffectueControl.value },
								infosVictime: {
									id: this.vaccinationDetails.infosVictime.id,
								},
								typeAnimal: {
									id: this.vaccinationDetails.typeAnimal.id,
								},
							};

							formData.append("generale", new Blob([JSON.stringify(infosGenerales)], { type: "application/json" }));
							formData.append("pieceJointe", this.pieceJointe);
							console.log("infos generales: ", formData);
							console.log("infos generales without piece jointe:", infosGenerales);
							this.httpClient.put(`${this.baseUrl}vaccination/${this.vaccinationId}`, formData, { headers: this.headers }).subscribe(
								(infosGenerales) => {
									console.log("infosGeneral updated successfully:", infosGenerales);
									this.router.navigate(["/vaccination/list-vaccination"]);
								},
								(error) => {
									console.error("Error update infosGeneral:", error);
								}
							);
						},
						(error) => {
							console.error("Error editing animal:", error);
						}
					);
				},
				(error) => {
					console.error(error);
				}
			);
		}, 300);
	}

	formatDate(date: any): String {
		return this.datePipe.transform(date, "yyyy-MM-dd") || "";
	}
	RetourEmbalages() {
		this.router.navigate(["vaccination/list-vaccination"]);
	}
	EtapeDernier(){
		this.router.navigate(["vaccination/list-vaccination"]);
	}
}
