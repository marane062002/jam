import { Component, OnInit, ViewChild } from "@angular/core";
import { AoService } from "../../shared/ao.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Router } from "@angular/router";
import { delay } from 'rxjs/operators';

@Component({
	selector: "kt-prestataires-list",
	templateUrl: "./prestataires-list.component.html",
	styleUrls: ["./prestataires-list.component.scss"],
})
export class PrestatairesListComponent implements OnInit {
	// ====================================================================
	//
	// ====================================================================
	dataSize: number = 0;
	isLoading = true;
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================================================
	//
	// ====================================================================
	displayedColumns = [
		"nom",
		"tel",
		"mail",
		"rc",
		"ice",
		"idFisc",
		//"adresse",
		"actions",
	];
	// ====================================================================
	//
	// ====================================================================
	constructor(private service1: AoService, private router: Router) {}
	// ====================================================================
	//
	// ====================================================================
	ngOnInit() {
		const _this = this;
		this.service1
			.getAllPrestatairesAll()
			.pipe(delay(300))
			.subscribe(
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
	// ====================================================================
	//
	// ====================================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// ====================================================================
	//
	//=====================================================================
	addPrestataire() {
		this.router.navigate(["/marches/prestataire-new"]);
	}
	// ====================================================================
	//
	// ====================================================================
	editPrestataire(idPrest) {
		this.router.navigate(["/marches/prestataire-edit"], {
			queryParams: { id: idPrest },
		});
	}
	// ====================================================================
	//
	// ====================================================================
	deletePrestataire(id) {
		console.log("delete works!");
	}
	// ====================================================================
	//
	// ====================================================================
	detailsPrestataire(idPrest) {
		this.router.navigate(["/marches/prestataire-show"], {
			queryParams: { id: idPrest },
		});
	}
}
