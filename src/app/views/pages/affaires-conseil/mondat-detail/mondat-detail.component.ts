import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { forkJoin } from "rxjs";
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';
import { delay } from 'rxjs/operators';
import { FilesUtilsService } from '../../utils/files-utils.service';

@Component({
	selector: "kt-mondat-detail",
	templateUrl: "./mondat-detail.component.html",
	styleUrls: ["./mondat-detail.component.scss"],
})
export class MondatDetailComponent implements OnInit {
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns = [
		"nom",
		"prenom",
		"cin",
		"tele",
		//"mail",
		"role",
		"statut",
		"niveauScolaire",
		"actions",
	];
	// ============================================
	// Declarations
	// ============================================
	formatJson = {};
	dataLenght = 0;
	isLoading = true;
	idMondat;
	mondat = { statut: "", dateFinMondat: null, dateDebutMondat: null, id: 0 };
	// ============================================
	// Controles pagination
	// ============================================
	dataSource = new MatTableDataSource<any>();
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service1: AffairesConseilService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private translate: TranslateService,
		private notification: NotificationService,
		private fileService: FilesUtilsService,
	) {}
	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idMondat = params["id"];
		});
		const _this = this;
		forkJoin(
			this.service1.getMondatById(this.idMondat),
			this.service1.getAllMembreConseilByIdMondat(this.idMondat)
		).pipe(delay(300))
		.subscribe((data) => {
			_this.dataLenght = data[1].length;
			//console.log('Data size: '+ _this.dataLenght)
			this.mondat = data[0];
			this.formatJson = data[1];
			//console.log('Data [0]: '+ JSON.stringify(data[0],null,2))
			console.log('Data [1]: '+ JSON.stringify(this.formatJson,null,2))
			this.dataSource = new MatTableDataSource(data[1]);
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
		});
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
	// ============================================
	// Nouveau elu
	// ============================================
	nouveauElu() {
		this.router.navigate(["affaires-conseil/membre-bureau-form"], {
			queryParams: { id: this.idMondat },
		});
	}
	// ============================================
	// Edit elu
	// ============================================
	editElu(idElu) {
		this.router.navigate(["affaires-conseil/membre-bureau-edit"], {
			queryParams: { id: idElu },
		});
	}
	// ============================================
	// Show elu
	// ============================================
	showElu(idElu) {
		this.router.navigate(["affaires-conseil/membre-bureau-show"], {
			queryParams: { id: idElu },
		});
	}
	// ============================================
	// Delete elu
	// ============================================
	deleteElu(idElu) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}
	// =====================================================
	// get niveau scolaire
	// =====================================================
	getNiveauScolaire(id: number) {
		if (id != null) {
			switch (id) {
				case 1:
					return "ابتدائي";
				case 2:
					return "ثانوي";
				case 3:
					return "عالي";
				default:
					return "";
			}
		} else return "";
	}
	// =====================================================
	// get statut elus
	// =====================================================
	getStatutElus(id: number) {
		if (id != null) {
			switch (id) {
				case 0:
					return "غير مزاول لمهامه";
				case 1:
					return "مزاول لمهامه";
				default:
					return "";
			}
		} else return "";
	}
	back(){
		this.router.navigate(["affaires-conseil/mondat-list"]);
	}
	// ====================================================
	//
	//=====================================================
	exportTable(){
		this.fileService.exportToExcel(
			"exportData",
			'أعضاء االمدة الإنتدابية'
		);
	}
}
