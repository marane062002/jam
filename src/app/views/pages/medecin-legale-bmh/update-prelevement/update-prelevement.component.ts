import { Component, OnInit } from "@angular/core";
import { InterfaceStatus } from "../../parametrage-bmh/list-status/list-status.component";
import { StatusService } from "../../parametrage-bmh/services/status.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PrelevementService } from "../services/prelevement.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
	selector: "kt-update-prelevement",
	templateUrl: "./update-prelevement.component.html",
	styleUrls: ["./update-prelevement.component.scss"],
})
export class UpdatePrelevementComponent implements OnInit {
	status: InterfaceStatus[] = [];
	constructor(private statutService: StatusService, private router: Router, private route: ActivatedRoute, private service: PrelevementService) {}
	FormArticle = new FormGroup({
		id: new FormControl(""),
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
		this.statutService.getAll().subscribe((res) => {
			this.status = res;
		});
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-prelevement"]);
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
