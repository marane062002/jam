import { Component, OnInit, ViewChild } from "@angular/core";
import { ObstacleService } from "../services/obstacle.service";
import { Router } from "@angular/router";
import { data } from "../../audiences/saisir-facture/saisir-facture.component";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { BehaviorSubject } from "rxjs";
import { FormGroup } from "@angular/forms";
import jsPDF, { Html2CanvasOptions } from "jspdf";
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
@Component({
	selector: "kt-list-obstacles",
	templateUrl: "./list-obstacles.component.html",
	styleUrls: ["./list-obstacles.component.scss"],
})
export class ListObstaclesComponent implements OnInit {
	info: any;
	age: number | undefined;
	TypeAlert: any;
	data: data[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_BMH_URL;
	pageSizeOptions: number[] = [5, 10, 50];
	pageSize: number = 5;
	totalRecords: any;
	currentPage: number = 0;



	toPrintFournitures: any = [];
	toPrintServices: any = [];
	filterForm: FormGroup;
	toPrintTraveaux: any = [];


	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});

	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;

	obstacle: InterfaceObstacle[] = [];
	displayedColumns: string[] = ["NUM", "Nom", "Prenom", "CIN", "Constateur", "Quartier", "Lieu_de_deces", "actions"];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private router: Router,
		private service: ObstacleService,
		private httpClient: HttpClient,
	) {


		// this.service.getAll().subscribe((res) => {
		// 	this.obstacle = res;
		// 	debugger;
		// this.totalRecords=res.length
		// 	console.log(this.obstacle.length);
		// }); 
	}


	ngOnInit() {
		// this.getAllD();
		this.loadData(this.currentPage, this.pageSize);
	}

	add() {
		this.router.navigate(["/bmh1/add-obstacles"]);
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

		this.httpClient.get<any[]>(`${this.baseUrl}defunt/paginate/${page}/${pageSize}`, { headers: this.headers }).subscribe((response: any) => {
			// debugger
			this.obstacle = response.content;
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

	formatDate(dateArray: any[]): string {
		if (!dateArray || !Array.isArray(dateArray) || dateArray.length !== 5) {
			return ''; 
		}
		const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
		const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} `;
		return formattedDate;
	}
	


	Recu(id: number) {
		this.service.getById(id).subscribe(
			(data: any) => {
				this.info = data;
                console.log(this.info)
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


	deleteMorts(id): void {
		this.httpClient.delete(`${this.baseUrl}defunt/${id}`, { headers: this.headers }).subscribe(
			(response) => {
				console.log("Deces Deleted successfuly");
				this.ngOnInit()
			},
			(error) => {
				console.error("Error remove deces", error);
			}
		);
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	Details(id: any) {
		return this.router.navigate(["/bmh1/details-obstacles/", id]);
	}
	Modifier(id: any) {
		this.router.navigate(["/bmh1/update-obstacles/", id]);
	}
}
export interface InterfaceObstacle {
	id: number;
	nom: string;
	prenom: string;
	cin: string;
	date: Date;
	sexe: string;
	lieu: string;
	adresseResidence: string;
	adresseDeces: string;
	numDeces: number;
	nationalite: string;
	nomDeclarent: string;
	prenomDeclarent: string;
	cinDeclarent: string;
	observation: string;
	dateDeclaration: Date;
	dateDeces: Date;
	dateConstation: Date;
	causesDeces: string;
	observationConst: string;
	constateur: string;
	arrondissement: string;
	quartier: string;
	commune: string;
	statut: string;
	entrementInhumation: string;
}
