import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { finalize } from "rxjs/operators";
import Swal from "sweetalert2";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { ExcelFestivaleService } from "../../utils/excel-festivale.service";
import { ExcelFrService } from "../../utils/excel-FR.service";
import { FestivaleService } from "../../utils/festivale.service";
import { SpinnerService } from "../../utils/spinner.service";

@Component({
	selector: "kt-list-festivales",
	templateUrl: "./list-festivales.component.html",
	styleUrls: ["./list-festivales.component.scss"],
})
export class ListFestivalesComponent implements OnInit {
	assoc: any;
	data: excelData[] = [];
	columns: any[];
	footerData: any[][] = [];
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = ["budgetEvenement", "champOrganisation", "dateOrganisation", "localOrganisation", "nomFestival", "numLocalAssociation", "annexeAdministratif", "subventionCommunMar", "actions"];
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

	constructor(private excelService: ExcelFestivaleService, private router: Router, private festivalesService: FestivaleService, private datePipe: DatePipe, private translate: TranslateService, private spinnerService: SpinnerService) {}

	ngOnInit() {
		this.columns = ["Nom d'évènement", " Ogranisateur", " Date d'organisation", " Locale d'organisation", " Budget d'évènement", "Numéro local de l'association", "subvention de la commune de marrakech"];
		this.getFestivale();
	}

	// ============================================
	// Recuperer tous les festivales
	// ============================================

	public getFestivale() {
		this.isLoading = true;
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.festivalesService
			.getRessource("/festivales")
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
	// Methode d'insertion des associations
	// ============================================
	addFestivale(): void {
		this.router.navigate(["festivales/add-festivales"]);
	}

	// ============================================
	// Export data as excel
	// ============================================
	// exportTable() {
	// 	//this.fileService.exportToExcel("exportData", this.translate.instant("PAGES.ASSOCIATION.TITRE_INDEX"));
	// 	console.log(this.data);
	// 	this.excelService.exportAsExcelFile("لائحة المهرجانات", "", this.columns, this.data, this.footerData, "Liste-festivales", this.translate.instant("PAGES.FESTIVALES.LIST_FESTIVALES"));
	// }

	exportTable() {
		//this.service.exportToExcel("exportData", this.translate.instant("PAGES.MARCHE.AO.TITRE_INDEX"));
		this.excelService.exportAsExcelFile("Liste des festivales et événements", "", this.columns, this.data, this.footerData, "Liste-festivales", this.translate.instant("PAGES.FESTIVALES.LIST_FESTIVALES"));
	}
	createDataJson(i: number): excelData {
		return {
			// id: this.assoc[i].id,
			nomFestival: this.assoc[i].nomFestival,
			organisateurs: this.assoc[i].organisateurs.libelle,
			dateOrganisation: this.datePipe.transform(this.assoc[i].dateOrganisation, "dd-MM-yyyy"),
			localOrganisation: this.assoc[i].localOrganisation,
			budgetEvenement: this.assoc[i].budgetEvenement,
			numLocalAssociation: this.assoc[i].numLocalAssociation,
			subventionCommunMar: this.assoc[i].subventionCommunMar,

			// numSupport: this.assoc[i].numSupport,

			// champOrganisation: this.assoc[i].champOrganisation,
		};
	}
	deleteFestivale(id: number): void {
		Swal.fire({
			title: "هل تريد مسح هذه الجمعية ؟",
			icon: "question",
			iconHtml: "؟",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "نعم",
			cancelButtonText: "لا",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.festivalesService.deleteObject("/festivale/delete/", id).subscribe((data) => {
					Swal.fire({
						position: "center",
						icon: "success",
						title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
						showConfirmButton: false,
						timer: 1500,
					});
					this.getFestivale();
				});
			}
		});
	}
}

export interface excelData {
	// id: string;
	nomFestival: string;
	// numSupport: String;
	organisateurs: string;
	dateOrganisation: string;
	localOrganisation: string;
	// champOrganisation: string;
	budgetEvenement: string;
	subventionCommunMar: string;
	numLocalAssociation: string;
}
