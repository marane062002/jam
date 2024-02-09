import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router } from "@angular/router";
import { delay } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../shared/notification.service";
import { FilesUtilsService } from "../../utils/files-utils.service";

@Component({
	selector: "kt-decisions-point-list",
	templateUrl: "./decisions-point-list.component.html",
	styleUrls: ["./decisions-point-list.component.scss"],
})
export class DecisionsPointListComponent implements OnInit {
	// ====================================================
	//
	//=====================================================
	displayedColumns = ["numDecision", "decision", "point", "actions"];
	// ====================================================
	//
	//=====================================================
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================================
	//
	//=====================================================
	dataSize = 0;
	isLoading = false;
	showAdd = false;
	Sessions;
	idSession;
	// ====================================================
	//
	//=====================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router,
		private translate: TranslateService,
		private notification: NotificationService,
		private fileService: FilesUtilsService
	) {}
	// ====================================================
	//
	//=====================================================
	ngOnInit() {
		this.service.getAllSession().subscribe((data) => {
			this.Sessions = data;
		});
	}
	// ====================================================
	//
	//=====================================================
	onChangeofOptions(idSession) {
		this.isLoading = true;
		const _this = this;
		this.service
			.getdecisionBySession(idSession)
			.pipe(delay(300))
			.subscribe(
				(data) => {
					_this.dataSize = data.length;
					console.log("data size:: " + _this.dataSource);
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
					this.isLoading = false;
					console.log(err);
				}
			);
	}
	// ====================================================
	//
	//=====================================================
	showdecision(idD) {
		this.router.navigate(["/affaires-conseil/decision-point-show"], {
			queryParams: { id: idD },
		});
	}
	// ====================================================
	//
	//=====================================================
	editdecision(idD) {
		this.router.navigate(
			["/affaires-conseil/decision-point-add-resultat"],
			{ queryParams: { id: idD } }
		);
	}
	// ====================================================
	//
	//=====================================================
	nouveauMondat() {}
	// ====================================================
	//
	//=====================================================
	exportTable() {
		this.fileService.exportToExcel("exportData", "المُدَد الإنتدابية");
	}
}
