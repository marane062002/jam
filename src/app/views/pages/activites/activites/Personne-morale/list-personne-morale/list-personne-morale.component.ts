import { FilesUtilsService } from './../../../../utils/files-utils.service';
import { ActivitesService } from './../../../../utils/activites.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { delay } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-list-personne-morale',
  templateUrl: './list-personne-morale.component.html',
  styleUrls: ['./list-personne-morale.component.scss']
})
export class ListPersonneMoraleComponent implements OnInit {


// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	origin = [];
	isLoading = true;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"raisonSociale",
		//"contact",
		"teleFixe",
		"teleGsm",
		"eMail",
		"rc",
		"numeroPatente",
		"identifiantFiscal",
		"actions",
	];
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: ActivitesService,
		private router: Router,
		private translate: TranslateService,
		private fileService: FilesUtilsService,
	) {
		this.getAllPersonnesMorale();
	}
	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {}
	// ============================================
	//
	// ============================================
	private getAllPersonnesMorale() {
		this.service
			.getAllObject("/pmActivite/index")
			.pipe(delay(300))
			.subscribe((data) => {
				this.isLoading = false;
				this.dataSource = new MatTableDataSource(data);
				this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
				this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
				this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
				this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
				this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			});
	}
	// ============================================
	//
	// ============================================
	applyFilter(filterValue: string) {
		console.log(filterValue);
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	}
	// ============================================
	//
	// ============================================
	addPersonneMorale(): void {
		this.router.navigate(["activites/add-personne-morale"]);
	}
	// ============================================
	//
	// ============================================
	detailsPersonneMorale(courrier: any): void {
		window.localStorage.removeItem("personneId");
		window.localStorage.setItem("personneId",courrier.id.toString());
		this.router.navigate(["activites/show-personne-morale"]);
	}
	// ============================================
	//
	// ============================================
	editOriginCourrierSortant(id): void {
		window.localStorage.removeItem("personneId");
		window.localStorage.setItem("personneId",id);
		this.router.navigate(["activites/edit-personne-morale"]);
	}
	// ============================================
	//
	// ============================================
	deletePersonneMorale(c): void {
		this.service
			.deleteActivite("/origineCourierEntrants/delete/", c)
			.subscribe((data) => {
				this.getAllPersonnesMorale();
			});
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.fileService.exportToExcel("exportData",this.translate.instant("PAGES.ACTIVITE.PERSONNE_MORALE.TITRE_INDEX"));
	}


}
