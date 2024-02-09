import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InterfaceStatus } from "../../parametrage-bmh/list-status/list-status.component";
import { InterfaceMedecin } from "../../parametrage-bmh/list-medecin-operant/list-medecin-operant.component";
import { InterfaceTypeExamen } from "../../parametrage-bmh/list-type-examen/list-type-examen.component";
import { StatusService } from "../../parametrage-bmh/services/status.service";
import { MedecinService } from "../../parametrage-bmh/services/medecin.service";
import { TypeExamenService } from "../../parametrage-bmh/services/type-examen.service";
import Swal from "sweetalert2";
import { ExamenService } from "../services/examen.service";
import { Router } from "@angular/router";

@Component({
	selector: "kt-add-examen",
	templateUrl: "./add-examen.component.html",
	styleUrls: ["./add-examen.component.scss"],
})
export class AddExamenComponent implements OnInit {
	status: InterfaceStatus[] = [];
	medecinOperant: InterfaceMedecin[] = [];
	typeExamen: InterfaceTypeExamen[] = [];
	ajoutForm: any;
	constructor(private router: Router, private formBuilder: FormBuilder, private service: ExamenService, private statutService: StatusService, private medecinService: MedecinService, private typeExamenService: TypeExamenService) {}

	ngOnInit() {
		this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			date: [""],
			typeExamen: [""],
			medecinOperant: [""],
			status: [""],
		});
		this.statutService.getAll().subscribe((res) => {
			this.status = res;
			console.log(res);
			console.log(this.status);
		});
		this.medecinService.getAll().subscribe((res) => {
			this.medecinOperant = res;
			console.log(res);
			console.log(this.medecinOperant);
		});
		this.typeExamenService.getAll().subscribe((res) => {
			this.typeExamen = res;
			console.log(res);
			console.log(this.typeExamen);
		});
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-obstacles"]);
	}
	ajouter() {
		if (this.ajoutForm.valid) {
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
