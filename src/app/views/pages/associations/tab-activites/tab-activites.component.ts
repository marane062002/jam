import { ActivitesService } from "./../../utils/activites.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import { delay } from "rxjs/operators";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { NotificationService } from '../../shared/notification.service';
import Swal from 'sweetalert2';
@Component({
	selector: "kt-tab-activites",
	templateUrl: "./tab-activites.component.html",
	styleUrls: ["./tab-activites.component.scss"],
})
export class TabActivitesComponent implements OnInit {
	id: number;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"numAutorisation",
		"dateActivite",
		"objet",
		"typeActivites",
		// "commune",
		// "lieu",
		"populationImpactee",
		// "note",
		"actions",
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: ActivitesService,
		private translate: TranslateService,
		private router: Router,
		private route: ActivatedRoute,
		private fileService: FilesUtilsService,
		private notification: NotificationService,
	) {
		this.getActivities();
	}

	ngOnInit() { }
	// ============================================
	// Recuperer tous les association
	// ============================================
	public getActivities() {
		this.id = this.route.snapshot.params["id"];
		this.service
			.getAllActivitiesListById("/activite/count/", this.id)
			.pipe(delay(300))
			.subscribe(
				(data) => {
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(data);
					this.isLoadingResults = false;
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
					this.isLoadingResults = false;
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
		Swal.fire({
			title: 'هل تريد مسح هذه المعطيات ؟',
			icon: 'question',
			iconHtml: '؟',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: 'نعم',
			cancelButtonText: 'لا',
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service
					.deleteActivite("/activite/delete/", id)
					.subscribe((data) => {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500
						})
						this.getActivities();
					});
				this.service
					.deletefiles("/PjActivite/ByIdActivite/", id)
					.subscribe((data) => {
						console.log("File deleted : " + id);
					});
			}
		})
	}
	// ============================================
	// Methode de modification activites
	// ============================================
	editActivities(idActiv: any) {
		this.id = this.route.snapshot.params["id"];
		window.localStorage.removeItem("assocId");
		window.localStorage.setItem("assocId", "" + this.id);

		window.localStorage.removeItem("activiteId");
		window.localStorage.setItem("activiteId", "" + idActiv.id);
		this.router.navigate(["activites/edit-activites"]);
	}
	// ============================================
	// Methode d'insertion des associations
	// ============================================
	addLocal(): void {
		this.id = this.route.snapshot.params["id"];
		window.localStorage.removeItem("assocId");
		window.localStorage.setItem("assocId", "" + this.id);
		//this.router.navigate(["../../activites/activites/add-activites"]);
		this.router.navigate(["activites/add-activites"]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.fileService.exportToExcel(
			"exportDataActiv",
			this.translate.instant("PAGES.ACTIVITE.TITRE_INDEX")
		);
	}
}
