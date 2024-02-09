import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjetUrbanismeService } from '../../../utils/projet-urbanisme.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { delay } from 'rxjs/operators';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'kt-list-projet-urbanisme',
  templateUrl: './list-projet-urbanisme.component.html',
  styleUrls: ['./list-projet-urbanisme.component.scss']
})
export class ListProjetUrbanismeComponent implements OnInit {

	id:number;
	url:string;
	// ============================================
	// Presentation de datasource
	// ============================================

	displayedColumns: string[] = [
		"numProjet",
		"nomProjet",
		"objet",
		"budgetProjet",
		"dateDemarrageTravaux",
		"dateFinTravaux",
		"actions"
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: ProjetUrbanismeService,
		private translate: TranslateService,
		private router: Router,
		private route: ActivatedRoute,
		private notification: NotificationService
	) {
		this.getProjetUrbanisme();
	}

	ngOnInit() {}
	// ============================================
	// Recuperer tous les association
	// ============================================
	public getProjetUrbanisme() {
		this.service.getAllObject("/projetUrbanisme/index")
		.pipe(delay(300))
		.subscribe(
			data => {
				this.dataSource = new MatTableDataSource(data);
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
			err => {
				this.isLoading = false;
				console.log(err);
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
	// Methode de suppression des ProjetUrbanisme
	// ============================================
	deleteProjetUrbanisme(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
			.deleteObjet("/projetUrbanisme/delete/", id)
			.subscribe(data => {
				//console.log("getId :" + id);
				this.getProjetUrbanisme();
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}

	}
	// ============================================
	// Methode d'insertion des ProjetUrbanisme
	// ============================================
	addProjetUrbanisme(): void {
		this.router.navigate(["/projet-urbanisme/add-projet-urbanisme"]);
	}
	// ============================================
	// Methode de modification activites
	// ============================================
	editProjetUrbanisme(row:any){
		window.localStorage.removeItem("proId");
		window.localStorage.setItem("proId",""+row.id);
		this.router.navigate(["/projet-urbanisme/edit-projet-urbanisme"]);
	}
}
