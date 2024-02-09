import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SubventionsService } from "../../utils/subventions.service";
import { delay } from "rxjs/operators";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { NotificationService } from '../../shared/notification.service';
import Swal from 'sweetalert2';

@Component({
	selector: "kt-tab-hebergement",
	templateUrl: "./tab-hebergement.component.html",
	styleUrls: ["./tab-hebergement.component.scss"],
})
export class TabHebergementComponent implements OnInit {
	id: number;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"organismeAccueil",
		"nombrePersonne",
		"nombreNuitee",
		"nombreChambre",
		"totalHt",
		"totalTTC",
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
		private service: SubventionsService,
		private translate: TranslateService,
		private router: Router,
		private route: ActivatedRoute,
		private fileService: FilesUtilsService,
		private notification: NotificationService,
	) {
		this.getRestauration();
	}

	ngOnInit() { }
	// ============================================
	// Recuperer tous les association
	// ============================================
	public getRestauration() {
		this.id = this.route.snapshot.params["id"];
		this.service
			.getAllSubventionListById("/hebergement/index/", this.id)
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
	deleteHebergement(id: number): void {
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
					.deleteSubvention("/hebergement/delete/", id)
					.subscribe((data) => {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500
						})
						this.getRestauration();
					});
				this.service
					.deletefiles("/PjHebergement/ByIdHebergement/", id)
					.subscribe((data) => {
						console.log("File deleted : " + id);
					});
			}
		})
	}
	// ============================================
	// Methode d'insertion des associations
	// ============================================
	addHebergement(): void {
		this.id = this.route.snapshot.params["id"];
		window.localStorage.removeItem("assocId");
		window.localStorage.setItem("assocId", "" + this.id);
		this.router.navigate(["../../hebergement/add-hebergement"]);
	}
	// ============================================
	// Methode de modification activites
	// ============================================
	editHebergement(id) {
		this.id = this.route.snapshot.params["id"];
		window.localStorage.removeItem("assocId");
		window.localStorage.setItem("assocId", "" + this.id);

		window.localStorage.removeItem("hebergId");
		window.localStorage.setItem("hebergId", "" + id);
		this.router.navigate(["hebergement/edit-hebergement/" + id]);
	}

	detailsHebergement(id: number) {
		let idHeb = this.route.snapshot.params["id"];
		window.localStorage.removeItem("hebergId");
		window.localStorage.setItem("hebergId", "" + idHeb);
		this.router.navigate(["/hebergement/show-hebergement/" + id]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.fileService.exportToExcel(
			"exportDataHeberg",
			this.translate.instant("PAGES.HEBERGEMENT.TITRE_INDEX")
		);
	}
}
