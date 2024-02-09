import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../../../../../environments/environment";
import { data } from "../../audiences/saisir-facture/saisir-facture.component";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { BehaviorSubject } from "rxjs";
@Component({
	selector: "kt-list-action",
	templateUrl: "./list-action.component.html",
	styleUrls: ["./list-action.component.scss"],
})
export class ListActionComponent implements OnInit {
	TypeAlert: any;
	data: data[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_BMH_URL; 
	pageSizeOptions: number[] = [5, 10, 50];
	pageSize: number = 5;
	totalRecords : any;
	currentPage: number = 0;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"Id",
		"Liste Etablissement",
		"Type",
		"Sous-type",
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

	constructor(private translate: TranslateService, 
		private httpClient: HttpClient,
		 private router: Router,
		  private datePipe: DatePipe,
		   private excelService: ExcelAssociationService) 
	{

	
	}

	ngOnInit() {
		this.columns = ["Id", "Liste Etablissement", "Type", "Sous-type"];
		this.dataSource = new MatTableDataSource(this.data);
		this.dataSource.paginator = this.paginator; 
		this.loadData(this.currentPage,this.pageSize);
	}
	onPaginatorChange(event: PageEvent): void {
		this.currentPage = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadData(this.currentPage, this.pageSize);
	}	
	dataSubject = new BehaviorSubject<any[]>([]);
	
	loadData(page: number, pageSize: number): void {
		const startIndex = page * pageSize;
		const endIndex = startIndex + pageSize;

		this.httpClient.get<any[]>(`${this.baseUrl}actions-dec/paginate/${page}/${pageSize}`,{ headers: this.headers } ).subscribe((response: any) => {
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
		this.router.navigate(["/actdecision/action-decision"]);
	}
	ModifierAssociation(id): void {
		this.router.navigate([`/actdecision/upd-action/${id}`]);
	}
	DetailAssociation(id) {
		this.router.navigate([`/actdecision/detaille-action/${id}`]);
	}

	createDataJson(i: number): excelData {
		return {
			Id: this.TypeAlert[i].Id,
			Liste_Etablissement: this.TypeAlert[i].Liste_Etablissement,
			Type: this.TypeAlert[i].Type,
			Sous_Type: this.TypeAlert[i].Sous_Type,
		};
	}
}
export interface excelData {
	Id: string;
	Liste_Etablissement: string;
	Type: string;
	Sous_Type: string;
}
