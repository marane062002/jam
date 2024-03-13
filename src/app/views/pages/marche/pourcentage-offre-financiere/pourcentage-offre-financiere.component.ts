import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { PourcentageOffreFinanciereService } from "../../shared/pourcentage-offre-financiere.service";

@Component({
	selector: "kt-pourcentage-offre-financiere",
	templateUrl: "./pourcentage-offre-financiere.component.html",
	styleUrls: ["./pourcentage-offre-financiere.component.scss"],
})
export class PourcentageOffreFinanciereComponent implements OnInit {
	Form1: FormGroup;
	Form2: FormGroup;

	loading

	constructor(private pourcentageOffreFinanciereService: PourcentageOffreFinanciereService) {
		this.Form1 = new FormGroup({
			categorie: new FormControl("Travaux"),
			pourcentage1: new FormControl("", [Validators.required]),
			pourcentage2: new FormControl("", [Validators.required]),
		});
		this.Form2 = new FormGroup({
			categorie: new FormControl("Fourniture"),
			pourcentage1: new FormControl("", [Validators.required]),
			pourcentage2: new FormControl("", [Validators.required]),
		});
	}


	ngOnInit() {
		this.getAllPourcentages();
	}


	getAllPourcentages() {
		this.pourcentageOffreFinanciereService.getPourcentageOffreFinanciere().subscribe((res: any) => {
			if (res.body[(res.body.length) - 2].categorie == 'Travaux') {
				this.Form1.patchValue({
					pourcentage1: res.body[(res.body.length) - 2].pourcentage1,
					pourcentage2: res.body[(res.body.length) - 2].pourcentage2,
				});
				this.Form2.patchValue({
					pourcentage1: res.body[(res.body.length) - 1].pourcentage1,
					pourcentage2: res.body[(res.body.length) - 1].pourcentage2,
				});
			} else {
				this.Form1.patchValue({
					pourcentage1: res.body[(res.body.length) - 1].pourcentage1,
					pourcentage2: res.body[(res.body.length) - 1].pourcentage2,
				});
				this.Form2.patchValue({
					pourcentage1: res.body[(res.body.length) - 2].pourcentage1,
					pourcentage2: res.body[(res.body.length) - 2].pourcentage2,
				});
			}
		});
	}
	onEdit() {
		if (this.Form1.valid) {
			this.Form1.value.categorie = "Travaux";
			this.pourcentageOffreFinanciereService.savePourcentageOffreFinanciere(this.Form1.value).subscribe(
				(response) => {
					console.log(response);
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Les parts ont été modifiées avec succès",
						showConfirmButton: false,
						timer: 2500,
					});
					this.getAllPourcentages();
				},
				(error) => {
					console.log(error);
					Swal.fire({
						position: "center",
						icon: "error",
						title: "Erreur de modification",
						showConfirmButton: false,
						timer: 2500,
					});
				}
			);
		}
		if (this.Form2.valid) {
			this.Form2.value.categorie = "Fournitures";
			this.pourcentageOffreFinanciereService.savePourcentageOffreFinanciere(this.Form2.value).subscribe(
				(response) => {
					console.log(response);
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Les parts ont été modifiées avec succès",
						showConfirmButton: false,
						timer: 2500,
					});
					this.getAllPourcentages();
				},
				(error) => {
					console.log(error);
					Swal.fire({
						position: "center",
						icon: "error",
						title: "Erreur de modification",
						showConfirmButton: false,
						timer: 2500,
					});
				}
			);
		}
	}
}
