import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ExcelAssociationService } from "../../../utils/excel-association.service";
import { environment } from "../../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { data } from "../../../audiences/saisir-facture/saisir-facture.component";
import { BehaviorSubject } from "rxjs";
@Component({
	selector: "kt-list-penalites",
	templateUrl: "./list-penalites.component.html",
	styleUrls: ["./list-penalites.component.scss"],
})
export class ListPenalitesComponent implements OnInit {
	TypeAlert: any;
	data: data[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_PROPRETE_URL; 
	pageSizeOptions: number[] = [5, 10, 50];
	pageSize: number = 5;
	totalMontant: number;
	totalRecords : any;
	currentPage: number = 0;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = ["NUM", "NOM", "PRENOM", "actions"];
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
        private httpClient:HttpClient,
		private datePipe: DatePipe,
		private excelService: ExcelAssociationService
	) {
	
	}
	deleteEquipement(id): void {
		this.httpClient.delete(`${this.baseUrl}penalite/${id}`,{ headers: this.headers }).subscribe(
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
				this.deleteEquipement(id);
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
		this.columns = ["Nom", "Prenom"];
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

		this.httpClient.get<any[]>(`${this.baseUrl}penalite/paginate/${page}/${pageSize}`,{ headers: this.headers } ).subscribe((response: any) => {
			this.data = response.content;
			this.dataSource.data = response.content;
			this.totalRecords = response.totalElements;
			this.isLoadingResults = false;
		});
		
		this.httpClient.get<any[]>(`${this.baseUrl}penalite`, { headers: this.headers }).subscribe((response: any[]) => {
			// Assuming response is an array of objects, iterate over each object
			let total: number = 0; // Initialize total to 0
			response.forEach((res: any) => {
				total += res.montantAssocie;
				console.log("Montant:", total, "montant associe:", res.montantAssocie);
			});
			this.totalMontant = total
			console.log("pageSize:", total);
		});
		
		console.log("page:", page, "pageSize:", this.totalMontant);
		
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	addPen(): void {
		this.router.navigate([
			"/pages/proprete-reclamations-penalites/add-penalite",
		]);
	}
	Detail(id): void {
		this.router.navigate([`/pages/proprete-reclamations-penalites/show-penalite/${id}`,]);
	}
	Details(): void {
		this.router.navigate(["/pages/conge/show-conge"]);
	}

	Edit(id): void {
		this.router.navigate([
			`/pages/proprete-reclamations-penalites/edit-penalite/${id}`,
		]);
	}

}
