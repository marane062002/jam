import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { OrigineService } from "../services/origine.service";

@Component({
	selector: "kt-add-origine",
	templateUrl: "./add-origine.component.html",
	styleUrls: ["./add-origine.component.scss"],
})
export class AddOrigineComponent implements OnInit {
	ajoutForm: any;
	constructor(private router: Router, private formBuilder: FormBuilder, private service: OrigineService) {}

	ngOnInit() {
		this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			nom: [""],
			prenom: [""],
			date: [""],
			cin: [""],
			numBulletin: [""],
			nationalite: [""],
			connu: [""],
			autreNationalite: [""],
			nationalite1: [""],
		});
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-origine"]);
	}

	ajouter() {
		if (this.ajoutForm.valid) {
			if (this.ajoutForm.value.nationalite1 === "Autre") {
				this.ajoutForm.value.nationalite = this.ajoutForm.value.autreNationalite;
			} else {
				this.ajoutForm.value.nationalite = "Marocain";
			}
			this.service.create(this.ajoutForm.value).subscribe(
				(res) => {
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
						text: "Un problème est survenu lors de l'enregistrement du Constateur.",
						icon: "error",
						confirmButtonText: "OK",
					});
				}
			);
		}
	}
}
