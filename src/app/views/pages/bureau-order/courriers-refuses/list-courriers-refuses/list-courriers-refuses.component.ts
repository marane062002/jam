import { Component, OnInit, ViewChild } from "@angular/core";
import { first, delay } from "rxjs/operators";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";
import { BoServiceService } from "../../../utils/bo-service.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../../shared/notification.service";

// Ar lang
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar-MA';
registerLocaleData(localeAr, 'ar');

@Component({
	selector: "kt-list-courriers-refuses",
	templateUrl: "./list-courriers-refuses.component.html",
	styleUrls: ["./list-courriers-refuses.component.scss"],
})
export class ListCourriersRefusesComponent implements OnInit {
	// ============================================
	// Datasource
	// ============================================
	displayedColumns: string[] = [
		// "numero",
		"objet",
		"dateRefuse",
		"nombreCopie",
		"criticiteCourrier",
		"typeCourrier",
		"destinataire",
		"motif",
		"actions",
	];
	// ============================================
	// Declaration
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	courrier = [];
	// ============================================
	// Pagination option & export data
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: BoServiceService,
		private router: Router,
		private translate: TranslateService,
		private notification: NotificationService,
		private fb: FormBuilder
	) {
		this.getCourriersSortants();
	}
	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {}
	// ============================================
	// Recuperer tous les courriers sortants
	// ============================================
	private getCourriersSortants() {
		this.service
			.getAllObject("/courrierSortants/refuser")
			.pipe(delay(300))
			.subscribe(
				(data) => {
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(data);
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
					this.isLoading = false;
					console.log(err);
				}
			);
	}
	// ============================================
	// Methode de suppression des courrier sortants
	// ============================================
	deleteCourrierSortant(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
			.deleteObject("/courrierSortants/delete/", id)
			.subscribe((data) => {
				this.getCourriersSortants();
			});
			this.service
			.deletefiles("/PjCourriersSortants/ByIdCourriersSortants/", id)
			.subscribe(data => {
				console.log("File courrier deleted : " + id);
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}
	// ============================================
	// Methode de modification des courriers sortants
	// ============================================
	editCourrierSortant(courrier: any): void {
		window.localStorage.removeItem("csId");
		window.localStorage.setItem("csId", courrier.id.toString());
		this.router.navigate(["courriers-sortants/edit-courriers-sortants"]);
	}
	// ============================================
	// Methode details 2
	// ============================================
	detailsCourrierSortant(courrier: any): void {
		window.localStorage.removeItem("csId");
		window.localStorage.setItem("csId", courrier.id.toString());
		this.router.navigate(["courriers-refuses/show-courriers-refuses"]);
	}
	// ============================================
	// filter datasource
	// ============================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.service.exportToExcel(
			"exportData",
			this.translate.instant(
				"PAGES.BUREAU_ORDRE.COURRIER_SORTANT.TITRE_INDEX"
			)
		);
	}
}
