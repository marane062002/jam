import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { OrigineService } from "../services/origine.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
	selector: "kt-update-origine",
	templateUrl: "./update-origine.component.html",
	styleUrls: ["./update-origine.component.scss"],
})
export class UpdateOrigineComponent implements OnInit {
	formattedDate: any;
	editForm: FormGroup;
	constructor(private datePipe: DatePipe, private router: Router, private route: ActivatedRoute, private service: OrigineService, private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.editForm = this.formBuilder.group({
			id: [""],
			nom: [""],
			prenom: [""],
			cin: [""],
			date: [""],
			numBulletin: [""],
			nationalite: [""],
			connu: [""],
		});
		const id = this.route.snapshot.params["id"];
		this.service.getById(id).subscribe(
			(res) => {
				console.log(res);
				this.editForm.patchValue({ id: res.id, nom: res.nom, prenom: res.prenom, cin: res.cin, date: this.formattedDate, numBulletin: res.numBulletin, nationalite: res.nationalite, connu: res.connu });
				const dateFromService = new Date(this.editForm.value.date[0], this.editForm.value.date[1] - 1, this.editForm.value.date[2]);
				this.formattedDate = this.datePipe.transform(dateFromService, "yyyy/MM/dd");
				this.editForm.value;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-origine"]);
	}

	update() {
		if (this.editForm.valid) {
			this.service.update(this.editForm.value.id, this.editForm.value).subscribe(
				(res) => {
					console.log("Type mis à jour avec succès :", res);
					Swal.fire({
						title: "Enregistrement réussi!",
						text: "Type Examen enregistré avec succès.",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {
						this.editForm.reset();
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
