import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { ListCarteService } from "../services/list-carte.service";
@Component({
	selector: "kt-list-cartes",
	templateUrl: "./list-cartes.component.html",
	styleUrls: ["./list-cartes.component.scss"],
})
export class ListCartesComponent implements OnInit {
	cartes: InterfaceCartes[] = [];
	isLoading
	dataSource = new MatTableDataSource<InterfaceCartes>();
	displayedColumns: string[] = ["Num", "libelle", "description", "actions"];
	constructor(private router: Router, private service: ListCarteService) {}

	ngOnInit() {
		this.getAllD();
	}

	update(id: any) {
		return this.router.navigate(["/bmh1/update-deces-naturel/", id]);
	}
	details(id: any) {
		return this.router.navigate(["/bmh1/details-deces-naturel/", id]);
	}
	applyFilter(e:any) {}
	ajouter() {
		this.router.navigate(["/bmh1/add-deces-naturel"]);
	}

	getAllD() {
		this.service.getAll().subscribe(
			(res) => {
				this.cartes = res;
				console.log(res);
			},
			(err) => {
				console.log("err est:", err);
			}
		);
	}
}
export interface InterfaceCartes {
	id: number;
	libelle: string;
	description: string;
}
