import { FilesUtilsService } from './../../../utils/files-utils.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ActivitesService } from "../../../utils/activites.service";
import { delay } from "rxjs/operators";
import { NotificationService } from '../../../shared/notification.service';

@Component({
	selector: "kt-list-activites-commune",
	templateUrl: "./list-activites-commune.component.html",
	styleUrls: ["./list-activites-commune.component.scss"],
})
export class ListActivitesCommuneComponent implements OnInit {
	id: number;
	isLoading = true;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"numAutorisation",
		"dateActivite",
		"objet",
		"typeActivites",
		// "commune",
		//"association",
		//"lieu",
		"populationImpactee",
		"enPartenariat",
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
		private service: ActivitesService,
		private notification: NotificationService,
		private fileService: FilesUtilsService,
	) {
		this.getActivities();
	}

	ngOnInit() {}
	// ============================================
	// Recuperer tous les association
	// ============================================
	public getActivities() {
		this.service
			.getAllObject("/activite/communale/index")
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
	// Methode de suppression des associations
	// ============================================
	deleteActivities(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
				.deleteActivite("/activite/delete/", id)
				.subscribe((data) => {
					console.log("getId :" + id);
					this.getActivities();
				});
			this.service
				.deletefiles("/PjActivite/ByIdActivite/", id)
				.subscribe((data) => {
					console.log("File deleted : " + id);
				});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}
	// ============================================
	// Methode de modification activites
	// ============================================
	editActivities(idActiv: any) {
		window.localStorage.removeItem("activiteId");
		window.localStorage.setItem("activiteId", "" + idActiv.id);
		this.router.navigate(["activites/edit-activites-commune"]);
	}
	// ============================================
	// Methode d'insertion des associations
	// ============================================
	addActiviteCommune(): void {
		this.router.navigate(["activites/add-activites-commune"]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.fileService.exportToExcel(
			"exportData",
			this.translate.instant("MENU.ACTIVITE_COMMUNALE")
		);
	}
}
