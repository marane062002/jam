import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { BoServiceService } from "../../../utils/bo-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { delay } from "rxjs/operators";

@Component({
	selector: "kt-tab-courrier-sortants",
	templateUrl: "./tab-courrier-sortants.component.html",
	styleUrls: ["./tab-courrier-sortants.component.scss"],
})
export class TabCourrierSortantsComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	@Input() persoId: number;
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"numero",
		"objet",
		"reference",
		// "dateExpedetion",
		// "nombreCopie",
		// "criticiteCourrier",
		"typeCourrier",
		"destinataire",
		"actions",
	];
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: BoServiceService,
		private router: Router,
		private translate: TranslateService,
		private route: ActivatedRoute
	) {}
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// ngOnInit
	// ============================================
	ngOnInit() {
		//console.log("tab id personne: " + this.persoId);
		this.getCourriersEntrants(this.persoId);
	}
	// ============================================
	// Recuperer les courriers personnel
	// ============================================
	private getCourriersEntrants(id: number) {
		this.service
			.getAllObjectById("/courrierSortants/personnel/", id)
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
	// ============================================
	// Details courriers
	// ============================================
	detailsCourrierSortants(courrier: any): void {
		window.localStorage.removeItem("csId");
		window.localStorage.setItem("csId", courrier.id.toString());
		this.router.navigate(["courriers-sortants/courriers-sortants-show"]);
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
	// Export data as excel
	// ============================================
	exportTable() {
		this.service.exportToExcel(
			"exportData",
			this.translate.instant(
				"PAGES.BUREAU_ORDRE.COURRIER_SORTANT.TITRE_INDEX"
			)
		);
	}
}
