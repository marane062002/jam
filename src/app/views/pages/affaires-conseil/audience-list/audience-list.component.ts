import { Component, OnInit, ViewChild } from "@angular/core";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

@Component({
	selector: "kt-audience-list",
	templateUrl: "./audience-list.component.html",
	styleUrls: ["./audience-list.component.scss"],
})
export class AudienceListComponent implements OnInit {
	// ==========================================================
	//
	// ==========================================================
	displayedColumns = [
		"numAudience",
		"session",
		"dateAudience",
		"heureDebut",
		"heureFin",
		"actions",
	];
	// ==========================================================
	//
	// ==========================================================
	dataSize: number = 0;
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
		this.getAudiences();
	}
	// ==========================================================
	//
	// ==========================================================
	async getAudiences() {
		const _this = this;
		await this.service.getAllAudience().subscribe(
			(data) => {
				this.isLoading = false;
				_this.dataSize = data.length;
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
				_this.dataSize = 0;
				console.log(err);
				this.isLoading = false;
			}
		);
	}
	// ==========================================================
	//
	// ==========================================================
	nouveauAudience() {
		this.router.navigate(["/affaires-conseil/audience-form"]);
	}
	// ==========================================================
	//
	// ==========================================================
	editAudience(row) {
		this.router.navigate(["/affaires-conseil/audience-edit"], {
			queryParams: { id: row },
		});
	}
	// ==========================================================
	//
	// ==========================================================
	EvaluerPoints(row) {
		this.router.navigate(["/affaires-conseil/evaluation-points-audience"], {
			queryParams: { id: row },
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
}
