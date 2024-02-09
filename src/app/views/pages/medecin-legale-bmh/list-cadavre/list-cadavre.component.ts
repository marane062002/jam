import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CadavreService } from "../services/cadavre.service";

@Component({
	selector: "kt-list-cadavre",
	templateUrl: "./list-cadavre.component.html",
	styleUrls: ["./list-cadavre.component.scss"],
})
export class ListCadavreComponent implements OnInit {
	cadavre: InterfaceCadvre[] = [];
	displayedColumns: string[] = ["ID", "numDeces", "Date", "Statut", "Observation", "AutorizationProcureur", "actions"];

	constructor(private router: Router, private service: CadavreService) {}

	ngOnInit() {
		this.service.getAll().subscribe((res) => {
			this.cadavre = res;

			console.log(res);
		});
	}

	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-cadavre"]);
	}
	add() {
		this.router.navigate(["/bmh1/add-cadavre"]);
	}

	Details(id: any) {
		this.router.navigate(["/bmh1/details-cadavre/", id]);
	}
	update(id: any) {
		this.router.navigate(["/bmh1/update-cadavre", id]);
	}
}
export interface InterfaceCadvre {
	id: number;
	date: Date;
	observation: string;
	statut: string;
	autorizationProcureur: boolean;
	obstacleDefunts: string;
}
