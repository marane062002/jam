import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ExcelAssociationService } from "../../../utils/excel-association.service";
import { environment } from "../../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { data } from "../../../audiences/saisir-facture/saisir-facture.component";
@Component({
	selector: "kt-centre-transfert",
	templateUrl: "./centre-transfert.component.html",
	styleUrls: ["./centre-transfert.component.scss"],
})
export class CentreTransfertComponent implements OnInit {
	TypeAlert: any;
	data: data[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_PROPRETE_URL; 
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
		"NUM",
		"ADRESSE",
		"CAPACITE",
		"IMM",
		"QUANITITE",
		"DATE",
		"LOCALISATION",
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
	deleteEquipement(id): void {
		this.httpClient.delete(`${this.baseUrl}centre/${id}`,{ headers: this.headers }).subscribe(
			(response) => {
			  console.log("delegatire Deleted successfuly");
			  this.ngOnInit();
			},
			(error) => {
			  console.error("Error remove delegatire", error);
			}
		  );
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
				this.deleteEquipement(id)
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
		this.columns = [
			"NUM",
			"ADRESSE",
			"CAPACITE",
			"IMM",
			"QUANITITE",
			"DATE",
			"LOCALISATION",
		];
		
		this.dataSource = new MatTableDataSource(this.data);
		this.dataSource.paginator = this.paginator;
		this.loadData(this.currentPage, this.pageSize);
		console.log("data source :",this.dataSource)
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

		this.httpClient.get<any[]>(`${this.baseUrl}centre/paginate/${page}/${pageSize}`,{ headers: this.headers } ).subscribe((response: any) => {
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
	formatDate(date: any): string {
		return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
	  }
	addCentre(): void {
		this.router.navigate(["/pages/proprete-transfert/add-centre"]);
	}

	addDecharge(): void {
		this.router.navigate(["/pages/proprete-transfert/add-decharge"]);
	}

	Modifier(id): void {
		this.router.navigate([`/pages/proprete-transfert/edit-centre/${id}`]);
	}

	Details(): void {
		this.router.navigate(["/pages/conge/show-conge"]);
	}

	Edit(): void {
		this.router.navigate(["/pages/conge/edit-conge"]);
	}
}
