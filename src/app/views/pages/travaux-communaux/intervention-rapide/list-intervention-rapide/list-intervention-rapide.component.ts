import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { InterventionRapideService } from '../../../utils/intervention-rapide.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { NotificationService } from '../../../shared/notification.service';

@Component({
	selector: 'kt-list-intervention-rapide',
	templateUrl: './list-intervention-rapide.component.html',
	styleUrls: ['./list-intervention-rapide.component.scss']
})
export class ListInterventionRapideComponent implements OnInit {

	id: number;
	url: string;
	// ============================================
	// Presentation de datasource
	// ============================================

	displayedColumns: string[] = [
		"objet",
		"commune",
		//"datePriseEnCharge",
		"dateDebut",
		"dateFin",
		"typeIntervention",
		"statutIntervention",
		"actions"
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	checkLang: string;
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: InterventionRapideService,
		private translate: TranslateService,
		private router: Router,
		private route: ActivatedRoute,
		private notification: NotificationService
	) {
		this.checkLang = window.localStorage.getItem("language");
		this.getIntervention(this.checkLang);
		console.log("lang :: " + this.checkLang)
	}

	ngOnInit() {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
				this.checkLang = 'ar';

			} else if (event.lang == 'fr') {
				this.checkLang = 'fr';
			}
			this.getIntervention(this.checkLang);
		});
	}
	// ============================================
	// Recuperer tous les association
	// ============================================
	public getIntervention(lang) {
		this.service.getAllObject("/interventionRapide/index/", lang)
			.pipe(delay(300))
			.subscribe(
				data => {
					console.log(" INTERVENTION LIST : " + JSON.stringify(data, null, 2))
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
	// Methode de suppression des Intervention
	// ============================================
	deleteIntervention(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
				.deleteObjet("/interventionRapide/delete/", id)
				.subscribe(data => {
					//console.log("getId :" + id);
					this.getIntervention(this.checkLang);
				});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}

	}
	// ============================================
	// Methode d'insertion des Intervention
	// ============================================
	addIntervention(): void {
		this.router.navigate(["/intervention-rapide/add-intervention-rapide"]);
	}
	// ============================================
	// Methode de modification activites
	// ============================================
	editIntervention(row: any) {
		window.localStorage.removeItem("interId");
		window.localStorage.setItem("interId", "" + row.id);
		this.router.navigate(["/intervention-rapide/edit-intervention-rapide"]);
	}

}
