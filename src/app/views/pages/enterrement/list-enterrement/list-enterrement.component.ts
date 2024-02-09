import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../../../../../environments/environment";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { EnterementInhumService } from "../../medecin-legale-bmh/services/enterement-inhum.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Component({
	selector: "kt-list-enterrement",
	templateUrl: "./list-enterrement.component.html",
	styleUrls: ["./list-enterrement.component.scss"],
})
export class ListEnterrementComponent implements OnInit {
	TypeAlert: any;
	data: excelData[] = [];
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

	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;

	
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"Id",
		"Raison",
		"Type",
		"RC",
		"IF",
		"ICE",
		"actions",
	];
	// ============================================
	// Declarations
	// ============================================
	
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private httpClient: HttpClient,
		private translate: TranslateService,
		private router: Router,
        private enterementserv: EnterementInhumService,
		private datePipe: DatePipe,
		private excelService: ExcelAssociationService
	) {
		this.data = [
			{
				Id: "01",
				Raison: "Ayoub",
				Type: "Alaoui",
				RC: "AE5551",
				IF: "2023-01-01 ",
				ICE: "Rabat",
			},
			{
				Id: "02",
				Raison: "Bilal",
				Type: "Raisi",
				RC: "AQ151532",
				IF: "2009-01-06",
				ICE: "Salé",
			},
			{
				Id: "03",
				Raison: "Ahmed",
				Type: "Nsiri",
				RC: "AS7845",
				IF: "2022-03-05",
				ICE: "Fes",
			},
		];
	}
Interface
	ngOnInit() {
		this.columns = ["Id", "Raison", "Type", "RC", "IF", "ICE"];
		this.dataSource = new MatTableDataSource(this.data);
		this.loadData(this.currentPage, this.pageSize);
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
		console.log("token", localStorage.getItem('accessToken'));

		this.httpClient.get<any[]>(`${this.baseUrl}entrObstacle/paginate/${page}/${pageSize}`, { headers: this.headers }).subscribe((response: any) => {
			// debugger
			// this.obstacle = response.content;
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

	AddAssociation(): void {
		this.router.navigate(["pages/Enterrement/enterement"]);
	}

	ModifierAssociation(): void {
		this.router.navigate(["pages/Enterrement/upd-enterrement"]);
	}
	DetailAssociation(): void {
		this.router.navigate(["pages/Enterrement/detaille-enterrement"]);
	}

	createDataJson(i: number): excelData {
		return {
			Id: this.TypeAlert[i].Id,
			Raison: this.TypeAlert[i].Raison,
			Type: this.TypeAlert[i].Type,
			RC: this.TypeAlert[i].RC,
			IF: this.TypeAlert[i].IF,
			ICE: this.TypeAlert[i].ICE,
		};
	}
}
export interface excelData {
	Id: string;
	Raison: string;
	Type: string;
	RC: string;
	IF: string;
	ICE: string;
}
