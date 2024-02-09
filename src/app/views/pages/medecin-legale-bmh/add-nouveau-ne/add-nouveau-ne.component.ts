import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { InterfaceNouveauNe } from "../list-nouveau-ne/list-nouveau-ne.component";
import { NouveauNeService } from "../services/nouveau-ne.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
@Component({
	selector: "kt-add-nouveau-ne",
	templateUrl: "./add-nouveau-ne.component.html",
	styleUrls: ["./add-nouveau-ne.component.scss"],
})
export class AddNouveauNeComponent implements OnInit {
	prenom: string;
	Observation: string;
	nomPere: string;
	prenomPere: string;
	cinPere: string;
	nationalitePere: string;
	telPere: string;
	Statut: string;
	adresseResPere: string;
	nomSageFemme: string;
	prenomSageFemme: string;
	cinSageFemme: string;
	dateSageFemme: string;
	telSageFemme: string;
	adresseSageFemme: string;
	nomConstateur: string;
	prenomConstateur: string;
	cinConstateur: string;
	sexe: string;
	nouveauNe: InterfaceNouveauNe[] = [];
	ajoutForm: any; 

	pcJointeFile: File;

	private AlfresscoURL = environment.API_ALFRESCO_URL;
	constructor(private httpClient: HttpClient,private service: NouveauNeService, private router: Router, private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			numEnregistrement: ["", Validators.required],
			dateEnregistrement: ["", Validators.required],
			nom: [""],
			prenom: [""],
			nomMere: [""],
			prenomMere: [""],
			cinMere: [""],
			telMere: [""],
			adresseResMere: [""],
			adresseAccouchement: [""],
			nationaliteMere: [""],
			natureAccouchement: [""],
			dateAccouchement: [""],
			poids: [""],
			observation: [""],
			nomPere: [""],
			prenomPere: [""],
			cinPere: [""],
			nationalitePere: [""],
			telPere: [""],
			statut: [""],
			adresseResPere: [""],
			nomSageFemme: [""],
			prenomSageFemme: [""],
			cinSageFemme: [""],
			dateSageFemme: [""],
			telSageFemme: [""],
			adresseSageFemme: [""],
			nomConstateur: [""],
			prenomConstateur: [""],
			cinConstateur: [""],
			sexe: [""],
			autreNationalite: [""],
			// autreNationalite1:[''],
		});
	}

	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-nouveauNe"]);
	}

	detecterChangementNationalite() {
		if (this.ajoutForm.value.nationaliteMere === "Autre") {
			const autreNationaliteValue = this.ajoutForm.value.autreNationalite;

			this.ajoutForm.get("nationaliteMere").setValue(autreNationaliteValue);
		} else {
			this.ajoutForm.get("autreNationalite").clearValidators();
		}

		this.ajoutForm.get("autreNationalite").updateValueAndValidity();
	}
	onPcJointeChange(event: any) {
		this.pcJointeFile = event.target.files[0];
	  }
	detecterChangementNationalite1() {
		if (this.ajoutForm.value.nationalitePere === "Autre") {
			const autreNationaliteValue = this.ajoutForm.value.autreNationalite1;

			this.ajoutForm.get("nationalitePere").setValue(autreNationaliteValue);
		} else {
			
			this.ajoutForm.get("autreNationalite1").clearValidators();
		}
		this.ajoutForm.get("autreNationalite1").updateValueAndValidity();
	}

	ajouter() {
		
		// debugger
		if (this.ajoutForm.valid) {
			const formData = new FormData();
			const pcj = new FormData();
			const pcj2 = new FormData();
			// debugger
			console.log("object before validate :",this.ajoutForm)
			// this.detecterChangementNationalite();
			// this.detecterChangementNationalite1();
			// debugger
			this.service.create(this.ajoutForm.value).subscribe(
				(res:any) => {
					formData.append('id',res.id)
					formData.append("file", this.pcJointeFile)
					formData.append("sousModule", "NOUVEAU")
					this.httpClient.post(`${this.AlfresscoURL}/bmh-nouveau/multiplefile`, formData)
						.subscribe((res)=>{
								console.log('Piece Jointe stored successfully:', res);
					})
					console.log(res);

					Swal.fire({
						title: "Enregistrement réussi!",
						text: "Constateur enregistré avec succès.",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {

						this.RetourEmbalages();
						this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
					});
				},
				(err) => {
					console.error(err);
					Swal.fire({
						title: "Erreur!",
						text: "Un problème est survenu lors de l'enregistrement d Autopsie.",
						icon: "error",
						confirmButtonText: "OK",
					});
				}
			);
		}
	}
}
