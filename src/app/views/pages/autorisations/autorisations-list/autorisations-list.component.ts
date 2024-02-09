import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Router } from "@angular/router";
import { AutorisationsService } from "../../shared/autorisations.service";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { NotificationService } from "../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "kt-autorisations-list",
	templateUrl: "./autorisations-list.component.html",
	styleUrls: ["./autorisations-list.component.scss"],
})
export class AutorisationsListComponent implements OnInit {
	// ====================================================================
	//
	// ====================================================================
	displayedColumns = [
		"id",
		"typeAut",
		"statut",
		"dateDebut",
		"dateFin",
		"objet",
		"typeObjet",
		//"espace",
		"actions",
	];
	// ====================================================================
	//
	// ====================================================================
	dataSource: MatTableDataSource<Autorisation>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild("matPaginator7", { static: true }) paginator7: MatPaginator;
	@ViewChild("sort7", { static: true }) sort7: MatSort;
	// ====================================================================
	//
	// ====================================================================
	autorisationsDatasource: Autorisation[] = [];
	autorisations = [];
	isLoading = true;
	selectedFiles = [];
	datasize: number = 0;
	// ====================================================================
	//
	// ====================================================================
	constructor(
		private service: AutorisationsService,
		private translate: TranslateService,
		private router: Router,
		private notification: NotificationService,
		private fileService: FilesUtilsService
	) {

	}
	// ====================================================================
	//
	// ====================================================================
	ngOnInit() {
		this.populate();
	}
	// ====================================================================
	//
	// ====================================================================
	populate() {
		const _this = this;
		this.service.getallautorisation().then(
			(data) => {
				console.log('AUTO : ' + JSON.stringify(data,null,2))
				_this.datasize = data.length;
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
	// ====================================================================
	//
	// ====================================================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	// ====================================================================
	//
	// ====================================================================
	createNewAutorisation(i: number): Autorisation {
		return {
			id: this.autorisations[i].id,
			typeAut: this.autorisations[i].typeAutorisation.typeAutorisation,
			statut: this.autorisations[i].statutdemandeautorisation.libelle,
			dateDebut: this.autorisations[i].dateDebut,
			dateFin: this.autorisations[i].dateFin,
			objet: this.autorisations[i].objetdemandeautorisation
				.objetDemandeAutorisation,
			typeObjet: this.autorisations[i].objetdemandeautorisation
				.typeObjetReservation.typeObjetAutorisation,
			espace: this.autorisations[i].espace.espace,
		};
	}
	// ====================================================================
	//
	// ====================================================================
	showAutorisation(rec) {
		this.router.navigate(["/autorisations/autorisation-detail"], {
			queryParams: { reclam: rec },
		});
	}
	// ====================================================================
	//
	// ====================================================================
	deleteAutorisation(recId) {
		this.service.deleteAutorisation(recId).subscribe((res) => {
			this.populate();
		});
	}
	// ====================================================================
	//
	// ====================================================================
	nouvellepp() {
		this.router.navigate(["/autorisations/autorisation-form"]);
	}
	// ====================================================================
	//
	// ====================================================================
	traiterAutorisation(rec) {
		this.router.navigate(["/autorisations/autorisation-traitement"], {
			queryParams: { reclam: rec },
		});
	}
	// ====================================================================
	//
	// ====================================================================
	editAutorisation(id) {
		this.router.navigate(["/autorisations/autorisation-edit"], {
			queryParams: { reclam: id },
		});
	}
}
// ====================================================================
//
// ====================================================================
export interface Autorisation {
	id: string;
	typeAut: String;
	statut: string;
	dateDebut: string;
	dateFin: string;
	objet: string;
	typeObjet: string;
	espace: String;
}
