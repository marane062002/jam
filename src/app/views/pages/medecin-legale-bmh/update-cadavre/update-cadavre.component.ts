import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CadavreService } from "../services/cadavre.service";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";

@Component({
	selector: "kt-update-cadavre",
	templateUrl: "./update-cadavre.component.html",
	styleUrls: ["./update-cadavre.component.scss"],
})
export class UpdateCadavreComponent implements OnInit {
	id: any;
	// const dateParts = this.FormArticle.date.value.split(',');
	constructor(private datePipe: DatePipe, private router: Router, private service: CadavreService, private route: ActivatedRoute) {}
	FormArticle = new FormGroup({
		id: new FormControl(""),
		date: new FormControl("", Validators.required),
		statut: new FormControl("", Validators.required),
		numDeces: new FormControl("", Validators.required),
		observation: new FormControl("", Validators.required),
		autorizationProcureur: new FormControl("", Validators.required),
	});

	ngOnInit() {
		const id = this.route.snapshot.params["id"];
		this.service.getById(id).subscribe(
			(res) => {
				console.log(res);
				this.FormArticle.patchValue({ ...res });
				// const dateFormatee = this.datePipe.transform(this.FormArticle.value.date, 'yyyy-MM-ddTHH:mm:ss');
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
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-cadavre"]);
	}
}
