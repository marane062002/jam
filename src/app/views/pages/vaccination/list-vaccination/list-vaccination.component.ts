import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
// import Swal from "sweetalert2";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { data } from "../../audiences/saisir-facture/saisir-facture.component";
import { TypeVaccinationService } from "../../parametrage-bmh/services/type-vaccination.service";

@Component({
	selector: "kt-list-vaccination",
	templateUrl: "./list-vaccination.component.html",
	styleUrls: ["./list-vaccination.component.scss"],
})
export class ListVaccinationComponent implements OnInit {
	TypeAlert: any;
	data: data[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_BMH_URL; 
	pageSizeOptions: number[] = [5, 10, 50];
	pageSize: number = 5;
	currentPage: number = 0;
	totalRecords : any;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"Id",
		"vaccination",
		"Type",
		"Animal",
		"Nombre",
		"Traitement",
		"Date",
		"actions",
	];
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
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
		private excelService: ExcelAssociationService,
		private servicev:TypeVaccinationService
	) {
		// this.data = [
		// 	{
		// 		Id: "01",
		// 		vaccination: "vaccination 1",
		// 		Type: "Type 1",
		// 		Animal: "Animal 1",
		// 		Nombre: "Nombre 1 ",
		// 		Traitement: "Traitement 1",
		// 		Date: "Date 1",
		// 	},
		// 	{
		// 		Id: "02",
		// 		vaccination: "vaccination 2",
		// 		Type: "Type 2",
		// 		Animal: "Animal 2",
		// 		Nombre: "Nombre 2 ",
		// 		Traitement: "Traitement 2",
		// 		Date: "Date 2",
		// 	},
		// 	{
		// 		Id: "03",
		// 		vaccination: "vaccination 3",
		// 		Type: "Type 3",
		// 		Animal: "Animal 3",
		// 		Nombre: "Nombre 3 ",
		// 		Traitement: "Traitement 3",
		// 		Date: "Date 3",
		// 	},
		// ];
	}

	ngOnInit() {
		this.columns = [
			"Id",
			"vaccination",
			"Type",
			"Animal",
			"Nombre",
			"Traitement",
			"Date",
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
		this.servicev.getAllVaccination(page,pageSize).subscribe((response: any) => {
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
		this.router.navigate(["/vaccination/program-vaccination"]);
	}
	Calendar(): void {
		this.router.navigate(["/vaccination/calendar-vaccination"]);
	}
	ModifierAssociation(id): void {
		this.router.navigate([`/vaccination/upd-vaccination/${id}`]);
	}

	DetailAssociation(id) {
		this.router.navigate([`/vaccination/detaille-vaccination/${id}`]);
	}

	deleteAssociation(id): void {
		this.httpClient.delete(`${this.baseUrl}vaccination/${id}`,{ headers: this.headers }).subscribe(
			(response) => {
			  console.log("Vaccination Deleted successfuly");
			  this.ngOnInit()
			},
			(error) => {
			  console.error("Error remove vaccination", error);
			}
		  );
	}
	createDataJson(i: number): excelData {
		return {
			Id: this.TypeAlert[i].Id,
			vaccination: this.TypeAlert[i].vaccination,
			Type: this.TypeAlert[i].Type,
			Animal: this.TypeAlert[i].Animal,
			Nombre: this.TypeAlert[i].Nombre,
			Traitement: this.TypeAlert[i].Traitement,
			Date: this.TypeAlert[i].Date,
		};
	}
}
export interface excelData {
	Id: string;
	vaccination: string;
	Type: string;
	Animal: string;
	Nombre: string;
	Traitement: string;
	Date: string;
}
