import { ImmobilisationService } from './../../../utils/immobilisation.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Router } from "@angular/router";

@Component({
	selector: "kt-list-emplacement",
	templateUrl: "./list-emplacement.component.html",
	styleUrls: ["./list-emplacement.component.scss"]
})
export class ListEmplacementComponent implements OnInit {
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = ["designation", "libelle", "description", "actions"];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<IEmplacement>();
	emplacement = [];
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private emplacementService: ImmobilisationService,
		private router: Router
	) {
		this.getEmplacement();
	}

	ngOnInit() {}
	// ============================================
	// Recuperer tous les emplacements
	// ============================================
	private getEmplacement() {
		const datasrc: IEmplacement[] = [];
		this.emplacementService
			.getAllObject("/emplacement/index")
			.subscribe(data => {
				this.emplacement = data;
				for (let i = 0; i < this.emplacement.length; i++) {
					datasrc.push(this.newEmplacement(i));
				}
				this.dataSource = new MatTableDataSource(datasrc);

				this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
				this.paginator._intl.nextPageLabel = "الصفحة التالية";
				this.paginator._intl.previousPageLabel = "الصفحة السابقة";
				this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
				this.paginator._intl.firstPageLabel = "الصفحة الأولى";

				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			});
	}
	// ============================================
	// Filter de recherche
	// ============================================
	applyFilter(filterValue: string) {
		console.log(filterValue);
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	}
	// ============================================
	// Methode de recuperation de données
	// ============================================
	newEmplacement(i: number): IEmplacement {
		return {
			id: this.emplacement[i].id,
			designation: this.emplacement[i].designation,
			libelle: this.emplacement[i].libelle,
			description: this.emplacement[i].description
		};
	}

	// ============================================
	// Methode de suppression des emplacements
	// ============================================
	deleteEmplacement(emp): void {
		this.emplacementService
			.deleteObject("/emplacement/delete/", emp)
			.subscribe(data => {
				console.log("getId :" + emp);
				this.getEmplacement();
			});
	}
	// ============================================
	// Methode de modification des emplacements
	// ============================================
	editEmplacement(emp: any): void {
		window.localStorage.removeItem("editemplacementId");
		window.localStorage.setItem("editemplacementId", emp.id.toString());
		this.router.navigate(["emplacement/edit-emplacement"]);
	}
	// ============================================
	// Methode détails emplacements
	// ============================================
	detailsEmplacement(emp: any): void {
		window.localStorage.removeItem("emplacement-showId");
		window.localStorage.setItem("emplacement-showId",emp.id.toString());
		this.router.navigate(["emplacement/show-emplacement"]);
	}
	// ============================================
	// Methode d'insertion des emplacements
	// ============================================
	addEmplacement(): void {
		this.router.navigate(["emplacement/add-emplacement"]);
	}
}
export interface IEmplacement {
	id: number;
	designation: string;
	libelle: string; // service proxy
	description: string;
}
