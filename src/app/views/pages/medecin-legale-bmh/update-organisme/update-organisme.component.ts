import { Component, OnInit } from "@angular/core";
import { InterfaceType } from "../../parametrage-bmh/list-types/list-types.component";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { TypeServiceService } from "../../../pages/parametrage-bmh/services/type-service.service";
import { OrganismeService } from "../services/organisme.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
	selector: "kt-update-organisme",
	templateUrl: "./update-organisme.component.html",
	styleUrls: ["./update-organisme.component.scss"],
})
export class UpdateOrganismeComponent implements OnInit {
	type: InterfaceType[] = [];
	constructor(private typeService: TypeServiceService, private router: Router, private route: ActivatedRoute, private service: OrganismeService) {}
	FormArticle = new FormGroup({
		id: new FormControl(""),
		raisonSociale: new FormControl("", Validators.required),
		rc: new FormControl("", Validators.required),
		ice: new FormControl("", Validators.required),
		adresse: new FormControl("", Validators.required),
		iff: new FormControl("", Validators.required),
		tel: new FormControl("", Validators.required),
		type: new FormControl("", Validators.required),
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
		this.typeService.getAllTypes().subscribe((res) => {
			this.type = res;
		});
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-organisme"]);
	}

	selectedValueTypeFunction(p1: InterfaceType, p2: InterfaceType) {
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
