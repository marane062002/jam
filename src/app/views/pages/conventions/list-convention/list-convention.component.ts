import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Location } from "@angular/common";
import { ConventionService } from "../../utils/convention.service";
import { NotificationService } from "../../shared/notification.service";
import { ExcelFrService } from "../../utils/excel-FR.service";
import Swal from "sweetalert2";
import { ExcelJounesseService } from "../../utils/excel-jounesse.service";
@Component({
	selector: "kt-list-convention",
	templateUrl: "./list-convention.component.html",
	styleUrls: ["./list-convention.component.scss"],
})
export class ListConventionComponent implements OnInit {
	id: number;
	assoc: any;
	url: string;
	columns: any[];
	data: excelData[] = [];
	footerData: any[][] = [];
	dataSize: any;
	isLoading:any;
	// ============================================
	// Presentation de datasource
	// ============================================

	displayedColumns: string[] = ["objet", "dateSignature", "dateEffet", "dateFin", "typeConvention", "statutConvention", "actions"];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	// isLoading = true;
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(private excelService: ExcelJounesseService, private conventionService: ConventionService, private translate: TranslateService, private router: Router, private location: Location, private route: ActivatedRoute, private notification: NotificationService) {
		this.getConvention();
	}

	ngOnInit() {
		this.columns = ["Objet de Convention", "Rayonnement", " Champs d'activité", "La nature d'activite", "Population cible", "Localisation"];
	}
	// ============================================
	exportTable() {
		//this.service.exportToExcel("exportData", this.translate.instant("PAGES.MARCHE.AO.TITRE_INDEX"));
		this.excelService.exportAsExcelFile("Liste des conventions", "", this.columns, this.data, this.footerData, "Liste-conventions", this.translate.instant("PAGES.CONVENTION.TITRE_INDEX"));
	}
	// Recuperer tous les association
	// ============================================
	public getConvention() {
		this.isLoading = true;
		// this.id = this.route.snapshot.params['id'];
		// console.log('id :' + this.id);
		this.conventionService.getAllObject("/convention/index").subscribe(
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
	// Methode de suppression des convention
	// ============================================
	// deleteConvention(id: number): void {
	// 	if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
	// 		this.conventionService.deleteConvention("/convention/delete/", id).subscribe((data) => {
	// 			console.log("getId :" + id);
	// 			this.getConvention();
	// 		});
	// 		this.conventionService.deletefiles("/PjConvention/ByIdConvention/", id).subscribe((data) => {
	// 			console.log("File deleted : " + id);
	// 		});
	// 		this.notification.warn(this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"));
	// 	}
	// }

	deleteConvention(id: number): void {
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
				this.conventionService.deleteConvention("/convention/delete/", id).subscribe((data) => {
					Swal.fire({
						position: "center",
						icon: "success",
						title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
						showConfirmButton: false,
						timer: 1500,
					});
					this.getConvention();
				});
				this.conventionService.deletefiles("/PjConvention/ByIdConvention/", id).subscribe((data) => {
					console.log("File deleted : " + id);
				});
			}
		});
	}
	// ============================================
	// Methode d'insertion des convention
	// ============================================
	addConvention(): void {
		this.router.navigate(["conventions/add-convention"]);
	}
	showConvention(id: number): void {
		this.router.navigate(["conventions/show-convention/" + id]);
	}
	/* showConvention(id: number): void {
		this.router.navigate(["conventions/show-convention/" + id]);
	}
 */
	/* addConvention(){
		this.id = this.route.snapshot.params['id'];
		window.localStorage.removeItem("assocId");
		window.localStorage.setItem("assocId",""+this.id);
		this.router.navigate(["convention/add-convention"]);
	} */

	editConvention(id: number): void {
		this.router.navigate(["conventions/edit-convention/" + id]);
	}

	createDataJson(i: number): excelData {
		return {
			objetConvention: this.assoc[i].objetConvention,
			activite_de_rayonnement: this.assoc[i].activite_de_rayonnement,
			champActivite: this.assoc[i].champActivite,
			natureActivite: this.assoc[i].natureActivite,
			cible: this.assoc[i].cible,
			local: this.assoc[i].local,
		};
	}
	createDataJson6(i: number): excelData {
		return {
			objetConvention: this.assoc[i].objetConvention,
			activite_de_rayonnement: this.assoc[i].activite_de_rayonnement,
			champActivite: this.assoc[i].champActivite,
			natureActivite: this.assoc[i].natureActivite,
			cible: this.assoc[i].cible,
			local: this.assoc[i].local,
		};
	}
}
export interface excelData {
	objetConvention: string;
	activite_de_rayonnement: string;
	champActivite: String;
	natureActivite: string;
	cible: string;
	local: string;
}
