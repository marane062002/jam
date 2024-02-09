import { Component, OnInit, ViewChild } from "@angular/core";
import { ConsultationService } from "../../shared/consultation.service";
import { Router } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

@Component({
	selector: "kt-consultation-list",
	templateUrl: "./consultation-list.component.html",
	styleUrls: ["./consultation-list.component.scss"],
})
export class ConsultationListComponent implements OnInit {
	// =========================================================================
	//
	// =========================================================================
	constructor(private service: ConsultationService, private router: Router) {
		this.getConsultations();
	}
	// =========================================================================
	//
	// =========================================================================
	displayedColumns = [
		// "id",
		"numConsultation",
		"budgetGlobalPropose", 
		"type",
		"dateDebutConsultation",
		"statut",
		"actions",
	];
	// =========================================================================
	//
	// =========================================================================
	dataSize: number = 0;
	isLoading = true;
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// =========================================================================
	//
	// =========================================================================
	ngOnInit() {}
	// =========================================================================
	//
	// =========================================================================
	getConsultations() {
		const _this = this;
		this.service.getAllConsultation().then(
			(data) => {
				console.log("Consultation : " + JSON.stringify(data, null, 2));
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
	// =========================================================================
	//
	// =========================================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// =========================================================================
	//
	// =========================================================================
	nouvelleconsultation() {
		this.router.navigate(["/marches/consultation-form"]);
	}
	// =========================================================================
	//
	// =========================================================================
	editconsultation(consId) {
		this.router.navigate(
			["/marches/consultation-form-service-bon-commande"],
			{ queryParams: { id: consId } }
		);
	}
	// =========================================================================
	//
	// =========================================================================
	showconsultation(consId) {
		this.router.navigate(["/marches/consultation-detail"], {
			queryParams: { id: consId },
		});
	}
}
