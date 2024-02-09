import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { data } from "../../audiences/saisir-facture/saisir-facture.component";
import { BehaviorSubject } from "rxjs";

@Component({
	selector: "kt-list-programme",
	templateUrl: "./list-programme.component.html",
	styleUrls: ["./list-programme.component.scss"],
})
export class ListProgrammeComponent implements OnInit {
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
		"Motif de visite",
		"Date",
		"Agent",
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
		private datePipe: DatePipe
	) {

	}

	ngOnInit() {
		this.columns = [
			"Id",
			"Liste Etablissement",
			"Type",
			"Sous-type",
			"Motif de visite",
			"Date",
			"Agent",
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


	text: string = "";

    getFirstThreeWords(text: string): string {

        const words = text.split(/\s+/);

        const firstThreeWords = words.slice(0, 3);
        let result = firstThreeWords.join(' ');
		if (words.length > 3) {
			result += '...';
		}
        return result;
    }
	dataSubject = new BehaviorSubject<any[]>([]);
	loadData(page: number, pageSize: number): void {
		const startIndex = page * pageSize;
		const endIndex = startIndex + pageSize;

		this.httpClient.get<any[]>(`${this.baseUrl}programme/paginate/${page}/${pageSize}`,{ headers: this.headers }).subscribe((response: any) => {
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
		this.router.navigate(["/etablissement/program-visit"]);
	}
	ModifierAssociation(id): void {
		this.router.navigate([`/etablissement/upd-programme/${id}`]);
	}
	DetailAssociation(id) {
		this.router.navigate([`/etablissement/detaille-programme/${id}`]);
	}

	createDataJson(i: number): excelData {
		return {
			Id: this.TypeAlert[i].Id,
			Liste_Etablissement: this.TypeAlert[i].Liste_Etablissement,
			Type: this.TypeAlert[i].Type,
			Sous_Type: this.TypeAlert[i].Sous_Type,
			Motif_de_visite: this.TypeAlert[i].Motif_de_visite,
			Date: this.TypeAlert[i].Date,
			Agent: this.TypeAlert[i].Agent,
		};
	}
}
export interface excelData {
	Id: string;
	Liste_Etablissement: string;
	Type: string;
	Sous_Type: string;
	Motif_de_visite: string;
	Date: string;
	Agent: string;
}
