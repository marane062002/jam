import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { BoServiceService } from "../../../utils/bo-service.service";
import { TranslateService } from '@ngx-translate/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'kt-list-personne-physique',
  templateUrl: './list-personne-physique.component.html',
  styleUrls: ['./list-personne-physique.component.scss']
})
export class ListPersonnePhysiqueComponent implements OnInit {

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
		"nom",
		"prenom",
		"cin",
		"tel",
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
		private service: BoServiceService,
		private router: Router,
		private translate: TranslateService
	) {
		this.getOriginCourriersSortants();
	}
	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {}
	// ============================================
	//
	// ============================================
	private getOriginCourriersSortants() {
		this.service
			.getAllObject("/origineCourierEntrants/type/pp")
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
	addPersonnePhysique(): void {
		this.router.navigate(["personne-physique/add-personne-physique"]);
	}
	// ============================================
	//
	// ============================================
	detailsPersonnePhysique(courrier: any): void {
		window.localStorage.removeItem("personneId");
		window.localStorage.setItem("personneId",courrier.id.toString());
		this.router.navigate(["personne-physique/show-personne-physique"]);
	}
	// ============================================
	//
	// ============================================
	editOriginCourrierSortant(courrier: any): void {
		window.localStorage.removeItem("personneId");
		window.localStorage.setItem("personneId",courrier.id.toString());
		this.router.navigate(["personne-physique/edit-personne-physique"]);
	}
	// ============================================
	//
	// ============================================
	deletePersonnePhysique(c): void {
		this.service
			.deleteObject("/origineCourierEntrants/delete/", c)
			.subscribe((data) => {
				this.getOriginCourriersSortants();
			});
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.service.exportToExcel("exportData",this.translate.instant("PAGES.BUREAU_ORDRE.PERSONNE_PHYSIQUE.TITRE_INDEX"));
	}

}
