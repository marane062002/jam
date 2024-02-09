import { Component, OnInit, ViewChild } from '@angular/core';
import { AssociationService } from '../../utils/association.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { delay, finalize } from 'rxjs/operators';
import { Location } from "@angular/common";
import { NotificationService } from '../../shared/notification.service';
import { FilesUtilsService } from '../../utils/files-utils.service';
import { SpinnerService } from '../../utils/spinner.service';

@Component({
  selector: 'kt-show-mandat',
  templateUrl: './show-mandat.component.html',
  styleUrls: ['./show-mandat.component.scss']
})
export class ShowMandatComponent implements OnInit {

	// ============================================
	// Datasource mandat
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"nom",
		"prenom",
		"cin",
		"fonction",
		"adresse",
		"actions",
	];
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// =====================================
	// Declarations
	// =====================================
	id: number;
	details;
	isLoadingResults = true;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: AssociationService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		private notification: NotificationService,
		private translate: TranslateService,
		private fileService: FilesUtilsService,
		private spinnerService: SpinnerService,
	) {
		// Charger la liste des mandats
		this.getMembresMandats();
	}
	// =====================================
	// Afficher les details mandatBureau
	// =====================================

	ngOnInit() {
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.id = this.route.snapshot.params["id"];
		this.service
			.getObjectById("/mandatBureau/show/", this.id)
			.pipe(finalize(() => {
				this.spinnerService.stop(spinnerRef);// stop spinner
			}))
			.subscribe(
				(data) => {
					this.details = data;
				},

				(error) => {
					console.log(error);
				}
			);


	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
		//this.router.navigate(["/associations/list-association"]);
	}
	// ============================================
	//
	// ============================================
	private getMembresMandats() {
		this.id = this.route.snapshot.params["id"];
		this.service
			.getObjectById("/membreBureau/mandat/",this.id)
			.pipe(delay(300))
			.subscribe((data) => {
				this.dataSource = new MatTableDataSource(data);
				this.isLoading = false;
				/*
				this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
				this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
				this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
				this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
				this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
				*/
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			});
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
	// Ajout membre
	// ============================================
	addMembre(){
		this.id = this.route.snapshot.params["id"];
		this.router.navigate(["associations/add-membre/"+ this.id]);
	}
	// ============================================
	// Methode de modification des mandats
	// ============================================
	editMandat(): void {
		this.id = this.route.snapshot.params["id"];
		this.router.navigate(["associations/edit-mandat/"+ this.id]);
	}
	// ============================================
	// Methode de suppression des membres
	// ============================================
	deleteMembre(id): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
		this.service
			.deleteObject("/membreBureau/delete/", id)
			.subscribe((data) => {
				console.log("getId :" + id);
				this.getMembresMandats();
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.fileService.exportToExcel("exportData",this.translate.instant("PAGES.MEMBRE_BUREAU.TITRE_INDEX 	"));
	}
}
