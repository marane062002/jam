import { Component, OnInit } from "@angular/core";
import { AutopsieService } from "../services/autopsie.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
	selector: "kt-details-autopsie",
	templateUrl: "./details-autopsie.component.html",
	styleUrls: ["./details-autopsie.component.scss"],
})
export class DetailsAutopsieComponent implements OnInit {
	id: any;
	info: any;
	constructor(private datePipe:DatePipe,private service: AutopsieService, private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.id = params["id"]; // Récupération de l'ID à partir des paramètres de l'URL

			this.service.getById(this.id).subscribe(
				(data: any) => {
					this.info = data; // Stocker les informations récupérées dans la variable 'info'
					this.info.forEach((item: any) => {
						item.formattedDate = this.formatDate(item.date); // Assuming date is the property containing the date
					});
				},
				(error: any) => {
					console.error("Erreur lors de la récupération des données :", error);
				}
			);
		});
	}
	formatDate(date: any): string {
		// Assuming this method formats the Unix timestamp to yyyy/mm/dd
		return this.datePipe.transform(date, "yyyy/MM/dd") || "";
	}
	RetourEmbalages(): void {
		this.router.navigate(["/bmh1/list-autopsie"]);
	}
}
