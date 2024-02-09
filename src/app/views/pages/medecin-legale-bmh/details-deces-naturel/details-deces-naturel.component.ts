import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DecesNaturelsService } from "../services/deces-naturels.service";

@Component({
	selector: "kt-details-deces-naturel",
	templateUrl: "./details-deces-naturel.component.html",
	styleUrls: ["./details-deces-naturel.component.scss"],
})
export class DetailsDecesNaturelComponent implements OnInit {
	id: any;
	info: any;
	constructor(private service: DecesNaturelsService, private route: ActivatedRoute, private router: Router) {}

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
		this.router.navigate(["/bmh1/list-deces-naturel"]);
	}
}
