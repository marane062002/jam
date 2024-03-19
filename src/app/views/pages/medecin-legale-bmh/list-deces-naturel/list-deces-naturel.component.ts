import { Component, OnInit, ViewChild } from "@angular/core";
import { DecesNaturelsService } from "../services/deces-naturels.service";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import Swal from "sweetalert2";
import { data } from "../../audiences/saisir-facture/saisir-facture.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { DatePipe } from "@angular/common";
import { FormControl, FormGroup } from "@angular/forms";
import jsPDF, { Html2CanvasOptions } from "jspdf";
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { ArrondissemntService } from "../../parametrage-bmh/services/arrondissemnt.service";
@Component({
	selector: "kt-list-deces-naturel",
	templateUrl: "./list-deces-naturel.component.html",
	styleUrls: ["./list-deces-naturel.component.scss"],
})
export class ListDecesNaturelComponent implements OnInit {
	info: any;
	age: number | undefined;
	TypeAlert: any;
	data: data[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_BMH_URL; 
	pageSizeOptions: number[] = [5, 10, 50];
	pageSize: number = 5;
	totalRecords : any;
	currentPage: number = 0;



    arrondissementControl = new FormControl();
	arrondissement: any;
	dateDeces: any;
	statut: any;



	toPrintFournitures: any = [];
	toPrintServices: any = [];
	filterForm: FormGroup;
	toPrintTraveaux: any = [];


	deces: InterfaceDeces[] = [];
	// dataSource = new MatTableDataSource<InterfaceDeces>();
	displayedColumns: string[] = ["Num", "Nom", "Prenom", "CIN", "Constateur", "Quartier", "Lieu_de_deces", "actions"];
	
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});

	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(
		private ArrondissementService:ArrondissemntService,
		private router: Router, 
		private service: DecesNaturelsService, 
		private httpClient: HttpClient,
		private datePipe: DatePipe) {}
	
	

	ngOnInit() {
		// this.getAllD();
		this.loadData(this.currentPage, this.pageSize);
		this.ArrondissementService.getAll().subscribe(res=>{
			this.arrondissement=res
			console.log(res);
			console.log(this.arrondissement);
		  })
	}

	update(id: any) {
		return this.router.navigate(["/bmh1/update-deces-naturel/", id]);
	}
	details(id: any) {
		return this.router.navigate(["/bmh1/details-deces-naturel/", id]);
	}

	ajouter() {
		this.router.navigate(["/bmh1/add-deces-naturel"]);
	}


	Statut(selectedValue: string): void {
		console.log('Selected nature:', selectedValue);
		console.log('Selected statut:', this.statut);
		this.ngOnInit()
	}
	
	DateDeces(selectedValue: string): void {
		console.log('Selected nature:', selectedValue);
		console.log('Selected statut:', this.statut);
		this.ngOnInit()
	}
	  Arrondissement(selectedValue: string): void {
		this.arrondissement = null
		console.log('Selected nature:', selectedValue);
		console.log('Selected date deces:', this.dateDeces);
		this.ngOnInit()
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


		let url = `${this.baseUrl}deces/paginate/${page}/${pageSize}?`;

		if (this.statut) {
		  url += `statusCadavre=${this.statut}&`; 
		}
		if (this.dateDeces) {
			url += `dateDeces=${this.dateDeces}&`; 
		}
		
		if (this.arrondissementControl.value) {
			url += `arrondissement=${this.arrondissementControl.value}&`; 
		}
		this.httpClient.get<any[]>(url, { headers: this.headers }).subscribe((response: any) => {
			this.deces = response.content;
			this.dataSource.data = response.content;
			this.totalRecords = response.totalElements;
			this.isLoadingResults = false;
		});

		console.log("page:", page, "pageSize:", pageSize);
	}


	calculateAge(dateOfBirth: any) {
		if (!dateOfBirth || !Array.isArray(dateOfBirth)) return null; // Add null and array check
	  
		const birthDate = new Date(dateOfBirth[0], dateOfBirth[1] - 1, dateOfBirth[2]);
		
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
		  age--;
		}
		return age;
	  }
	  
	  
	  

	Recu(id: number) {
		this.service.getById(id).subscribe(
			(data: any) => {		
				this.info = data;
	
				setTimeout(() => {
					let DATA: any = document.getElementById("htmlData");
	
					html2canvas(DATA, {}).then((canvas) => {
						const FILEURI = canvas.toDataURL("image/png");
						let PDF = new jsPDF({
							orientation: "p",  // "p" for portrait, "l" for landscape
							unit: "mm",
							format: "a4",  // You can also use custom dimensions like [width, height]
						});
						let fileWidth = PDF.internal.pageSize.getWidth();
						let fileHeight = (canvas.height * fileWidth) / canvas.width;
						let position = 0;
						PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
						PDF.save("CERTIFICAT DE DECES.pdf");
					});
				}, 250);		
			},
			(error: any) => {
				console.error("Erreur lors de la récupération des données :", error);
			}
		);
	}
	

	





	getAllD() {
		this.service.getAll().subscribe(
			(res) => {
				this.deces = res;
				console.log(res);
			},
			(err) => {
				console.log("err est:", err);
			}
		);
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	deleteMorts(id): void {
		this.httpClient.delete(`${this.baseUrl}deces/${id}`,{ headers: this.headers }).subscribe(
			(response) => {
			  console.log("Deces Deleted successfuly");
			  this.ngOnInit();
			},
			(error) => {
			  console.error("Error remove deces", error);
			}
		  );
	}
}
export interface InterfaceDeces {
	id: number;
	nom: string;
	prenom: string;
	cin: string;
	tel: string;
	nationalite: string;
	sexe: string;
	date: Date;
	lieu: string;
	adresseDeces: string;
	adresseResidence: string;
}
