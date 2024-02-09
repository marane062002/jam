import { Component, OnInit, ViewChild } from "@angular/core";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router } from "@angular/router";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';
import { FilesUtilsService } from '../../utils/files-utils.service';

@Component({
	selector: "kt-mondat-list",
	templateUrl: "./mondat-list.component.html",
	styleUrls: ["./mondat-list.component.scss"],
})
export class MondatListComponent implements OnInit {
	// ====================================================
	//
	//=====================================================
	isLoading = true;
	showAdd = false;
	displayedColumns = [
		//"id",
		"dateDebutMondat",
		"dateFinMondat",
		"statut",
		"actions",
	];
	// ====================================================
	//
	//=====================================================
	dataSource = new MatTableDataSource<any>();
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================================
	//
	//=====================================================
	constructor(
		private service: AffairesConseilService,
		private translate: TranslateService,
		private notification: NotificationService,
		private fileService: FilesUtilsService,
		private router: Router
	) {}
	// ====================================================
	//
	//=====================================================
	ngOnInit() {
		this.service.getMondatActuel().subscribe((data) => {
			console.log(data);
			if (data.length == 0) {
				console.log("true");
				this.showAdd = true;
			}
		});
		this.getMondats();
	}
	// ====================================================
	//
	//=====================================================
	async getMondats() {
		await this.service.getAllMondat()
		.subscribe((data) => {
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
		});
	}

	// ====================================================
	//
	//=====================================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	// ====================================================
	//
	//=====================================================
	showmondat(row) {
		this.router.navigate(["/affaires-conseil/mondat-detail"], {
			queryParams: { id: row },
		});
	}
	// ====================================================
	//
	//=====================================================
	editMondat(row) {
		this.router.navigate(["/affaires-conseil/mondat-edit"], {
			queryParams: { id: row },
		});
	}
	// ====================================================
	//
	//=====================================================
	nouveauMondat() {
		this.router.navigate(["/affaires-conseil/mondat-form"]);
	}
	// ====================================================
	//
	//=====================================================
	exportTable(){
		this.fileService.exportToExcel(
			"exportData",
			'المُدَد الإنتدابية'
		);
	}
}
