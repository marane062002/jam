import { ImmobilisationService } from "./../../../utils/immobilisation.service";
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';
import { delay } from 'rxjs/operators';
import { FilesUtilsService } from '../../../utils/files-utils.service';

@Component({
	selector: "kt-list-reforme",
	templateUrl: "./list-reforme.component.html",
	styleUrls: ["./list-reforme.component.scss"],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class ListReformeComponent implements OnInit {
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"reference",
		"typeImmobilisation",
		"sousType",
		//"designation",
		// "emplacement",
		"dateReforme",
		"dateReformeFinal",
		// "dureeVie",
		//"motifReforme",
		"actions",
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private immoService: ImmobilisationService,
		private serviceFile : FilesUtilsService,
		private translate: TranslateService,
		private router: Router,
		private route: ActivatedRoute,
		private notification: NotificationService
	) {
		this.getImmobilisation();
	}

	ngOnInit() {}

	// ============================================
	// Recuperer tous les immobilisation
	// ============================================
	private getImmobilisation() {
		this.immoService
			.getAllObject("/immobilisation/index")
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
	// Filter de recherche
	// ============================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	// ============================================
	// Methode de suppression des immobilisations
	// ============================================
	deleteImmobilisation(immo): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
		this.immoService
			.deleteObject("/immobilisation/delete/", immo)
			.subscribe((data) => {
				console.log("getId :" + immo);
				this.getImmobilisation();
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}

	// ============================================
	// Methode reforme immobilisation
	// ============================================
	reformeImmobilisation(immo: any): void {
		window.localStorage.removeItem("immobilisation-showId");
		window.localStorage.setItem(
			"immobilisation-showId",
			immo.id.toString()
		);
		this.router.navigate(["immobilisation/add-to-reforme"]);
	}
	// ============================================
	// Methode de modification des immobilisations
	// ============================================
	editImmobilisation(courrier: any): void {
		window.localStorage.removeItem("immobilisation-showId");
		window.localStorage.setItem("immobilisation-showId",courrier.id.toString());
		this.router.navigate(["reforme/edit-reforme"]);
	}
	// ============================================
	// Methode détails immobilisation
	// ============================================
	detailsImmobilisation(immo: any): void {
		window.localStorage.removeItem("immobilisation-showId");
		window.localStorage.setItem(
			"immobilisation-showId",
			immo.id.toString()
		);
		this.router.navigate(["reforme/show-reforme"]);
	}
	// ============================================
	// Methode d'insertion des immobilisations
	// ============================================
	addImmobilisation(): void {
		this.router.navigate(["reforme/add-reforme"]);
	}
// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.serviceFile.exportToExcel("exportData",this.translate.instant("PAGES.IMMOBILISATION.REFORME.TITRE_INDEX"));
	}
}
