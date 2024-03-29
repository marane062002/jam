import { FilesUtilsService } from './../../../../utils/files-utils.service';
import { SubventionsService } from './../../../../utils/subventions.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'kt-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnInit {

	id: number;
	isLoading = true;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"nom",
		//"prenom",
		"mail",
		//"fax",
		"gsm",
		"adresse",
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
		private service: SubventionsService,
		private serviceFile : FilesUtilsService,
	) {
		this.getDate();
	}

	ngOnInit() {}
	// ============================================
	// Recuperer tous les association
	// ============================================
	public getDate() {
		this.service.getAllObject("/fournisseurImpression/index")
		.pipe(delay(300))
		.subscribe(
			(data) => {
				this.dataSource = new MatTableDataSource(data);
				this.isLoading = false;
				this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
				this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
				this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
				this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
				this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
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
	// Methode de suppression
	// ============================================
	deleteData(id: number): void {
		this.service
			.deleteSubvention("/fournisseurImpression/delete/", id)
			.subscribe((data) => {
				console.log("getId :" + id);
				this.getDate();
			});
	}
	// ============================================
	// Methode de modification
	// ============================================
	editData(row: any) {
		window.localStorage.removeItem("ref");
		window.localStorage.setItem("ref", "" + row.id);
		this.router.navigate(["/impression/edit-fournisseur"]);
	}
	// ============================================
	// Methode d'insertion
	// ============================================
	addData(): void {
		this.router.navigate(["/impression/add-fournisseur"]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.serviceFile.exportToExcel("exportData",this.translate.instant("PAGES.IMPRESSION.LIST_FOURNISSEUR"));
	}
}
