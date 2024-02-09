import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BoServiceService } from '../../../utils/bo-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';
import { FormBuilder } from '@angular/forms';
import { delay } from 'rxjs/operators';

@Component({
	selector: "kt-tab-courrier-refuse",
	templateUrl: "./tab-courrier-refuse.component.html",
	styleUrls: ["./tab-courrier-refuse.component.scss"],
})
export class TabCourrierRefuseComponent implements OnInit {
	// ============================================
	// Declaration
	// ============================================
	@Input() persoId: number;
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	courrier = [];
	// ============================================
	// Datasource
	// ============================================
	displayedColumns: string[] = [
		// "numero",
		"objet",
		"dateRefuse",
		// "nombreCopie",
		// "criticiteCourrier",
		"typeCourrier",
		"destinataire",
		"actions",
	];
	// ============================================
	// Pagination option & export data
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: BoServiceService,
		private router: Router,
		private translate: TranslateService,
		private notification: NotificationService,
		private fb: FormBuilder
	) {}
	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
		this.getCourriersSortants(this.persoId);
	}
	// ============================================
	// Recuperer tous les courriers sortants
	// ============================================
	private getCourriersSortants(id:number) {
		this.service
			.getAllObjectById("/courrierSortants/refuser/personnel/",id)
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
	// Methode details 2
	// ============================================
	detailsCourrierSortant(courrier: any): void {
		window.localStorage.removeItem("csId");
		window.localStorage.setItem("csId", courrier.id.toString());
		this.router.navigate(["courriers-refuses/show-courriers-refuses"]);
	}
	// ============================================
	// filter datasource
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
				"PAGES.BUREAU_ORDRE.COURRIER_REFUSE.TITRE_INDEX"
			)
		);
	}
}
