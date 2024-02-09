import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ExamenService } from "../services/examen.service";

@Component({
	selector: "kt-list-examen",
	templateUrl: "./list-examen.component.html",
	styleUrls: ["./list-examen.component.scss"],
})
export class ListExamenComponent implements OnInit {
	examen: InterfaceExamen[] = [];
	displayedColumns: string[] = ["ID", "Casier", "Deces", "Status", "Date", "actions"];

	constructor(private router: Router, private service: ExamenService) {}

	ngOnInit() {
		this.service.getAll().subscribe((res) => {
			this.examen = res;

			console.log(res);
		});
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-obstacle"]);
	}
	add() {
		this.router.navigate(["/bmh1/add-examen"]);
	}

	Details(id: any) {
		this.router.navigate(["/bmh1/details-examen/", id]);
	}
	update(id: any) {
		this.router.navigate(["/bmh1/update-examen", id]);
	}
}
export interface InterfaceExamen {
	id: number;
	date: Date;
	typeExamen: string;
	medecinOperant: string;
	status: string;
}
