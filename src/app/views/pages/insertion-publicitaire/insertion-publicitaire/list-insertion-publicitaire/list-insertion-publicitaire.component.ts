import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { InsertPubService } from "../../../utils/insert-pub.service";
import { delay } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from '../../../shared/notification.service';
import { FilesUtilsService } from '../../../utils/files-utils.service';
@Component({
	selector: "kt-list-insertion-publicitaire",
	templateUrl: "./list-insertion-publicitaire.component.html",
	styleUrls: ["./list-insertion-publicitaire.component.scss"],
})
export class ListInsertionPublicitaireComponent implements OnInit {

	displayedColumns: string[] = [
		"numEdition",
		"dateEdition",
		"datePublication",
		"nomSupport",
		"media",
		"numeroFacture",
		"montantHT",
		"montantTtc",
		"statutFacturel",
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
		private service: InsertPubService,
		private service1: FilesUtilsService,
		private router: Router,
		private notification: NotificationService,
		private translate: TranslateService,
	) {
		this.getPublicite();
	}

	ngOnInit() {}

	// ============================================
	// Recuperer tous les insertions publicitaires
	// ============================================
	private getPublicite() {
		this.service
			.getAllObject("/insertionPublicitaires/index")
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
	// Methode de suppression publiciataire
	// ============================================
	deletePublicite(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
			.deleteObject("/insertionPublicitaires/delete/", id)
			.subscribe((data) => {
				console.log("getId :" + id);
				this.getPublicite();
			});
			this.service
			.deletefiles("/PjCourriersEntrants/ByIdCourriersEntrants/", id)
			.subscribe(data => {
				console.log("File courrier deleted : " + id);
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}

	// ============================================
	// Methode de modification publicitaires
	// ============================================
	editPublicite(courrier: any): void {
		window.localStorage.removeItem("pubId");
		window.localStorage.setItem("pubId", courrier.id.toString());
		this.router.navigate([
			"insertion-publicitaire/edit-insertion-publicitaire",
		]);
	}

	// ============================================
	// Methode d'insertion publicitaire
	// ============================================
	addPublicite(): void {
		this.router.navigate([
			"insertion-publicitaire/add-insertion-publicitaire",
		]);
	}
	// ============================================
	// Methode details
	// ============================================
	details(idPub) {
		console.log("id pub :" + idPub);
		this.router.navigate(["insertion-publicitaire-show"]);
	}

	// ============================================
	// Methode details publicitaire
	// ============================================
	detailsPublicite(publicite: any): void {
		window.localStorage.removeItem("pub-showId");
		window.localStorage.setItem("pub-showId", publicite.id.toString());
		this.router.navigate([
			"insertion-publicitaire/insertion-publicitaire-show",
		]);
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
	/// ============================================
	// Methode de creation pub
	// ============================================
	addNewPublicite() {
		this.router.navigate([
			"insertion-publicitaire/add-insertion-publicitaire",
		]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.service1.exportToExcel("exportData",this.translate.instant("PAGES.INSERT_PUB.TITRE_INDEX"));
	}
}
