import { Component, OnInit } from "@angular/core";
import { InterfaceStatus } from "../../parametrage-bmh/list-status/list-status.component";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { StatusService } from "../../parametrage-bmh/services/status.service";
import { PrelevementService } from "../services/prelevement.service";
import Swal from "sweetalert2";

@Component({
	selector: "kt-add-prelevement",
	templateUrl: "./add-prelevement.component.html",
	styleUrls: ["./add-prelevement.component.scss"],
})
export class AddPrelevementComponent implements OnInit {
	status: InterfaceStatus[] = [];
	ajoutForm: any;
	constructor(private router: Router, private formBuilder: FormBuilder, private statutService: StatusService, private service: PrelevementService) {}

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
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-prelevement"]);
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
