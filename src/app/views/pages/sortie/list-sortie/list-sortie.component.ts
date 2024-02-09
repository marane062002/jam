import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { data } from "../../audiences/saisir-facture/saisir-facture.component";
import { BehaviorSubject } from "rxjs";
@Component({
	selector: "kt-list-sortie",
	templateUrl: "./list-sortie.component.html",
	styleUrls: ["./list-sortie.component.scss"],
})
export class ListSortieComponent implements OnInit {
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
	displayedColumns: string[] = ["Id", "Objet", "Equipe", "Date", "Commune", "Addresse", "Quantite", "actions"];
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
		// this.data = [
		// 	{
		// 		Id: "01",
		// 		Objet: "Objet 1",
		// 		Date: "Date 1",
		// 		Equipe: "Equipe 1",
		// 		Commune: "Commune 1 ",
		// 		Addresse: "Addresse 1",
		// 		Quantite: "Quantité 1",
		// 	},
		// 	{
		// 		Id: "02",
		// 		Objet: "Objet 2",
		// 		Date: "Date 2",
		// 		Equipe: "Equipe 2",
		// 		Commune: "Commune 2 ",
		// 		Addresse: "Addresse 2",
		// 		Quantite: "Quantité 2",
		// 	},
		// 	{
		// 		Id: "03",
		// 		Objet: "Objet 3",
		// 		Date: "Date 3",
		// 		Equipe: "Equipe 3",
		// 		Commune: "Commune 3 ",
		// 		Addresse: "Addresse 3",
		// 		Quantite: "Quantité 3",
		// 	},
		// ];
	}

	ngOnInit() {
		this.columns = ["Id", "Objet", "Date", "Equipe", "Commune", "Addresse", "Quantite"];
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

		this.httpClient.get<any[]>(`${this.baseUrl}sortie/paginate/${page}/${pageSize}`,{ headers: this.headers }).subscribe((response: any) => {
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
		this.router.navigate(["sortie/add-sortie"]);
	}

	ModifierAssociation(id): void {
		this.router.navigate([`sortie/upd-sortie/${id}`]);
	}

	DetailAssociation(id): void {
		this.router.navigate([`sortie/detaille-sortie/${id}`]);
	}
	Calendar(): void {
		this.router.navigate(["vaccination/calendar-vaccination"]);
	}
	createDataJson(i: number): excelData {
		return {
			Id: this.TypeAlert[i].Id,
			Objet: this.TypeAlert[i].Objet,
			Date: this.TypeAlert[i].Date,
			Equipe: this.TypeAlert[i].Equipe,
			Commune: this.TypeAlert[i].Commune,
			Addresse: this.TypeAlert[i].Addresse,
			Quantite: this.TypeAlert[i].Quantite,
		};
	}
}
export interface excelData {
	Id: string;
	Objet: string;
	Date: string;
	Equipe: string;
	Commune: string;
	Addresse: string;
	Quantite: string;
}
