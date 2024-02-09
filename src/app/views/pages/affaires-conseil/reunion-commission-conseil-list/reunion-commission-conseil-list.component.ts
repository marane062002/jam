import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Router } from "@angular/router";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";

@Component({
	selector: "kt-reunion-commission-conseil-list",
	templateUrl: "./reunion-commission-conseil-list.component.html",
	styleUrls: ["./reunion-commission-conseil-list.component.scss"],
})
export class ReunionCommissionConseilListComponent implements OnInit {
	// ==========================================================
	//
	// ==========================================================
	displayedColumns = [
		//"id",
		"session",
		"commission",
		"libelleReunion",
		"dateReunion",
		"heureDebut",
		"heureFin",
		"actions",
	];
	// ==========================================================
	//
	// ==========================================================
	dataSize:number = 0;
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
		const _this = this;
		await this.service.getAllReunionCommission().subscribe(
			(data) => {
				_this.dataSize = data.length;
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
				_this.dataSize = 0;
				console.log(err);
				this.isLoading = false;
			}
		);
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
		this.router.navigate(["/affaires-conseil/reunion-commission-form"]);
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
