import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { VehiculeService } from "../services/vehicule.service";
import Swal from "sweetalert2";

@Component({
	selector: "kt-update-vehicule",
	templateUrl: "./update-vehicule.component.html",
	styleUrls: ["./update-vehicule.component.scss"],
})
export class UpdateVehiculeComponent implements OnInit {
	constructor(private route: ActivatedRoute, private router: Router, private service: VehiculeService) {}

	ngOnInit() {
		const id = this.route.snapshot.params["id"];

		console.log(id, "id:");

		this.service.getById(id).subscribe(
			(res) => {
				console.log(res);
				this.FormArtical.patchValue({ ...res });
				this.FormArtical.value;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	FormArtical = new FormGroup({
		id: new FormControl("", Validators.required),
		libelle: new FormControl("", Validators.required),
		description: new FormControl("", Validators.required),
	});

	RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-vehicule"]);
	}
	updateVehicule() {
		if (this.FormArtical.valid) {
			this.service.update(this.FormArtical.value.id, this.FormArtical.value).subscribe(
				(res) => {
					Swal.fire({
						title: "Enregistrement réussi!",
						text: "Type Examen enregistré avec succès.",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {
						this.FormArtical.reset();
						this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
					    this.RetourEmbalages()
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
		}
	}
}
