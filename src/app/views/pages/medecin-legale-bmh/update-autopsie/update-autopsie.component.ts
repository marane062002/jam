import { Component, OnInit } from "@angular/core";
import { InterfaceMedecin } from "../../parametrage-bmh/list-medecin-operant/list-medecin-operant.component";
import { InterfaceStatus } from "../../parametrage-bmh/list-status/list-status.component";
import { ActivatedRoute, Router } from "@angular/router";
import { InterfaceAutopsie } from "../list-autopsie/list-autopsie.component";
import { MedecinService } from "../../parametrage-bmh/services/medecin.service";
import { AutopsieService } from "../services/autopsie.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StatusService } from "../../parametrage-bmh/services/status.service";
import Swal from "sweetalert2";
import { DatePipe, Location } from "@angular/common";

@Component({
	selector: "kt-update-autopsie",
	templateUrl: "./update-autopsie.component.html",
	styleUrls: ["./update-autopsie.component.scss"],
})
export class UpdateAutopsieComponent implements OnInit {
	medecinOperant: InterfaceMedecin[] = [];
	status: InterfaceStatus[] = [];
	id: any;
	autopsie: InterfaceAutopsie;
	constructor(private location: Location,private datePipe: DatePipe, private router: Router, private medecinOperantService: MedecinService, private statutService: StatusService, private service: AutopsieService, private route: ActivatedRoute) {}
	FormArticle = new FormGroup({
		id: new FormControl(""),
		date: new FormControl("", Validators.required),
		status: new FormControl("", Validators.required),
		medecinOperant: new FormControl("", Validators.required),
	});

	ngOnInit() {
		const id = this.route.snapshot.params["id"];
		this.service.getById(id).subscribe(
			(res) => {
				console.log(res);
				this.FormArticle.patchValue({ ...res });

				const dateFormatee = this.datePipe.transform(this.FormArticle.value.date, "yyyy-MM-dd");
				// this.FormArticle.value.date = dateFormatee
				this.FormArticle.patchValue({ date: dateFormatee });

				console.log(dateFormatee);
				this.FormArticle.value;
			},
			(err) => {
				console.log(err);
			}
		);
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
	selectedValueMedecinOperantFunction(p1: InterfaceMedecin, p2: InterfaceMedecin) {
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
	RetourEmbalages() {
		this.location.back();
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
						this.RetourEmbalages();
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
