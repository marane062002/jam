import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EnterementInhumService } from "../services/enterement-inhum.service";

@Component({
	selector: "kt-details-enterement-inhum",
	templateUrl: "./details-enterement-inhum.component.html",
	styleUrls: ["./details-enterement-inhum.component.scss"],
})
export class DetailsEnterementInhumComponent implements OnInit {
	info: any;
	id: any;
	constructor(private route: ActivatedRoute, private service: EnterementInhumService, private router: Router) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.id = params["id"]; // Récupération de l'ID à partir des paramètres de l'URL

			this.service.getById(this.id).subscribe(
				(data: any) => {
					this.info = data; // Stocker les informations récupérées dans la variable 'info'

					// const dateDeclarationFormatee = this.datePipe.transform(this.info.dateDeclaration, 'yyyy-MM-ddTHH:mm');
					// const dateDecesFormatee = this.datePipe.transform(this.info.dateDeces, 'yyyy-MM-ddTHH:mm');
					// const dateEnterrementFormatee = this.datePipe.transform(this.info.date, 'yyyy-MM-ddTHH:mm');
					// this.info.dateDeclaration=dateDeclarationFormatee;
					// this.info.dateDeces=dateDecesFormatee;
					// this.info.date=dateEnterrementFormatee;
					//
					// console.log(dateDecesFormatee)
					this.info.value;
				},
				(error: any) => {
					console.error("Erreur lors de la récupération des données :", error);
				}
			);
		});
	}

	RetourEmbalages(): void {
		this.router.navigate(["/bmh1/list-enterementInhum"]);
	}
}
