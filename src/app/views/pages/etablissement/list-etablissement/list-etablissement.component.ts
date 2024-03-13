import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { environment } from "../../../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { data } from "../../audiences/saisir-facture/saisir-facture.component";
@Component({
	selector: "kt-list-etablissement",
	templateUrl: "./list-etablissement.component.html",
	styleUrls: ["./list-etablissement.component.scss"],
})
export class ListEtablissementComponent implements OnInit {
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
	// new HttpHeaders()
	// .set('content-type', 'application/json')
	// .set('Access-Control-Allow-Origin', '*');
	displayedColumns: string[] = [
		"Id",
		"EH",
		// "Adresse",
		"Remarque",
		// "Proprietaire",
		"Netab",
		"Tetab",
		"Adresse",
		// "Indicateur",
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

	constructor(private translate: TranslateService, private httpClient: HttpClient, private router: Router, private datePipe: DatePipe, private excelService: ExcelAssociationService) {}

	ngOnInit(): void {
		// this.headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');

		this.columns = ["Id", "IF", "Description", "Tel", "Propriétaire", "Gérant"];
		// this.dataSource = new MatTableDataSource(this.data);
		// this.dataSource.paginator = this.paginator;
		this.loadData(this.currentPage, this.pageSize);
	}


	onPaginatorChange(event: PageEvent): void {
		this.currentPage = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadData(this.currentPage, this.pageSize);
	}

	dataSubject = new BehaviorSubject<any[]>([]);
	//   dataSource$: Observable<any[]> = this.dataSubject.asObservable();

	loadData(page: number, pageSize: number): void {
		const startIndex = page * pageSize;
		const endIndex = startIndex + pageSize;
		console.log("token", localStorage.getItem('accessToken'));

		this.httpClient.get<any[]>(`${this.baseUrl}etablissements/paginate/${page}/${pageSize}`, { headers: this.headers }).subscribe((response: any) => {
			// 
			this.data = response.content;
			this.dataSource.data = response.content;
			this.totalRecords = response.totalElements;
			this.isLoadingResults = false;
		});
		console.log("page:", page, "pageSize:", pageSize);
	}

	// loadData(): void {
	// 	this.httpClient.get<any[]>('http://localhost:9095/etablissements')
	// 	  .subscribe(response => {
	// 		this.data = response;
	// 	  });
	//   }

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	addAssociation(): void {
		this.router.navigate(["/etablissement/add-etablissement"]);
	}
	ModifierAssociation(id): void {
		this.router.navigate([`/etablissement/upd-etablissement/${id}`]);
	}
	DetailAssociation(id) {
		this.router.navigate([`/etablissement/etablissements/${id}`]);
	}
	programVisite() {
		this.router.navigate(["/etablissement/program-visit"]);
	}
}
// export interface excelData {
// 	Id: string;
// 	Etablissement: string;
// 	Type: string;
// 	Description: string;
// 	Proprietaire: string;
// 	Date: string;
// 	Indicateur: string;
// }
