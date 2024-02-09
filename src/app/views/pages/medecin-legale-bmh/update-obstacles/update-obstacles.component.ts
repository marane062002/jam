import { ConstateurService } from './../../parametrage-bmh/services/constateur.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { MorgueService } from "../services/morgue.service";
import { InterfaceCommune } from "../../parametrage-bmh/list-commune/list-commune.component";
import { InterfaceArrondissement } from "../../parametrage-bmh/list-arrondissement/list-arrondissement.component";
import { InterfaceConstateur } from "../../parametrage-bmh/list-constateur/list-constateur.component";
import { InterfaceQuartier } from "../../parametrage-bmh/list-quartier/list-quartier.component";
import { ObstacleService } from '../services/obstacle.service';
import { QuartierService } from '../../parametrage-bmh/services/quartier.service';
import { CommuneService } from '../../parametrage-bmh/services/commune.service';
import { ArrondissemntService } from '../../parametrage-bmh/services/arrondissemnt.service';

@Component({
	selector: "kt-update-obstacles",
	templateUrl: "./update-obstacles.component.html",
	styleUrls: ["./update-obstacles.component.scss"],
})
export class UpdateObstaclesComponent implements OnInit {
  


	arrondissement: InterfaceArrondissement[] = [];
	commune: InterfaceCommune[] = [];
	constateur: InterfaceConstateur[] = [];
	quartier: InterfaceQuartier[] = [];
	ajoutForm: any;

	pcDeclarantFile: File;
	pcConstateurFile: File;
	pcJointeDefuntsFile: File;

	obstacleId: any;
	obstacleDetails:any;

	// constructor(private router: Router, ) {}

	// m:InterfaceType[]=[]
	constructor(private router: Router, private route: ActivatedRoute, 
		private service: ObstacleService,
		private ArrondissementService: ArrondissemntService, 
		private communeService: CommuneService, 
		private quartierService: QuartierService, 
		private constateurService: ConstateurService,
		private serviceObs: ObstacleService, 
		private formBuilder: FormBuilder) {}
	
	
	
	FormArticle = new FormGroup({
		id: new FormControl(""),
		numCasier: new FormControl("", Validators.required),
		numDeces: new FormControl("", Validators.required),
		status: new FormControl("", Validators.required),
	});

