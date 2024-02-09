import { FilesUtilsService } from './../../../../utils/files-utils.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SubventionsService } from "./../../../../utils/subventions.service";
import { delay } from 'rxjs/operators';

@Component({
	selector: "kt-list-organisme",
	templateUrl: "./list-organisme.component.html",
	styleUrls: ["./list-organisme.component.scss"],
})
export class ListOrganismeComponent implements OnInit {
	id: number;
	isLoading = true;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"nom",
		"mail",
		"gsm",
		"fax",
		"rc",
		"adresse",
		"actions",
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private translate: TranslateService,
		private router: Router,
		private route: ActivatedRoute,
		private service: SubventionsService,
		private serviceFile : FilesUtilsService,
	) {
		this.getDate();
	}

	ngOnInit() {}
	// ============================================
	// Recuperer tous les association
	// ============================================
	public getDate() {
		this.service.getAllObject("/organismeAccueil/index")
		.pipe(delay(300))
		.subscribe(
			(data) => {
				this.dataSource = new MatTableDataSource(data);
				this.isLoading = false;
				this.paginator._intl.itemsPerPageLabel = this.translate.instant(
					"PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
				);
				this.paginator._intl.nextPageLabel = this.translate.instant(
					"PAGES.GENERAL.NEXT_PAGE_LABEL"
				);
				this.paginator._intl.previousPageLabel = this.translate.instant(
					"PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
				);
				this.paginator._intl.lastPageLabel = this.translate.instant(
					"PAGES.GENERAL.LAST_PAGE_LABEL"
				);
				this.paginator._intl.firstPageLabel = this.translate.instant(
					"PAGES.GENERAL.FIRST_PAGE_LABEL"
				);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			(err) => {
				console.log(err);
				this.isLoading = false;
			}
		);
	}

	// ============================================
	// Filter de recherche
	// ============================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	// ============================================
	// Methode de suppression
	// ============================================
	deleteData(id: number): void {
		this.service
			.deleteSubvention("/organismeAccueil/delete/", id)
			.subscribe((data) => {
				console.log("getId :" + id);
				this.getDate();
			});
	}
	// ============================================
	// Methode de modification
	// ============================================
	editData(row: any) {
		window.localStorage.removeItem("ref");
		window.localStorage.setItem("ref", "" + row.id);
		this.router.navigate(["/hebergement/edit-organisme"]);
	}
	// ============================================
	// Methode d'insertion
	// ============================================
	addData(): void {
		this.router.navigate(["/hebergement/add-organisme"]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.serviceFile.exportToExcel("exportData",this.translate.instant("PAGES.HEBERGEMENT.LIST_ORGANISME"));
	}
}
