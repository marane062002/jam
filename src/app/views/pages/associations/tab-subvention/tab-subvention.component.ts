import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import { delay } from "rxjs/operators";
import { SubventionsService } from "../../utils/subventions.service";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { NotificationService } from '../../shared/notification.service';
import Swal from 'sweetalert2';

@Component({
	selector: "kt-tab-subvention",
	templateUrl: "./tab-subvention.component.html",
	styleUrls: ["./tab-subvention.component.scss"],
})
export class TabSubventionComponent implements OnInit {
	id: number;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"dateSubvention",
		// "typeSubvention",
		// "sousTypeSub",
		"montantSubvention",
		"dateSortSubvention",
		"note",
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
		this.getSubvention();
	}

	ngOnInit() { }
	// ============================================
	// Recuperer tous les association
	// ============================================
	public getSubvention() {
		this.id = this.route.snapshot.params["id"];
		if (this.id != null) {
			this.service
				.getAllSubventionListById("/subventionFinance/index/", this.id)
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
	deleteSubvention(id: number): void {
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
					.deleteSubvention("/subvention/delete/", id)
					.subscribe((data) => {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500
						})
						this.getSubvention();
					});
				this.service
					.deletefiles("/PjSubvention/ByIdSubvention/", id)
					.subscribe((data) => {
						console.log("File deleted : " + id);
					});
			}
		})
	}
	// ============================================
	// Methode d'insertion des subventions
	// ============================================
	addSubvention(): void {
		this.id = this.route.snapshot.params["id"];
		window.localStorage.removeItem("assocId");
		window.localStorage.setItem("assocId", "" + this.id);
		this.router.navigate(["../../subventions/add-subventions"]);
	}
	// ============================================
	// Methode de modification subvention
	// ============================================
	editSubvention(idSub: any) {
		this.id = this.route.snapshot.params["id"];
		window.localStorage.removeItem("assocId");
		window.localStorage.setItem("assocId", "" + this.id);

		window.localStorage.removeItem("subId");
		window.localStorage.setItem("subId", "" + idSub.id);
		this.router.navigate(["subventions/edit-subventions"]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.fileService.exportToExcel(
			"exportDataSub",
			this.translate.instant("PAGES.SUBVENTION.TITRE_INDEX")
		);
	}
}
