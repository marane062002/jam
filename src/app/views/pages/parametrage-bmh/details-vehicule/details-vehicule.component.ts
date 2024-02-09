import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// import { VehiculeService } from '../../pesee/Services/vehicule.service';
import { VehiculeService } from "../services/vehicule.service";

@Component({
	selector: "kt-details-vehicule",
	templateUrl: "./details-vehicule.component.html",
	styleUrls: ["./details-vehicule.component.scss"],
})
export class DetailsVehiculeComponent implements OnInit {
	id: any;
	info: any;
	constructor(private router: Router, private route: ActivatedRoute, private service: VehiculeService) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.id = params["id"]; // Récupération de l'ID à partir des paramètres de l'URL

			this.service.getById(this.id).subscribe(
				(data: any) => {
					this.info = data; // Stocker les informations récupérées dans la variable 'info'
				},
				(error: any) => {
					console.error("Erreur lors de la récupération des données :", error);
				}
			);
		});
	}
	RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-vehicule"]);
	}
}
