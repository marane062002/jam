import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ArrondissemntService } from "../../parametrage-bmh/services/arrondissemnt.service";
import { CommuneService } from "../../parametrage-bmh/services/commune.service";
import { QuartierService } from "../../parametrage-bmh/services/quartier.service";
import { ConstateurService } from "../../parametrage-bmh/services/constateur.service";
import { ObstacleService } from "../services/obstacle.service";
import { InterfaceArrondissement } from "../../parametrage-bmh/list-arrondissement/list-arrondissement.component";
import { InterfaceCommune } from "../../parametrage-bmh/list-commune/list-commune.component";
import { InterfaceConstateur } from "../../parametrage-bmh/list-constateur/list-constateur.component";
import { InterfaceQuartier } from "../../parametrage-bmh/list-quartier/list-quartier.component";
import Swal from "sweetalert2";
import { environment } from "../../../../../environments/environment";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material";
import * as $ from "jquery";


@Component({
	selector: "kt-add-obstacles",
	templateUrl: "./add-obstacles.component.html",
	styleUrls: ["./add-obstacles.component.scss"],
})
export class AddObstaclesComponent implements OnInit {
	arrondissement: InterfaceArrondissement[] = [];
	commune: InterfaceCommune[] = [];
	constateur: InterfaceConstateur[] = [];
	quartier: InterfaceQuartier[] = [];
	ajoutForm: any;
	// ajoutForm: FormGroup;
	pcDeclarantFile: File;
	pcConstateurFile: File;
	pcJointeDefuntsFile: File;
    
	pcfile : File;
	labelPj: any;

	pcfileDefunts : File;
	labelDefunts: any;

	pcfileDeclar : File;
	labelDeclar: any;
	// formPj = { selecetedFile: {},  };


    allpjs = [];
	formPj = { selecetedFile: {}, LabelPj: "" };
    dataSource1: MatTableDataSource<any>;

	allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
    dataSource3: MatTableDataSource<any>;


	allpjDefunts = [];
	formPjDefunts = { selecetedFile: {}, LabelPj: "" };
    dataSource2: MatTableDataSource<any>;

	
 
    displayedColumns1 = [ "label", "nomDoc", "actions"];

