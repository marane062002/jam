import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DecesNaturelsService } from "../services/deces-naturels.service";
import { ActivatedRoute, Router } from "@angular/router";
import { InterfaceDeces } from "../list-deces-naturel/list-deces-naturel.component";
import { ArrondissemntService } from "../../parametrage-bmh/services/arrondissemnt.service";
import { CommuneService } from "../../parametrage-bmh/services/commune.service";
import { ConstateurService } from "../../parametrage-bmh/services/constateur.service";
import { QuartierService } from "../../parametrage-bmh/services/quartier.service";
import { InterfaceArrondissement } from "../../parametrage-bmh/list-arrondissement/list-arrondissement.component";
import { InterfaceCommune } from "../../parametrage-bmh/list-commune/list-commune.component";
import { InterfaceConstateur } from "../../parametrage-bmh/list-constateur/list-constateur.component";
import { InterfaceQuartier } from "../../parametrage-bmh/list-quartier/list-quartier.component";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";

@Component({
	selector: "kt-update-deces-naturel",
	templateUrl: "./update-deces-naturel.component.html",
	styleUrls: ["./update-deces-naturel.component.scss"],
})
export class UpdateDecesNaturelComponent implements OnInit {
	arrondissement: InterfaceArrondissement[] = [];
	commune: InterfaceCommune[] = [];
	constateur: InterfaceConstateur[] = [];
	quartier: InterfaceQuartier[] = [];
	constater: InterfaceQuartier[] = [];
	id: any;
	deces: InterfaceDeces;
	constructor(private router: Router, private datePipe: DatePipe, private ArrondissementService: ArrondissemntService, private communeService: CommuneService, private constateurService: ConstateurService, private quartierService: QuartierService, private service: DecesNaturelsService, private route: ActivatedRoute) {}
	FormArticle = new FormGroup({
		id: new FormControl(""),
		nom: new FormControl("", Validators.required),
		prenom: new FormControl("", Validators.required),
		cin: new FormControl("", Validators.required),
		nationalite: new FormControl("", Validators.required),
		date: new FormControl("", Validators.required),
		sexe: new FormControl("", Validators.required),
		commune: new FormControl("", Validators.required),
		arrondissement: new FormControl("", Validators.required),
		quartier: new FormControl("", Validators.required),
		constateur: new FormControl("", Validators.required),
		lieu: new FormControl("", Validators.required),
		// adresseDeces: new FormControl("", Validators.required),
		adresseResidence: new FormControl("", Validators.required),
		constater: new FormControl("", Validators.required),
		cause: new FormControl("",Validators.required),
		descriptionDec: new FormControl("", Validators.required),
		dateDeces: new FormControl("", Validators.required)
	});

	ngOnInit() {
		const id = this.route.snapshot.params["id"];
		this.service.getById(id).subscribe(
			(res) => {
				console.log(res);
				this.FormArticle.patchValue({ ...res });
				const dateFormateDec = this.datePipe.transform(this.FormArticle.value.dateDeces, "yyyy-MM-dd");
				const dateFormatee = this.datePipe.transform(this.FormArticle.value.date, "yyyy-MM-dd");
				// this.FormArticle.value.date = dateFormatee
				this.FormArticle.patchValue({ date: dateFormatee });
				this.FormArticle.patchValue({ dateDeces: dateFormateDec });
				console.log("form :",this.FormArticle.value.nationalite);
				this.FormArticle.value;
			},
			(err) => {
				console.log(err);
			}
		);
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
	selectedValueCommuneFunction(p1: InterfaceCommune, p2: InterfaceCommune) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	selectedValueArrondissementFunction(p1: InterfaceArrondissement, p2: InterfaceArrondissement) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	selectedValueConstateurFunction(p1: InterfaceConstateur, p2: InterfaceConstateur) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	selectedValueQuartierFunction(p1: InterfaceQuartier, p2: InterfaceQuartier) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-deces-naturel"]);
	}

	update() {
		
		if (this.FormArticle.valid) {
			
			console.log("form art : ",this.FormArticle.value)
			
			// if (this.FormArticle.value.nationalite === "Autre") {
			// 	this.FormArticle.value.nationalite = this.FormArticle.value.autreNationalite;
			// }
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
						this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
						this.router.navigate(["/bmh1/list-deces-naturel"]);
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
