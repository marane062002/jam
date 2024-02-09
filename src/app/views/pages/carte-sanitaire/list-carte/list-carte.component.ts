import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { data } from "../../audiences/saisir-facture/saisir-facture.component";

@Component({
	selector: "kt-list-carte",
	templateUrl: "./list-carte.component.html",
	styleUrls: ["./list-carte.component.scss"],
})
export class ListCarteComponent implements OnInit {
	TypeAlert: any;
	data: data[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_BMH_URL; 
	pageSizeOptions: number[] = [5, 10, 50];
	pageSize: number = 5;
	currentPage: number = 0;
	totalRecords : any;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"Id",
		"Etablissement",
		"Type",
		"Description",
		"Proprietaire",
		"Date",
		"Indicateur",
		"Statut",
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
		private httpClient: HttpClient,
		private datePipe: DatePipe,
		private excelService: ExcelAssociationService
	) {
	
	}

	ngOnInit() {
		this.columns = [
			"Id",
			"Etablissement",
			"Type",
			"Description",
			"Proprietaire",
			"Date",
			"Indicateur",
			"Statut",
		];
		this.dataSource = new MatTableDataSource(this.data);
		this.dataSource.paginator = this.paginator;
		this.loadData(this.currentPage, this.pageSize);
	}

	onPaginatorChange(event: PageEvent): void {
		this.currentPage = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadData(this.currentPage, this.pageSize);
	}
	loadData(page: number, pageSize: number): void {
		const startIndex = page * pageSize;
		const endIndex = startIndex + pageSize;
		this.httpClient.get<any[]>(`${this.baseUrl}employeur/paginate/${page}/${pageSize}`,{ headers: this.headers }).subscribe((response: any) => {
			this.data = response.content;
			this.dataSource.data = response.content;
			this.totalRecords = response.totalElements;
			this.isLoadingResults = false;
		});

		console.log("page:", page, "pageSize:", pageSize);
	}
	  
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
  
	addAssociation(): void {
		this.router.navigate(["/cartesanitaire/view-carte"]);
	}
	ModifierAssociation(id): void {
		this.router.navigate([`/cartesanitaire/upd-carte/${id}`]);
	}
	DetailAssociation(id) {
		this.router.navigate([`/cartesanitaire/detaille-carte/${id}`]);
	}

	// createDataJson(i: number): excelData {
	// 	return {
	// 		Id: this.TypeAlert[i].Id,
	// 		Etablissement: this.TypeAlert[i].Etablissement,
	// 		Type: this.TypeAlert[i].Type,
	// 		Description: this.TypeAlert[i].Description,
	// 		Proprietaire: this.TypeAlert[i].Proprietaire,
	// 		Date: this.TypeAlert[i].Date,
	// 		Indicateur: this.TypeAlert[i].Indicateur,
	// 		Statut: this.TypeAlert[i].Statut,
	// 	};
	// }
}
export interface excelData {
	Id: string;
	Etablissement: string;
	Type: string;
	Description: string;
	Proprietaire: string;
	Date: string;
	Indicateur: string;
	Statut: string;
}