	ngOnInit() {
		const id = this.route.snapshot.params["id"];
		this.route.params.subscribe((params) => {
			this.obstacleId = +params['id']; 
		  });
		this.service.getById(id).subscribe(
			(res) => {
				
				console.log("esssssssss:",res);
				
				this.FormArticle.patchValue({ ...res });
				//
				// const dateFormatee = this.datePipe.transform(this.FormArticle.value.date, 'yyyy-MM-dd');
				// // this.FormArticle.value.date = dateFormatee
				// this.FormArticle.patchValue({date: dateFormatee});
				//
				// console.log(dateFormatee)
				this.FormArticle.value;
			},
			(err) => {
				console.log(err);
			}
			
		);
		this.fetchObstacles();
		
		this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			nom: ["", Validators.required],
			prenom: ["", Validators.required],
			cin: ["", Validators.required],
			nationalite: [""],
			// nationalite1: [''],
			sexe: [""],
			date: [""], // Exemple de champ avec une valeur par défaut
			commune: [""],
			constateur: [""],
			arrondissement: [""],
			quartier: [""],
			lieu: ["", Validators.required],
			adresseDeces: ["", Validators.required],
			adresseResidence: ["", Validators.required],
			autreNationalite: [""],
			nomDeclarent: [""],
			numDeces: [""],
			prenomDeclarent: [""],
			cinDeclarent: [""],
			observation: [""],
			dateDeclaration: [""],
			dateDeces: [""],
			dateConstation: [""],
			causesDeces: [""],
			observationConst: [""],
			// cadavre: [""],
		});
		this.ArrondissementService.getAll().subscribe((res) => {
			this.arrondissement = res;
			console.log(res);
			console.log(this.arrondissement);
		});
		this.communeService.getAll().subscribe((res) => {
			this.commune = res;
			console.log(res);
			console.log(this.commune);
		});
		this.constateurService.getAllConstateur().subscribe((res) => {
			this.constateur = res;
			console.log(res);
			console.log(this.constateur);
		});
		this.quartierService.getAll().subscribe((res) => {
			this.quartier = res;
			console.log(res);
			console.log(this.quartier);
		});
	}
	fetchObstacles() {
		this.service.getById(this.obstacleId).subscribe(
			(res:any) => {
				console.log("res obsatcle api :",res);
				this.ajoutForm = this.formBuilder.group({
					nom: [res.nom || "", Validators.required],
					prenom: [res.prenom || "", Validators.required],
					cin: [res.cin || "", Validators.required],
					nationalite: [res.nationalite || ""],
					sexe: [res.sexe || ""],
					date: [res.date || ""],
					commune: [res.commune || ""],
					constateur: [res.constateur || ""],
					arrondissement: [res.arrondissement || ""],
					quartier: [res.quartier || ""],
					lieu: [res.lieu || "", Validators.required],
					adresseDeces: [res.adresseDeces || "", Validators.required],
					adresseResidence: [res.adresseResidence || "", Validators.required],
					autreNationalite: [res.autreNationalite || ""],
					nomDeclarent: [res.nomDeclarent || ""],
					numDeces: [res.numDeces || ""],
					prenomDeclarent: [res.prenomDeclarent || ""],
					cinDeclarent: [res.cinDeclarent || ""],
					observation: [res.observation || ""],
					dateDeclaration: [res.dateDeclaration || ""],
					dateDeces: [res.dateDeces || ""],
					dateConstation: [res.dateConstation || ""],
					causesDeces: [res.causesDeces || ""],
					observationConst: [res.observationConst || ""],
				});
				console.log("obstacle fetching :", this.ajoutForm)
			},
			(err) => {
				console.log(err);
			}
		)
	}
	detecterChangementNationalite() {
		if (this.ajoutForm.value.nationalite === "Autre") {
			this.ajoutForm.value.nationalite = this.ajoutForm.value.autreNationalite;
		} else {
			this.ajoutForm.get("autreNationalite").clearValidators();
		}
		this.ajoutForm.get("autreNationalite").updateValueAndValidity();
	}

	

	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-morgue"]);
	}

	// Function to handle file input change for pcDeclarant
	onPcDeclarantChange(event: any) {
		this.pcDeclarantFile = event.target.files[0];
	}

	// Function to handle file input change for pcConstateur
	onPcConstateurChange(event: any) {
		this.pcConstateurFile = event.target.files[0];
	}

	// Function to handle file input change for pcJointeDefunts
	onPcJointeDefuntsChange(event: any) {
		this.pcJointeDefuntsFile = event.target.files[0];
	}

	// selectedValueTypeFunction(p1: InterfaceType, p2: InterfaceType) {
	//   if (p1 && p2) {
	//     return p1.id === p2.id;
	//   }
	//   return false;
	// }
	update() {
		this.detecterChangementNationalite();
		if (this.ajoutForm.valid) {
		  if (this.ajoutForm.value.autreNationalite === "Autre") {
			this.ajoutForm.value.nationalite = this.ajoutForm.value.autreNationalite;
		  }
	  
		  // Create a FormData object
		  const formData = new FormData();
	  
		  // Append form data
		  formData.append('infos', new Blob([JSON.stringify(this.ajoutForm.value)],{ type: 'application/json' } ));
		  formData.append('pcDeclarant', this.pcDeclarantFile);
		  formData.append('pcConstateur', this.pcConstateurFile);
		  formData.append('pcJointeDefunts', this.pcJointeDefuntsFile);
	  
		  // Send the FormData object to the service
		  this.service.update(this.obstacleId,formData).subscribe(
			(res) => {
			  console.log(res);
			  Swal.fire({
				title: "Enregistrement réussi!",
				text: "Constateur enregistré avec succès.",
				icon: "success",
				confirmButtonText: "OK",
			  }).then(() => {
				this.RetourEmbalages();
				this.ngOnInit(); // Reload data if necessary
			  });
			},
			(err) => {
			  console.error(err);
			  Swal.fire({
				title: "Erreur!",
				text: "Un problème est survenu lors de l'enregistrement du Constateur.",
				icon: "error",
				confirmButtonText: "OK",
			  });
			}
		  );
		}
	  }
}
