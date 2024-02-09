import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ExamenService } from "../services/examen.service";
import { InterfaceMedecin } from "../../parametrage-bmh/list-medecin-operant/list-medecin-operant.component";
import { InterfaceTypeExamen } from "../../parametrage-bmh/list-type-examen/list-type-examen.component";
import { MedecinService } from "../../parametrage-bmh/services/medecin.service";
import { TypeExamenService } from "../../parametrage-bmh/services/type-examen.service";
import { StatusService } from "../../parametrage-bmh/services/status.service";
import { InterfaceStatus } from "../../parametrage-bmh/list-status/list-status.component";
import Swal from "sweetalert2";

@Component({
	selector: "kt-update-examen",
	templateUrl: "./update-examen.component.html",
	styleUrls: ["./update-examen.component.scss"],
})
export class UpdateExamenComponent implements OnInit {
	status: InterfaceStatus[] = [];
	typeExamen: InterfaceTypeExamen[] = [];
	medecinOperant: InterfaceMedecin[] = [];
	constructor(private MedecinOperantService: MedecinService, private typeExamenService: TypeExamenService, private statutService: StatusService, private router: Router, private route: ActivatedRoute, private service: ExamenService) {}
	FormArticle = new FormGroup({
		id: new FormControl(""),
		typeExamen: new FormControl("", Validators.required),
		medecinOperant: new FormControl("", Validators.required),
		status: new FormControl("", Validators.required),
		date: new FormControl("", Validators.required),
	});

	ngOnInit() {
		const id = this.route.snapshot.params["id"];
		this.service.getById(id).subscribe(
			(res) => {
				console.log(res);
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
		this.MedecinOperantService.getAll().subscribe((res) => {
			this.medecinOperant = res;
		});
		this.typeExamenService.getAll().subscribe((res) => {
			this.typeExamen = res;
		});
		this.statutService.getAll().subscribe((res) => {
			this.status = res;
		});
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-examen"]);
	}
	selectedValueMedecinOperantFunction(p1: InterfaceMedecin, p2: InterfaceMedecin) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	selectedValueTypeExamenFunction(p1: InterfaceTypeExamen, p2: InterfaceTypeExamen) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	selectedValueStatutFunction(p1: InterfaceStatus, p2: InterfaceStatus) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	update() {
		if (this.FormArticle.valid) {
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
