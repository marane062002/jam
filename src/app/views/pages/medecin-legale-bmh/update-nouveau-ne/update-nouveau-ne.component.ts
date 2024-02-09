import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NouveauNeService } from "../services/nouveau-ne.service";
import { FormControl, FormGroup } from "@angular/forms";
import { InterfaceNouveauNe } from "../list-nouveau-ne/list-nouveau-ne.component";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";

@Component({
	selector: "kt-update-nouveau-ne",
	templateUrl: "./update-nouveau-ne.component.html",
	styleUrls: ["./update-nouveau-ne.component.scss"],
})
export class UpdateNouveauNeComponent implements OnInit {
	//  m:InterfaceNouveauNe[]=[]
	constructor(private datePipe: DatePipe, private router: Router, private route: ActivatedRoute, private service: NouveauNeService) {}
	FormArticle = new FormGroup({
		id: new FormControl(""),
		numEnregistrement: new FormControl(""),
		dateEnregistrement: new FormControl(""),
		nom: new FormControl(""),
		prenom: new FormControl(""),
		nomMere: new FormControl(""),
		prenomMere: new FormControl(""),
		cinMere: new FormControl(""),
		telMere: new FormControl(""),
		adresseResMere: new FormControl(""),
		nationaliteMere: new FormControl(""),
		natureAccouchement: new FormControl(""),
		adresseAccouchement: new FormControl(""),
		Observation: new FormControl(""),
		nomPere: new FormControl(""),
		prenomPere: new FormControl(""),
		cinPere: new FormControl(""),
		nationalitePere: new FormControl(""),
		telPere: new FormControl(""),
		statut: new FormControl(""),
		adresseResPere: new FormControl(""),
		nomSageFemme: new FormControl(""),
		prenomSageFemme: new FormControl(""),
		cinSageFemme: new FormControl(""),
		dateSageFemme: new FormControl(""),
		telSageFemme: new FormControl(""),
		adresseSageFemme: new FormControl(""),
		nomConstateur: new FormControl(""),
		prenomConstateur: new FormControl(""),
		cinConstateur: new FormControl(""),
		poids: new FormControl(""),
		sexe: new FormControl(""),
		autreNationalite1: new FormControl(""),
		autreNationalite: new FormControl(""),
	});
	ajouter(){}
	ngOnInit() {
		const id = this.route.snapshot.params["id"];

		this.service.getById(id).subscribe(
			(res) => {
				this.FormArticle.patchValue({ ...res });
				this.FormArticle.value.dateEnregistrement;
				this.FormArticle.value.dateSageFemme;

				const dateFormatee = this.datePipe.transform(this.FormArticle.value.dateSageFemme, "yyyy-MM-dd");
				this.FormArticle.patchValue({ dateSageFemme: dateFormatee });

				const dateEnregistrementConst = `${this.FormArticle.value.dateEnregistrement[0]}-${this.FormArticle.value.dateEnregistrement[1]}-${this.FormArticle.value.dateEnregistrement[2]} ${this.FormArticle.value.dateEnregistrement[3]}:${this.FormArticle.value.dateEnregistrement[4]}`;
				this.FormArticle.patchValue({ dateEnregistrement: dateEnregistrementConst });

				this.FormArticle.value;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	detecterChangementNationalite() {
		if (this.FormArticle.value.nationaliteMere === "Autre") {
			const autreNationaliteValue = this.FormArticle.value.autreNationalite;

			this.FormArticle.get("nationaliteMere").setValue(autreNationaliteValue);
		} else {
			this.FormArticle.get("autreNationalite").clearValidators();
		}

		this.FormArticle.get("autreNationalite").updateValueAndValidity();
	}

	detecterChangementNationalite1() {
		if (this.FormArticle.value.nationalitePere === "Autre") {
			const autreNationaliteValue = this.FormArticle.value.autreNationalite1;

			this.FormArticle.get("nationalitePere").setValue(autreNationaliteValue);
		} else {
			this.FormArticle.get("autreNationalite1").clearValidators();
		}
		this.FormArticle.get("autreNationalite1").updateValueAndValidity();
	}

	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-nouveauNe"]);
	}

	update() {
		
		console.log(this.FormArticle.value)
		if (this.FormArticle.valid) {
			// this.detecterChangementNationalite();
			// this.detecterChangementNationalite1();
			this.service.update(this.FormArticle.value.id, this.FormArticle.value).subscribe(
				(res) => {
					console.log("Type mis à jour avec succès :", res);
					Swal.fire({
						title: "Enregistrement réussi!",
						text: "Type Examen enregistré avec succès.",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {
						this.FormArticle.reset();
						this.RetourEmbalages();
						this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
					});
				},
				(err) => {
					console.error("Erreur lors de la mise à jour du type :", err);
					Swal.fire({
						title: "Erreur!",
						text: "Un problème est survenu lors de l'enregistrement du Type examen.",
						icon: "error",
						confirmButtonText: "OK",
					});
				}
			);
		} else {
			console.log("le formulaire est invalide");
		}
	}
}
