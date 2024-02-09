import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { finalize } from "rxjs/operators";
import Swal from "sweetalert2";
import { NotificationService } from "../../shared/notification.service";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { ExcelFrService } from "../../utils/excel-FR.service";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { LogistiqueService } from "../../utils/logistique.service";
import { SpinnerService } from "../../utils/spinner.service";
import { ExcelLogistiqueService } from "../../utils/excel-logistique.service";

@Component({
	selector: "kt-list-logistique",
	templateUrl: "./list-logistique.component.html",
	styleUrls: ["./list-logistique.component.scss"],
})
export class ListLogistiqueComponent implements OnInit {
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
	
	constructor(private excelService: ExcelLogistiqueService, private logistiqueService: LogistiqueService, private translate: TranslateService, private router: Router, private notification: NotificationService, private fileService: FilesUtilsService, private spinnerService: SpinnerService, private datePipe: DatePipe) {
		this.getLogistique();
	}

	ngOnInit() {
		this.columns = ["Numéro de subvention", "Année AL", "Champs d'activité ", " Montant de subvention", "Type de subvention ", "Date", "Nom d'activité"];
	}
	// ============================================
	// Recuperer tous les subvention
	// ============================================
	// ============================================
	// Recuperer tous les subvention
	// ============================================

	public getLogistique() {
		this.isLoading = true;
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.logistiqueService
			.getRessource("/logistique/index")
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
	deleteLogistique(id: number): void {
		Swal.fire({
			title: "هل تريد مسح هذا الدعم ؟",
			icon: "question",
			iconHtml: "؟",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "نعم",
			cancelButtonText: "لا",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.logistiqueService.deleteLogistique("/logistique/delete/", id).subscribe((data) => {
					Swal.fire({
						position: "center",
						icon: "success",
						title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
						showConfirmButton: false,
						timer: 1500,
					});
					this.getLogistique();
				});
				this.logistiqueService.deletefiles("/PjAssociation/ByIdAssociation/", id).subscribe((data) => {
					console.log("File deleted : " + id);
				});
			}
		});
	}

	// ============================================
	// Methode d'insertion des associations
	// ============================================
	addLogistique(): void {
		this.router.navigate(["logistique/add-logistique"]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		//this.service.exportToExcel("exportData", this.translate.instant("PAGES.MARCHE.AO.TITRE_INDEX"));
		this.excelService.exportAsExcelFile("Liste des support logistiques", "", this.columns, this.data, this.footerData, "Liste-support-logistique", this.translate.instant("PAGES.LOGISTIQUE.TITRE_INDEX"));
	}
	createDataJson(i: number): excelData {
		return {
			// id: this.assoc[i].id,
			numSubvention: this.assoc[i].numSubvention,
			anneeSubvention: this.assoc[i].anneeSubvention,
			champActivite: this.assoc[i].champActivite,
			montantDemande: this.assoc[i].montantDemande,
			natureSubvention: this.assoc[i].natureSubvention,
			date: this.datePipe.transform(this.assoc[i].date, "dd-MM-yyyy"),
			nomProjet: this.assoc[i].nomProjet,

			// numSupport: this.assoc[i].numSupport,

			// champOrganisation: this.assoc[i].champOrganisation,
		};
	}
}

export interface excelData {
	numSubvention: string;
	anneeSubvention: string;
	champActivite: String;
	montantDemande: string;
	date: string;
	natureSubvention: string;
	nomProjet: string;
}
