import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OrigineService } from "../services/origine.service";

@Component({
	selector: "kt-list-origine",
	templateUrl: "./list-origine.component.html",
	styleUrls: ["./list-origine.component.scss"],
})
export class ListOrigineComponent implements OnInit {
	origine: InterfaceOrigine[] = [];
	displayedColumns: string[] = ["ID", "Nom", "Prenom", "CIN", "NumBulletin", "Date", "Nationalite", "Connu", "actions"];
	constructor(private router: Router, private service: OrigineService) {}

	ngOnInit() {
		this.service.getAll().subscribe((res) => {
			this.origine = res;
			console.log(res);
		});
	}
	add() {
		this.router.navigate(["/bmh1/add-origine"]);
	}
	Details(id: any) {
		return this.router.navigate(["/bmh1/details-origine/", id]);
	}
	Modifier(id: any) {
		this.router.navigate(["/bmh1/update-origine/", id]);
	}
}
export interface InterfaceOrigine {
	id: number;
	nom: string;
	prenom: string;
	cin: string;
	date: Date;
	numBulletin: number;
	nationalite: string;
	connu: boolean;
}
