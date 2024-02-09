import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { finalize } from "rxjs/operators";
import Swal from "sweetalert2";
import { NotificationService } from "../../shared/notification.service";
import { AcquisitionService } from "../../utils/acquisition.service";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { SpinnerService } from "../../utils/spinner.service";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { ExcelFrService } from "../../utils/excel-FR.service";
import { ExcelAutorisationService } from "../../utils/excel-autorisation.service";

@Component({
	selector: "kt-list-acquisition",
	templateUrl: "./list-acquisition.component.html",
	styleUrls: ["./list-acquisition.component.scss"],
})
export class ListAcquisitionComponent implements OnInit {
	assoc: any;
	data: excelData[] = [];
	columns: any[];
	footerData: any[][] = [];
	dataSize: any;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = ["numSubvention", "anneeSubvention", "champActivite", "montantSubvention", "natureSubvention", "date", "nomProjet", "actions"];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;

	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(private acquisitionService: AcquisitionService, private translate: TranslateService, private router: Router, private notification: NotificationService, private fileService: FilesUtilsService, private spinnerService: SpinnerService, private datePipe: DatePipe, private excelService: ExcelAutorisationService) {
		this.getAcquisition();
	}

	ngOnInit() {
		this.columns = ["N° d'autorisation", "Type activité", " Champs d'activité", "Montant", "Rayonnnement", "Population cible", "Nom d'activité"];
	}
	// ============================================
	// Recuperer tous les subvention
	// ============================================
	// ============================================
	// Recuperer tous les subvention
	// ============================================

	public getAcquisition() {
		this.isLoading = true;
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.acquisitionService
			.getRessource("/acquisition")
			.pipe(
				finalize(() => {
					this.spinnerService.stop(spinnerRef); // stop spinner
				})
			)
			.subscribe(
				(data) => {
					console.log("imaaaaaaaaaaaane");
					console.log(data);
					console.log("imaaaaaaaaaaaane");
					//console.log('Liste Ass : ' + JSON.stringify(data, null, 2))
					this.isLoading = false;
					this.assoc = data;
					for (let i = 0; i < this.assoc.length; i++) {
						this.data.push(this.createDataJson(i));
					}
					this.dataSource = new MatTableDataSource(data);
					this.isLoadingResults = false;
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
					this.isLoadingResults = false;
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
	// Methode de suppression des associations
	// ============================================
	deleteAcquisition(id: number): void {
		Swal.fire({
			title: "هل تريد مسح هذا الترخيص ؟",
			icon: "question",
			iconHtml: "؟",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "نعم",
			cancelButtonText: "لا",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.acquisitionService.deleteAcquisition("/acquisition/delete/", id).subscribe((data) => {
					Swal.fire({
						position: "center",
						icon: "success",
						title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
						showConfirmButton: false,
						timer: 1500,
					});
					this.getAcquisition();
				});
				this.acquisitionService.deletefiles("/PjAssociation/ByIdAcquisition/", id).subscribe((data) => {
					console.log("File deleted : " + id);
				});
			}
		});
	}

	// ============================================
	// Methode d'insertion des associations
	// ============================================
	addLAcquisition(): void {
		this.router.navigate(["acquisition/add-acquisition"]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		//this.service.exportToExcel("exportData", this.translate.instant("PAGES.MARCHE.AO.TITRE_INDEX"));
		this.excelService.exportAsExcelFile("Liste des autorisations", "", this.columns, this.data, this.footerData, "Liste-autorisations", this.translate.instant("PAGES.ACQUISITION.LISTE_AUTORISATIONS"));
	}
	createDataJson(i: number): excelData {
		return {
			// id: this.assoc[i].id,
			numAcquisition: this.assoc[i].numAcquisition,
			natureActivite: this.assoc[i].natureActivite,
			champActivite: this.assoc[i].champActivite,
			montantDemande: this.assoc[i].montantDemande,
			activite_de_rayonnement: this.assoc[i].activite_de_rayonnement,
			cible: this.assoc[i].cible,
			// dateCreation: this.datePipe.transform(this.assoc[i].dateCreation, "dd-MM-yyyy"),
			// datePvChangementBureau: this.datePipe.transform(this.assoc[i].datePvChangementBureau, "dd-MM-yyyy"),
			// dateFinMandat: this.datePipe.transform(this.assoc[i].dateFinMandat, "dd-MM-yyyy"),
			nomProjet: this.assoc[i].nomProjet,
		};
	}
}
export interface excelData {
	// id: string;
	numAcquisition: string;
	natureActivite: String;
	champActivite: string;
	montantDemande: string;
	activite_de_rayonnement: string;
	cible: string;
	nomProjet: string;
	// 	datePvChangementBureau: string;
	// 	dateFinMandat: string;
	// 	email: string;
}
