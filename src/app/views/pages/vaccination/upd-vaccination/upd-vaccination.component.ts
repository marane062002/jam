import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { TypeVaccinationService } from "../../parametrage-bmh/services/type-vaccination.service";
import { AnimalService } from "../../parametrage-bmh/services/animal.service";
import { TraitementEffectueService } from "../../parametrage-bmh/services/traitement-effectue.service";
import { VStatutService } from "../../parametrage-bmh/services/v-statut.service";
import Swal from 'sweetalert2';
import { MatTableDataSource } from "@angular/material";
import { Association360Tab } from "../../pesee/show-pesee/show-pesee.component";
import { Observable } from "rxjs";
import * as $ from "jquery";

@Component({
	selector: "kt-upd-vaccination",
	templateUrl: "./upd-vaccination.component.html",
	styleUrls: ["./upd-vaccination.component.scss"],
})
export class UpdVaccinationComponent implements OnInit {
	vaccinationId: any;
	vaccinationDetails: any;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});

	pcfileDeclar : File;
	labelDeclar: any;
	pcDeclarantFile: File;
    allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
	dataSource3: MatTableDataSource<any>;
	displayedColumns1 = [ "label", "nomDoc", "actions"];
	displayedColumns2=['nomDoc','titre','label','dow']
	asyncTabs: Observable<Association360Tab[]>;
	dataSource2 = new MatTableDataSource<any>();
	ajoutForm: FormGroup;

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
		 private statusv: VStatutService,
		 private fb: FormBuilder
		 ) {}

	ngOnInit(): void {
		this.ajoutForm = this.fb.group({
			pj: this.fb.group({
				pcfileDeclar: [''] 
			})
		  });
		this.route.params.subscribe((params) => {
			this.vaccinationId = +params["id"];
		});
		this.fetchVaccinationDetails();
		this.fetchAnimal();
		this.SousTypeVaccination();
		this.fetchTypeDeclaration();
		this.fetchTraitementEffectue();
		this.fetchStatut();
		this.getAllPjImm(this.vaccinationId)
	}

	saveDec(event: any): void {
		$("#testd").val(event.target.files[0].name);
		this.ajoutForm.get('pj.pcfileDeclar').setValue(event.target.files[0].name);
		this.formPjDeclar.selecetedFile = event.target.files[0];
	  }
	
	  labelDeclarant(event: any): void {
		this.formPjDeclar.LabelPj = event.target.value;
	  }
	  validerPjDec() {
		this.allpjDeclar.push(this.formPjDeclar);
		$("#testd").val(null);
		this.dataSource3 = new MatTableDataSource(this.allpjDeclar);
		this.formPjDeclar = { selecetedFile: {}, LabelPj: this.formPjDeclar.LabelPj };
	  }
	
	  onDeletePjDec(id: number): void {
		this.allpjDeclar.splice(id, 1);
		if (this.allpjDeclar.length > 0) {
		  this.dataSource3 = new MatTableDataSource(this.allpjDeclar);
		} else {
		  this.dataSource3 = null;
		}
	  }
	  async getAllPjImm(ide) {
		await this.httpClient.get(`${this.AlfresscoURL}/bmh-vaccination/index/${ide}`)
		  .subscribe(
			(data:any) => {	
				this.dataSource2 = new MatTableDataSource(data);
			},
			(error) => console.log(error)
		);
	}
		onClickPj(e, id) {
			var r = e.substring(0, e.length - 4);
		console.log("rrrrr:", r)
		console.log("id alf:", id)
	
			this.httpClient.delete(`${this.AlfresscoURL}/bmh-vaccination/index/${id}`)
		.subscribe(
				(data:any) => {
			console.log(data)
			this.ngOnInit()
				},
				(error) => console.log(error)
			);
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
				this.statut = this.vaccinationDetails.infosVictime.status.libelle;
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
					
					console.log("animal updated successfully:", animal);
					this.httpClient.put(`${this.baseUrl}infos-victimes/${this.vaccinationDetails.infosVictime.id}`, infosVictimes,{ headers: this.headers }).subscribe(
						(victime: any) => {
							
							console.log("victime updated successfully:", animal);
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
							
							// formData.append("pieceJointe", this.pieceJointe);
							console.log("infos generales: ", formData);
							console.log("infos generales without piece jointe:", infosGenerales);
							this.httpClient.put(`${this.baseUrl}vaccination/${this.vaccinationId}`, infosGenerales, { headers: this.headers }).subscribe(
								(infosGenerales:any) => {
									this.allpjDeclar.forEach(formPj => {	
        
										const pcjDeclarant = new FormData();
									
										  pcjDeclarant.append("file", formPj.selecetedFile)
										  pcjDeclarant.append("sousModule", "VACCINATION")
										  pcjDeclarant.append("id",infosGenerales.id)
										  pcjDeclarant.append("label", formPj.LabelPj);
									
										  this.httpClient.post(`${this.AlfresscoURL}/bmh-vaccination/multiplefile`, pcjDeclarant)
										  .subscribe((res)=>{
										  console.log('deces naturel pièce Jointe stored successfully:', res);
										  })
										});
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