	private headers = new HttpHeaders({
		// 'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	private baseUrl = environment.API_BMH_URL;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	constructor(private router: Router, private ArrondissementService: ArrondissemntService, private communeService: CommuneService, private quartierService: QuartierService, private constateurService: ConstateurService, private service: ObstacleService, private formBuilder: FormBuilder, private httpClient: HttpClient) {}
        pj:any;
		pjDeclar: any;
		pjDefunt: any;
	    ngOnInit() {
		this.pj= this.formBuilder.group({
			pcfile: [""],
		})
		this.pjDeclar= this.formBuilder.group({
			pcfile: [""],
		})
		this.pjDefunt= this.formBuilder.group({
			pcfile: [""],
		})
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
			numRegistre: [""],
			causeDeces: [""],
			constater:[""],
			numTel:[""],
			statusCadavre: [""],
			numTombe: [""],
			nomCim: [""]
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


	    save(event: any): void {
        $("#test").val(event.target.files[0].name);
		this.pj.get('pcfile').setValue(event.target.files[0].name);
        this.formPj.selecetedFile = event.target.files[0];
        }

		saveDec(event: any): void {
			$("#testd").val(event.target.files[0].name);
			this.pjDeclar.get('pcfile').setValue(event.target.files[0].name);
			this.formPjDeclar.selecetedFile = event.target.files[0];
		}

		saveDef(event: any): void {
			$("#testdef").val(event.target.files[0].name);
			this.pjDefunt.get('pcfile').setValue(event.target.files[0].name);
			this.formPjDefunts.selecetedFile = event.target.files[0];
		}


		label(event: any): void {
				this.formPj.LabelPj = event.target.value;
				// console.log("frmpj2",this.labelPj)
		}
		labelDeclarant(event: any): void {
				this.formPjDeclar.LabelPj = event.target.value;
		}
		labelDef(event: any): void {
				this.formPjDefunts.LabelPj = event.target.value;
		}

   
	    validerPj() {
        this.allpjs.push(this.formPj);
         $("#test").val(null);
        this.dataSource1 = new MatTableDataSource(this.allpjs);
		this.formPj = { selecetedFile: {}, LabelPj: this.formPj.LabelPj };
        }
		validerPjDec() {
			this.allpjDeclar.push(this.formPjDeclar);
			$("#testd").val(null);
			this.dataSource3 = new MatTableDataSource(this.allpjDeclar);
			this.formPjDeclar = { selecetedFile: {}, LabelPj: this.formPjDeclar.LabelPj };
		}
        validerPjDef() {
			this.allpjDefunts.push(this.formPjDefunts);
			$("#testdef").val(null);
			this.dataSource2 = new MatTableDataSource(this.allpjDefunts);
			this.formPjDefunts = { selecetedFile: {}, LabelPj: this.formPjDefunts.LabelPj };
		}

	
		onDeletePj(id: number): void {
			this.allpjs.splice(id, 1);
			if (this.allpjs.length > 0) {
				this.dataSource1 = new MatTableDataSource(this.allpjs);
			} else {
				this.dataSource1 = null;
			}
		}

		onDeletePjDec(id: number): void {
			this.allpjDeclar.splice(id, 1);
			if (this.allpjDeclar.length > 0) {
				this.dataSource3 = new MatTableDataSource(this.allpjDeclar);
			} else {
				this.dataSource3 = null;
			}
        }

		onDeletePjDef(id: number): void {
			this.allpjDefunts.splice(id, 1);
			if (this.allpjDefunts.length > 0) {
				this.dataSource2 = new MatTableDataSource(this.allpjDefunts);
			} else {
				this.dataSource2 = null;
			}
        }
	// onDeletePjDec(id: number): void {
    //     this.allpjDefunts.splice(id, 1);
    //     if (this.allpjDeclar.length > 0) {
    //         this.dataSource2 = new MatTableDataSource(this.allpjDefunts);
    //     } else {
    //         this.dataSource2 = null;
    //     }
    // }
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-obstacles"]);
	}

	// detecterChangementNationalite() {
	// 	if (this.ajoutForm.value.nationalite === "Autre") {
	// 		this.ajoutForm.value.nationalite = this.ajoutForm.value.autreNationalite;
	// 	} else {
	// 		this.ajoutForm.get("autreNationalite").clearValidators();
	// 	}
	// 	this.ajoutForm.get("autreNationalite").updateValueAndValidity();
	// }

	ajouter() {
		// this.detecterChangementNationalite();
		if (this.ajoutForm.valid) {
		//   if (this.ajoutForm.value.autreNationalite === "Autre") {
		// 	this.ajoutForm.value.nationalite = this.ajoutForm.value.autreNationalite;
		//   }
	  
		  // Create a FormData object
		  const formData = new FormData();
	      
		 
		 
		  // Append form data
		  formData.append('infos', new Blob([JSON.stringify(this.ajoutForm.value)],{ type: 'application/json' } ));
		//   formData.append('pcDeclarant', this.pcDeclarantFile);
		//   formData.append('pcConstateur', this.pcConstateurFile);
		//   formData.append('pcJointeDefunts', this.pcJointeDefuntsFile);
	  
		  // Send the FormData object to the service
		setTimeout(() => {
			this.service.create(formData).subscribe(
				(res) => {
				  console.log(res);


				  this.allpjDefunts.forEach(formPj => {	

				  const pcjDefunts = new FormData();

				  pcjDefunts.append('file', formPj.selecetedFile )
				  pcjDefunts.append('sousModule','Défunts')
				  pcjDefunts.append('id',res.id)
				  pcjDefunts.append("label", formPj.LabelPj)
				  this.httpClient.post(`${this.AlfresscoURL}/obstacle-bmh/multiplefile`, pcjDefunts)
				  .subscribe((res)=>{
					console.log('Déclarant pièce Jointe stored successfully:', res);
				  })
				});

		
				this.allpjDeclar.forEach(formPj => {	
				const pcjDeclarant = new FormData();
				  pcjDeclarant.append("file", formPj.selecetedFile)
				  pcjDeclarant.append("sousModule", "Déclarant")
				  pcjDeclarant.append("id",res.id)
				  pcjDeclarant.append("label", formPj.LabelPj);
				  this.httpClient.post(`${this.AlfresscoURL}/obstacle-bmh/multiplefile`, pcjDeclarant)
				  .subscribe((res)=>{
					console.log('Defunts pièce Jointe stored successfully:', res);
				  })
				});

				  this.allpjs.forEach(formPj => {
					const pcjConstateur = new FormData();	

					pcjConstateur.append("file", formPj.selecetedFile);
					pcjConstateur.append("sousModule", "Constateur");
					pcjConstateur.append("id", res.id); 
					pcjConstateur.append("label", formPj.LabelPj);
					this.httpClient.post(`${this.AlfresscoURL}/obstacle-bmh/multiplefile`, pcjConstateur)
						.subscribe((response) => {
							console.log('Constateur pièce Jointe stored successfully:', response);
						});
				});
				

				const historique = {
					"nouveauStatut":this.ajoutForm.value.statusCadavre,
					 "obstacleDefunts":{
					  "id":res.id
					 }
				  }
				  this.httpClient.post(`${this.baseUrl}historique-obstacle`, historique , { headers: this.headers })
				  .subscribe((res)=>{
				  console.log('stored successfully:', res);
				  })

				  Swal.fire({
					title: "Enregistrement réussi!",
					text: "Constateur enregistré avec succès.",
					icon: "success",
					confirmButtonText: "OK",
				  }).then(() => {
					this.RetourEmbalages();
					this.ngOnInit(); 
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
		}, 100)
		  
		}
	  }
	  
}
