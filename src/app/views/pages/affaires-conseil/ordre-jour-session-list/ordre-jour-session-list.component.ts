import { Component, OnInit, ViewChild } from "@angular/core";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { async } from "@angular/core/testing";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../shared/notification.service";
import { delay } from "rxjs/operators";
import { FilesUtilsService } from "../../utils/files-utils.service";

@Component({
	selector: "kt-ordre-jour-session-list",
	templateUrl: "./ordre-jour-session-list.component.html",
	styleUrls: ["./ordre-jour-session-list.component.scss"],
})
export class OrdreJourSessionListComponent implements OnInit {
	// ====================================================
	//
	//=====================================================
	displayedColumns = ["nomOrdreJour", "session", "statut", "actions"];
	// ====================================================
	//
	//=====================================================
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================================
	//
	//=====================================================
	isLoading = true;
	dataSize = 0;
	// ====================================================
	//
	//=====================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router,
		private translate: TranslateService,
		private notification: NotificationService,
		private fileService: FilesUtilsService
	) {
		this.getOrdreJourSession();
	}
	// ====================================================
	//
	//=====================================================
	ngOnInit() {}
	// ====================================================
	//
	//=====================================================
	async getOrdreJourSession() {
		const _this = this;
		await this.service
			.getAllOrdreJourSession()
			.pipe(delay(300))
			.subscribe(
				(data) => {
					_this.dataSize = data.length;
					console.log("data size:: " + _this.dataSource);
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
	// Filter datasource
	// ============================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	// ====================================================
	//
	//=====================================================
	nouveauOrdreJour() {
		this.router.navigate(["/affaires-conseil/ordre-jour-session-form"]);
	}
	// ====================================================
	//
	//=====================================================
	showordreJour(idOrdre) {
		this.router.navigate(["/affaires-conseil/ordre-jour-session-show"], {
			queryParams: { id: idOrdre },
		});
	}
	// ====================================================
	//
	//=====================================================
	editordreJour(idOrder) {}
	// ====================================================
	//
	//=====================================================
	exportTable() {
		this.fileService.exportToExcel("exportData", "جدول أعمال المكتب");
	}
}
