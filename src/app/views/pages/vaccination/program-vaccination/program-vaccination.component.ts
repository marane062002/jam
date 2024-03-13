import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { TypeVaccinationService } from "../../parametrage-bmh/services/type-vaccination.service";
import { AnimalService } from "../../parametrage-bmh/services/animal.service";
import { TraitementEffectueService } from "../../parametrage-bmh/services/traitement-effectue.service";
import { VStatutService } from "../../parametrage-bmh/services/v-statut.service";
import { MatTableDataSource } from "@angular/material";
import * as $ from "jquery";
@Component({
	selector: "kt-program-vaccination",
	templateUrl: "./program-vaccination.component.html",
	styleUrls: ["./program-vaccination.component.scss"],
})
export class ProgramVaccinationComponent implements OnInit {
	connu: any = "true";
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


	pcDeclarantFile: File;
	pcfileDeclar : File;
	labelDeclar: any;
	allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
	dataSource3: MatTableDataSource<any>;
	displayedColumns1 = [ "label", "nomDoc", "actions"];
	ajoutForm: FormGroup;

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
	statutPrmierRappelControl = new FormControl();
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

	pcJointeFile: File;

	private baseUrl = environment.API_BMH_URL;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	handleFileInput(event: any): void {
		this.pieceJointe = event.target.files[0];
	}
	constructor(private router: Router, 
		private httpClient: HttpClient,
		private animalv : AnimalService,
		private fb : FormBuilder,
		private servicev: TypeVaccinationService,
		private typev: TypeVaccinationService,
		private traitv: TraitementEffectueService,
		private statusv: VStatutService) {}

	ngOnInit(): void {
		this.ajoutForm = this.fb.group({
			pj: this.fb.group({
				pcfileDeclar: [''] 
			})
		  });
		this.fetchAnimal();
		this.SousTypeVaccination();
		this.fetchTypeDeclaration();
		this.fetchTraitementEffectue();
		this.fetchStatut();
	}
	// this.servicev.getAllVaccination(page,pageSize).subscribe((response: any) => {
		
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
	onPcDeclarantChange(event: any) {
		this.pcDeclarantFile = event.target.files[0];
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
    console.log(this.allpjDeclar)
  }

  onDeletePjDec(id: number): void {
    this.allpjDeclar.splice(id, 1);
    if (this.allpjDeclar.length > 0) {
      this.dataSource3 = new MatTableDataSource(this.allpjDeclar);
    } else {
      this.dataSource3 = null;
    }
  }

	CreateVaccination(): void {
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
			cinTuteur: this.cinTuteur,
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
		const pcj = new FormData();
		console.log(formData);
		setTimeout(() => {
			this.servicev.createAnimal(animalType).subscribe(
				(animal: any) => {
					console.log("animal created successfully:", animal);
					this.servicev.createVictime(infosVictimes).subscribe(
						(victime: any) => {
							console.log("victime created successfully:", animal);
							console.log("animal id:", animal.id);
							console.log("victime id:", victime.id);
							const infosGenerales = {
								dateTraitement: this.dateTraitement,
								dateMorsure: this.dateMorsure,
								lieuMorsure: this.lieuMorsure,
								nbrAnimauxCapture: this.NbranimauxCapture,
								description: this.description,
								tVacation: { id: this.typeVaccinationControl.value },
								declaration: { id: this.typeDeclarationControl.value },
								traitEffect: { id: this.traitementEffectueControl.value },
								animal: { id: this.animalControl.value },
								infosVictime: {
									id: victime.id,
								},
								typeAnimal: {
									id: animal.id,
								},
							};

							formData.append("generale", new Blob([JSON.stringify(infosGenerales)], { type: "application/json" }));
							formData.append("pieceJointe", this.pieceJointe);
							console.log("infos generales: ", formData);
							console.log("infos generales without piece jointe:", infosGenerales);
							this.servicev.addVaccination(formData).subscribe(
								(infosGenerales:any) => {
									
									this.allpjDeclar.forEach(formPj => {	
        
										const pcjDeclarant = new FormData();
									
										  pcjDeclarant.append("file", formPj.selecetedFile)
										  pcjDeclarant.append("sousModule", "INFOS GENERALES")
										  pcjDeclarant.append("id",infosGenerales.id)
										  pcjDeclarant.append("label", formPj.LabelPj);
									
										  this.httpClient.post(`${this.AlfresscoURL}/bmh-sortie/multiplefile`, pcjDeclarant)
										  .subscribe((res)=>{
										  console.log('deces naturel pièce Jointe stored successfully:', res);
										  })
										});
									console.log("infosGeneral created successfully:", infosGenerales);
									this.router.navigate(["/vaccination/list-vaccination"]);
								},
								(error) => {
									console.error("Error creating infosGeneral:", error);
								}
							);
						},
						(error) => {
							console.error("Error creating animal:", error);
						}
					);
				},
				(error) => {
					console.error(error);
				}
			);
		}, 300);
	}

	EtapeDernier() {
		this.router.navigate(["vaccination/list-vaccination"]);
	}
}
