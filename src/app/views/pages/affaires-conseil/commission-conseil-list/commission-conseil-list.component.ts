import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

@Component({
	selector: "kt-commission-conseil-list",
	templateUrl: "./commission-conseil-list.component.html",
	styleUrls: ["./commission-conseil-list.component.scss"],
})
export class CommissionConseilListComponent implements OnInit {
	// ==========================================================
	//
	// ==========================================================
	displayedColumns = ["id", "nomCommission", "objectif", "mondat", "actions"];
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	isLoading = true;
	dataSize: number = 0;
	// ==========================================================
	//
	// ==========================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	// ==========================================================
	//
	// ==========================================================
	ngOnInit() {
		this.getCommissions();
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
	async getCommissions() {
		const _this = this;
		await this.service.getAllCommission().subscribe(
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
	nouvelleCommission() {
		this.router.navigate(["/affaires-conseil/commission-conseil-form"]);
	}
	// ==========================================================
	//
	// ==========================================================
	showCommission(row) {
		this.router.navigate(["/affaires-conseil/commission-conseil-detail"], {
			queryParams: { id: row },
		});
	}
	// ==========================================================
	//
	// ==========================================================
	editCommission(row) {
		this.router.navigate(["/affaires-conseil/commission-conseil-edit"], {
			queryParams: { id: row },
		});
	}
}
