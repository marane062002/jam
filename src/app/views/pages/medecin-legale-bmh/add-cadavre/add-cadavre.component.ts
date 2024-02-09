import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CadavreService } from "../services/cadavre.service";
import Swal from "sweetalert2";
import { InterfaceObstacle } from "../list-obstacles/list-obstacles.component";
import { ObstacleDefuntsService } from "../services/obstacle-defunts.service";
import { ObstacleService } from "../services/obstacle.service";
import { FourgonService } from "../services/fourgon.service";
import { InterfaceFourgon } from "../list-fourgon/list-fourgon.component";
import { ConducteurService } from "../../parametrage-bmh/services/conducteur.service";
import { InterfaceConducteur } from "../../parametrage-bmh/list-conducteur/list-conducteur.component";

@Component({
	selector: "kt-add-cadavre",
	templateUrl: "./add-cadavre.component.html",
	styleUrls: ["./add-cadavre.component.scss"],
})
export class AddCadavreComponent implements OnInit {
	conducteur: InterfaceConducteur[] = [];
	fourgon: InterfaceFourgon[] = [];
	info: any;
	id: any;
	obstacleDefunts: InterfaceObstacle[] = [];
	ajoutForm: any;
	constructor(private conducteurService: ConducteurService, private serviceFourgon: FourgonService, private serviceObstacle: ObstacleService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private service: CadavreService, private serviceObstacleDefunts: ObstacleService) {}
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
			date: [""],
			nom: [""],
			prenom: [""],
			cin: [""],
			tel: [""],
			obstacleDefunts: [""],
			observation: [""],
			fourgon: [""],
			conducteurObstacle: [""],
			conducteur: [""],
			statut: [""],
			autorizationProcureur: [""],
		});

		this.serviceFourgon.getAll().subscribe((res) => {
			this.fourgon = res;
			console.log(this.fourgon);
		});
		this.conducteurService.getAll().subscribe((res) => {
			this.conducteur = res;
			console.log(this.conducteur);
		});
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/details-obstacles/", this.id]);
	}
	transfert() {
		this.router.navigate(["/bmh1/add-transfert/", this.id]);
	}
	enterrement() {
		this.router.navigate(["/bmh1/add-enterementInhum", this.id]);
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
