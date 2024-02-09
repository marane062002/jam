import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";
import { forkJoin } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../shared/notification.service";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { delay } from "rxjs/operators";

@Component({
	selector: "kt-ordre-jour-commission",
	templateUrl: "./ordre-jour-commission.component.html",
	styleUrls: ["./ordre-jour-commission.component.scss"],
})
export class OrdreJourCommissionComponent implements OnInit {
	// ====================================================
	//
	//=====================================================
	displayedColumns = ["objet", "type", "statut", "recommandation", "actions"];
	// ====================================================
	//
	//=====================================================
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================================
	//
	//=====================================================
	Commissions;
	Sessions;
	idCommission = -1;
	idSession = -1;
	isLoading = false;
	loading = false;
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
	) {}
	// ====================================================
	//
	//=====================================================
	ngOnInit() {
		forkJoin(
			this.service.getAllCommission(),
			this.service.getAllSession()
		).subscribe((resfork) => {
			this.populate(resfork);
		});
	}
	// ====================================================
	//
	//=====================================================
	populate(res) {
		this.Commissions = res[0];
		this.Sessions = res[1];
	}
	// ====================================================
	//
	//=====================================================
	onChangeofOptions() {
		if (this.idCommission != -1 && this.idSession != -1) {
			this.isLoading = true;
			this.getPoints();
		}
	}
	// ====================================================
	//
	//=====================================================
	async getPoints() {
		const _this = this;
		this.service
			.getListPointByCommissionEtSession(
				this.idCommission,
				this.idSession
			)
			.pipe(delay(300))
			.subscribe(
				(res) => {
					this.isLoading = false;
					//this.loading = true;
					_this.dataSize = res.length;
					console.log("data size:: " + JSON.stringify(res, null, 2));
					this.dataSource = new MatTableDataSource(res);
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
	showPoint(id) {
		this.router.navigate(["/affaires-conseil/point-detail"], {
			queryParams: { id: id },
		});
	}
	// ====================================================
	//
	//=====================================================
	valider() {
		this.service.sendPoints(this.dataSource.data).subscribe((res) => {
			this.loading = true;
			this.router.navigate(["/affaires-conseil/ordre-jour-session-list"]);
		});
	}
	// ====================================================
	//
	//=====================================================
	exportTable() {
		this.fileService.exportToExcel("exportData", "جدول أعمال اللجان");
	}
}
