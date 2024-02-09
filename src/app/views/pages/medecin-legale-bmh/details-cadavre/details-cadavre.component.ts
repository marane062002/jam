import { Component, OnInit } from "@angular/core";
import { CadavreService } from "../services/cadavre.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "kt-details-cadavre",
	templateUrl: "./details-cadavre.component.html",
	styleUrls: ["./details-cadavre.component.scss"],
})
export class DetailsCadavreComponent implements OnInit {
	id: any;
	info: any;
	constructor(private service: CadavreService, private route: ActivatedRoute, private router: Router) {}

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
		this.router.navigate(["/bmh1/list-cadavre"]);
	}
}
