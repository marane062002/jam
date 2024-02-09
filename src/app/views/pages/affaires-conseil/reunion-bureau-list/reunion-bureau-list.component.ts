import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router } from "@angular/router";

@Component({
	selector: "kt-reunion-bureau-list",
	templateUrl: "./reunion-bureau-list.component.html",
	styleUrls: ["./reunion-bureau-list.component.scss"],
})
export class ReunionBureauListComponent implements OnInit {
	// ==========================================================
	//
	// ==========================================================
	displayedColumns = [
		//"id",
		"libelleReunion",
		"dateReunion",
		"heureDebut",
		"heureFin",
		"actions",
	];
	// ==========================================================
	//
	// ==========================================================
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	isLoading = true;
	// ==========================================================
	//
	// ==========================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router
	) {}
	// ==========================================================
	//
	// ==========================================================
	ngOnInit() {
		this.getReunions();
	}
	// ==========================================================
	//
	// ==========================================================
	async getReunions() {
		await this.service.getAllReunionBureau().subscribe((data) => {
			this.isLoading = false;
			this.dataSource = new MatTableDataSource(data);
			this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
			this.paginator._intl.nextPageLabel = "الصفحة التالية";
			this.paginator._intl.previousPageLabel = "الصفحة السابقة";
			this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
			this.paginator._intl.firstPageLabel = "الصفحة الأولى";
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		},
		(err) => {
			console.log(err);
			this.isLoading = false;
		});
	}
	// ==========================================================
	//
	// ==========================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// ==========================================================
	//
	// ==========================================================
	addReunion() {
		this.router.navigate(["/affaires-conseil/reunion-bureau-form"]);
	}
	// ==========================================================
	//
	// ==========================================================
	showReunion(row) {
		this.router.navigate(["/affaires-conseil/reunion-commission-detail"], {
			queryParams: { id: row },
		});
	}
	// ==========================================================
	//
	// ==========================================================
	editReunion(row) {
		this.router.navigate(["/affaires-conseil/reunion-commission-edit"], {
			queryParams: { id: row },
		});
	}
}
