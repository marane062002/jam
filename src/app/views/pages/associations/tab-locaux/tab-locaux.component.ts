import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LaucauxService } from '../../utils/locaux.service';
import { delay } from 'rxjs/operators';
import { FilesUtilsService } from '../../utils/files-utils.service';
import Swal from 'sweetalert2';

@Component({
	selector: "kt-tab-locaux",
	templateUrl: "./tab-locaux.component.html",
	styleUrls: ["./tab-locaux.component.scss"]
})
export class TabLocauxComponent implements OnInit {
	id: number;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"nomLocal",
		// "localisation",
		"dateDemrrageGestion",
		"typeLocal",
		"dateFinGestion",
		//"duree",
		"adresseLocal",
		"statutGestion",
		//"commune",
		"actions"
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
		private associationService: LaucauxService,
		private translate: TranslateService,
		private router: Router,
		private route: ActivatedRoute,
		private fileService: FilesUtilsService,
	) {
		this.getSubvention();
	}

	ngOnInit() { }
	// ============================================
	// Recuperer tous les association
	// ============================================
	public getSubvention() {
		this.id = this.route.snapshot.params["id"];
		this.associationService
			.getAllLocauxListById("/locaux/index/", this.id)
			.pipe(delay(300))
			.subscribe(
				data => {
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
				err => {
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
	deleteLocaux(id: number): void {
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
				this.associationService
					.deleteLocaux("/locaux/delete/", id)
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
				this.associationService
					.deletefiles("/PjLocaux/ByIdAssociation/", id)
					.subscribe((data) => {
						console.log("File deleted : " + id);
					});
			}
		})
	}
	// ============================================
	// Methode d'insertion des locaux
	// ============================================
	addLocal(): void {
		this.id = this.route.snapshot.params['id'];
		window.localStorage.removeItem("assocId");
		window.localStorage.setItem("assocId", "" + this.id);
		this.router.navigate(["../../locaux/add-locaux"]);
	}
	// ============================================
	// Methode de modification local
	// ============================================
	editLocaux(idLocal: any) {
		this.id = this.route.snapshot.params['id'];
		window.localStorage.removeItem("assocId");
		window.localStorage.setItem("assocId", "" + this.id);

		window.localStorage.removeItem("localId");
		window.localStorage.setItem("localId", "" + idLocal.id);
		this.router.navigate(["locaux/edit-locaux"]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.fileService.exportToExcel("exportDataLocaux", this.translate.instant("PAGES.LOCAUX.TITRE_INDEX"));
	}
}
