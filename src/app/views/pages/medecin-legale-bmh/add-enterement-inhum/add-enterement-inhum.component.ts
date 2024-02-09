import { Component, OnInit } from "@angular/core";
import { InterfaceCommune } from "../../parametrage-bmh/list-commune/list-commune.component";
import { InterfaceArrondissement } from "../../parametrage-bmh/list-arrondissement/list-arrondissement.component";
import { InterfaceQuartier } from "../../parametrage-bmh/list-quartier/list-quartier.component";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { EnterementInhumService } from "../services/enterement-inhum.service";
import { CommuneService } from "../../parametrage-bmh/services/commune.service";
import { ArrondissemntService } from "../../parametrage-bmh/services/arrondissemnt.service";
import { QuartierService } from "../../parametrage-bmh/services/quartier.service";
import { InterfaceType } from "../../parametrage-bmh/list-types/list-types.component";
import { TypeServiceService } from "../../parametrage-bmh/services/type-service.service";
import { TypeExamenService } from "../../parametrage-bmh/services/type-examen.service";
import Swal from "sweetalert2";
import { InterfaceObstacle } from "../list-obstacles/list-obstacles.component";
import { ObstacleDefuntsService } from "../services/obstacle-defunts.service";
import { ObstacleService } from "../services/obstacle.service";

@Component({
	selector: "kt-add-enterement-inhum",
	templateUrl: "./add-enterement-inhum.component.html",
	styleUrls: ["./add-enterement-inhum.component.scss"],
})
export class AddEnterementInhumComponent implements OnInit {
	info: any;
	id: any;
	obstacleDefunts: InterfaceObstacle[] = [];
	type: InterfaceType[] = [];
	commune: InterfaceCommune[] = [];
	arrondissement: InterfaceArrondissement[] = [];
	quartier: InterfaceQuartier[] = [];
	ajoutForm: any;
	constructor(private serviceObstacle: ObstacleService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private service: EnterementInhumService, private communeService: CommuneService, private arrondissementService: ArrondissemntService, private quartierService: QuartierService, private typeService: TypeExamenService, private obstacleDefuntService: ObstacleService) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.id = params.id;

			this.serviceObstacle.getById(this.id).subscribe(
				(data: any) => {
					this.info = data; // Stocker les informations récupérées dans la variable 'info'

					this.info.value;
					this.ajoutForm.patchValue({
						obstacleDefunts: this.info.obstacle, // Supposons que 'obstacle' est l'attribut dans 'Cadavre' contenant l'objet 'Obstacle'
					});
				},
				(error: any) => {
					console.error("Erreur lors de la récupération des données :", error);
				}
			);
		});
		this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			type: [""],
			sexe: [""],
			lieuRecuperation: [""],
			lieuEnterrement: [""],
			date: [""],
			arrondissement: [""],
			commune: [""],
			quartier: [""],
			obstacleDefunts: [""],
		});
		this.typeService.getAll().subscribe((res) => {
			this.type = res;
			console.log(res);
			console.log(this.type);
		});
		this.communeService.getAll().subscribe((res) => {
			this.commune = res;
			console.log(res);
			console.log(this.commune);
		});
		this.arrondissementService.getAll().subscribe((res) => {
			this.arrondissement = res;
			console.log(res);
			console.log(this.arrondissement);
		});
		this.quartierService.getAll().subscribe((res) => {
			this.quartier = res;
			console.log(res);
			console.log(this.quartier);
		});
		this.obstacleDefuntService.getAll().subscribe((res) => {
			this.obstacleDefunts = res;
			console.log(res);
			console.log(this.obstacleDefunts);
		});
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/add-cadavre/", this.id]);
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
