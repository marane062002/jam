import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ExcelAssociationService } from "../../../utils/excel-association.service";
import { environment } from "../../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
	selector: "kt-show-personnel",
	templateUrl: "./show-personnel.component.html",
	styleUrls: ["./show-personnel.component.scss"],
})
export class ShowPersonnelComponent implements OnInit {
	TypeAlert: any;
	data: excelData[] = [];
	columns: any[];
	footerData: any[][] = [];
    details:any;
	id:any;
	dataSource2 = new MatTableDataSource<any>();
	baseUrl = environment.API_PROPRETE_URL
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"NUM",
		"NOM",
		"PRENOM",
		"CNSS",
		"POINTAGE",
		"PERSONNELLE",
		"actions",
	];
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
	constructor(
		private translate: TranslateService,
		private router: Router,
		private route: ActivatedRoute,
		private httpClient: HttpClient,
		private datePipe: DatePipe,
		private excelService: ExcelAssociationService
	) {
	
	}
	deleteAssociation(id: number): void {
		Swal.fire({
			title: "Voulez vous supprimer cet enregistrement ?",
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				Swal.fire({
					position: "center",
					icon: "success",
					title: this.translate.instant(
						"PAGES.GENERAL.MSG_DEL_CONFIRMED"
					),
					showConfirmButton: false,
					timer: 1500,
				});
			}
		});
	}
	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.columns = ["Nom", "Prenom"];
		this.httpClient.get<any[]>(`${this.baseUrl}delegataire/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.details = res
		});
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	createDataJson(i: number): excelData {
		return {
			NUM: this.TypeAlert[i].NUM,
			NOM: this.TypeAlert[i].NOM,
			PRENOM: this.TypeAlert[i].PRENOM,
		};
	}

	addRessource() {
		this.router.navigate(["/pages/proprete-personnel/add-ressource"]);
	}

	EditRessource() {
		this.router.navigate(["/pages/proprete-personnel/edit-ressource"]);
	}

	backList() {
		this.router.navigate(["/pages/proprete-personnel/list-personnel"]);
	}
}
export interface excelData {
	NUM: string;
	NOM: string;
	PRENOM: string;
}
