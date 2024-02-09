import { Component, OnInit } from "@angular/core";
import { InterfaceMedecin } from "../../parametrage-bmh/list-medecin-operant/list-medecin-operant.component";
import { InterfaceStatus } from "../../parametrage-bmh/list-status/list-status.component";
import { InterfaceAutopsie } from "../list-autopsie/list-autopsie.component";
import { MedecinService } from "../../parametrage-bmh/services/medecin.service";
import { StatusService } from "../../parametrage-bmh/services/status.service";
import { AutopsieService } from "../services/autopsie.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { DatePipe, Location } from "@angular/common";

@Component({
	selector: "kt-add-autopsie",
	templateUrl: "./add-autopsie.component.html",
	styleUrls: ["./add-autopsie.component.scss"],
})
export class AddAutopsieComponent implements OnInit {
	medecinOperant: InterfaceMedecin[] = [];
	status: InterfaceStatus[] = [];
	ajoutForm: any; // Formulaire de type FormGroup
	private autopsie: InterfaceAutopsie;

	constructor( private datePipe: DatePipe,private location: Location,private medecinOperantService: MedecinService, private statutService: StatusService, private service: AutopsieService, private router: Router, private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			date: ["", Validators.required],
			medecinOperant: ["", Validators.required],
			status: [""],
		});

		// this.ajoutForm = this.formBuilder.group(this.ajoutForm);
		this.medecinOperantService.getAll().subscribe((res) => {
			this.medecinOperant = res;
			console.log(res);
			console.log(this.medecinOperant);
		});
		this.statutService.getAll().subscribe((res) => {
			this.status = res;
			console.log(res);
			console.log(this.status);
		});
	}

	RetourEmbalages() {
		this.location.back();
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
						text: "Un problème est survenu lors de l'enregistrement d Autopsie.",
						icon: "error",
						confirmButtonText: "OK",
					});
				}
			);
		}
	}

	formatDate(date: any): String {
		return this.datePipe.transform(date, "yyyy-MM-dd") || "";
	}
}
