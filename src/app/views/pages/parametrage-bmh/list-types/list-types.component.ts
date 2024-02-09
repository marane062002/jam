import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { DatePipe } from "@angular/common";
import { TypeServiceService } from "../services/type-service.service";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { types } from "util";

@Component({
	selector: "kt-list-types",
	templateUrl: "./list-types.component.html",
	styleUrls: ["./list-types.component.scss"],
})
export class ListTypesComponent implements OnInit {
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];

	// Création d'une MatTableDataSource avec les données
	//  dataSource = new MatTableDataSource<any>();
	type: any = [];

	// filteredTypes: InterfaceType[] = []; // Liste filtrée à afficher
	libelleFilter = ""; // Variable pour stocker le libellé de filtrage

	constructor(private router: Router, private service: TypeServiceService) {}

	ngOnInit() {
		this.getAllT();
		// this.filteredTypes=this.type;
	}
	getAllT() {
		this.service.getAllTypes().subscribe(
			(res) => {
				this.type = res;
				//  this.type = data.types;

				console.log(res);
			},
			(err) => {
				console.log(err);
			}
		);
	}

	addAssociation(): void {
		this.router.navigate(["/bmh/add-types"]);
	}

	//   applyFilter(filterValue: string) {
	// 	// Convertit la valeur de filtrage en minuscules
	//
	// 	filterValue = filterValue.trim().toLowerCase();

	// 	// Applique le filtre à la source de données MatTableDataSource
	// 	this.type.filter = filterValue;
	//   }

	DetailAssociation() {
		this.router.navigate(["pages/bmh/detaille-type"]);
	}

	ModifierAssociation(id: any) {
		this.router.navigate(["/bmh/upd-type/", id]);
	}
	id: any;

	DetailsType(id: any) {
		this.router.navigate(["/bmh/details-type/", id]);
	}

	delete(id: any) {
		Swal.fire({
			title: " ",
			text: "voulez-vous vraiment supprimer ce  entrées de stock  ?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Supprimer",
			cancelButtonText: "Fermer",
		}).then((result) => {
			if (result.isConfirmed) {
				this.service.deleteType(id).subscribe(
					(res) => {
						this.ngOnInit();
						Swal.fire({
							title: "entrées de stock à été   supprimé avec succès !",
							icon: "success",
						});
					},
					(err) => {
						console.log(err);
					}
				);
			}
		});
	}
}
export interface InterfaceType {
	id: number;
	libelle: string;
	description: string;
}
