import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { finalize } from "rxjs/operators";
import Swal from "sweetalert2";
import { NotificationService } from "../../../shared/notification.service";
import { ConventionService } from "../../../utils/convention.service";
import { ExcelAssociationService } from "../../../utils/excel-association.service";
import { ExcelFrService } from "../../../utils/excel-FR.service";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import { SpinnerService } from "../../../utils/spinner.service";
import { SubventionsService } from "../../../utils/subventions.service";
import { ExcelSubService } from "../../../utils/excel-sub.service";

@Component({
	selector: "kt-list-subventions",
	templateUrl: "./list-subventions.component.html",
	styleUrls: ["./list-subventions.component.scss"],
})
export class ListSubventionsComponent implements OnInit {
	assoc: any;
	data: excelData[] = [];
	columns: any[];
	footerData: any[][] = [];
	subData: any;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = ["numSubvention", "anneeSubvention", "champActivite", "montantSubvention", "dateSortSubvention", "dateDepotDemande", "nomProjet", "actions"];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;
	dataSize: any;
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(private subventionsService: SubventionsService, private translate: TranslateService, private router: Router, private notification: NotificationService, private fileService: FilesUtilsService, private spinnerService: SpinnerService, private datePipe: DatePipe, private excelService: ExcelSubService) {
		this.getSubvention();
	}

	ngOnInit() {
		this.columns = ["Numéro de subvention", "Année de subvention", "Durée", "Date de réalisation du projet", "Nom de projet", "Population cible", "Champs d'activité", "Montant de subvention (Dhs)", "Montant de subvention de l'association(Dhs)", "Localisation"];

		this.subventionsService.getAllSubData("/subvention/index").then(
			(data) => {
				this.subData = data;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	//=====================================================

	// ============================================
	// Recuperer tous les subvention
	// ============================================
	// ============================================
	// Recuperer tous les subvention
	// ============================================

	public getSubvention() {
		this.isLoading = true;
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.subventionsService
			.getRessource("/subvention/index")
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
	deleteSubvention(id: number): void {
		Swal.fire({
			title: this.translate.instant("PAGES.GENERAL.MSG_DELETED"),
			icon: "question",
			iconHtml: "؟",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.subventionsService.deleteSubvention("/subvention/delete/", id).subscribe((data) => {
					Swal.fire({
						position: "center",
						icon: "success",
						title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
						showConfirmButton: false,
						timer: 1500,
					});
					this.getSubvention();
				});
				this.subventionsService.deletefiles("/PjAssociation/ByIdAssociation/", id).subscribe((data) => {
					console.log("File deleted : " + id);
				});
			}
		});
	}

	// ============================================
	// Methode d'insertion des associations
	// ============================================
	addAssociation(): void {
		this.router.navigate(["subventions/add-subventions"]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		//this.service.exportToExcel("exportData", this.translate.instant("PAGES.MARCHE.AO.TITRE_INDEX"));
		this.excelService.exportAsExcelFile("Liste des subventions", "", this.columns, this.data, this.footerData, "Liste-des-subventions", this.translate.instant("PAGES.SUBVENTION.TITRE_INDEX"));
	}
	createDataJson(i: number): excelData {
		return {
			numSubvention: this.assoc[i].numSubvention,
			anneeSubvention: this.assoc[i].anneeSubvention,
			durre: this.assoc[i].durre,
			dateDepotDemande: this.datePipe.transform(this.assoc[i].dateDepotDemande, "dd-MM-yyyy"),
			nomProjet: this.assoc[i].nomProjet,
			cible: this.assoc[i].cible,
			champActivite: this.assoc[i].champActivite,
			montantDemande: this.assoc[i].montantDemande,
			montantSubvention: this.assoc[i].montantSubvention,
			local: this.assoc[i].local,

			// dateCreation: this.datePipe.transform(this.assoc[i].dateCreation, "dd-MM-yyyy"),
			// datePvChangementBureau: this.datePipe.transform(this.assoc[i].datePvChangementBureau, "dd-MM-yyyy"),
			// dateFinMandat: this.datePipe.transform(this.assoc[i].dateFinMandat, "dd-MM-yyyy"),
			// email: this.assoc[i].email,
		};
	}
}
export interface excelData {
	numSubvention: string;
	anneeSubvention: String;
	durre: String;
	dateDepotDemande: String;
	nomProjet: string;
	cible: String;
	champActivite: string;
	montantDemande: string;
	montantSubvention: String;
	local: string;

	// dateCreation: string;
	// datePvChangementBureau: string;
	// dateFinMandat: string;
	// email: string;
}
