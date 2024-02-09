import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { InterfaceOrganisme } from "../list-organisme/list-organisme.component";
import { InterfaceVehicule } from "../../parametrage-bmh/list-vehicule/list-vehicule.component";
import { OrganismeService } from "../services/organisme.service";
import { FourgonService } from "../services/fourgon.service";
import { VehiculeService } from "../../parametrage-bmh/services/vehicule.service";

@Component({
	selector: "kt-update-fourgon",
	templateUrl: "./update-fourgon.component.html",
	styleUrls: ["./update-fourgon.component.scss"],
})
export class UpdateFourgonComponent implements OnInit {
	organisme: InterfaceOrganisme[] = [];
	vehicule: InterfaceVehicule[] = [];
	pcj: File;
	constructor(private service: FourgonService, private vehiculeService: VehiculeService, private organismeService: OrganismeService, private router: Router, private route: ActivatedRoute, private fourgonService: FourgonService) {}
	FormArticle = new FormGroup({
		id: new FormControl(""),
		matricule: new FormControl("", Validators.required),
		couleur: new FormControl("", Validators.required),
		vehicule: new FormControl("", Validators.required),
		organisme: new FormControl("", Validators.required),
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
		this.organismeService.getAll().subscribe((res) => {
			this.organisme = res;
			console.log(res);
			console.log(this.organisme);
		});
		this.vehiculeService.getAll().subscribe((res) => {
			this.vehicule = res;
			console.log(res);
			console.log(this.vehicule);
		});
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-fourgon"]);
	}
	onPcJChange(event : any){
		this.pcj = event.target.files[0];
	}
	selectedValueOrganismeFunction(p1: InterfaceOrganisme, p2: InterfaceOrganisme) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	selectedValueVehiculeFunction(p1: InterfaceVehicule, p2: InterfaceVehicule) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	update() {
		if (this.FormArticle.valid) {
			const formData = new FormData();
			formData.append("fourgon", new Blob([JSON.stringify(this.FormArticle.value)],{ type: 'application/json' }));
			formData.append("pcj",this.pcj)
			this.service.update(this.FormArticle.value.id,formData).subscribe(
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
