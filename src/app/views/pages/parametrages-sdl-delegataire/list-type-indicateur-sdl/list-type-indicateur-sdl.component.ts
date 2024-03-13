import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ExcelAssociationService } from '../../utils/excel-association.service';
import Swal from 'sweetalert2';
import {TypeIndicSdlService} from '../service/typeIndicSdl/type-indic-sdl.service';
import {  HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { data } from "../../audiences/saisir-facture/saisir-facture.component";
import { BehaviorSubject } from 'rxjs';
@Component({
	selector: "kt-list-type-indicateur-sdl",
	templateUrl: "./list-type-indicateur-sdl.component.html",
	styleUrls: ["./list-type-indicateur-sdl.component.scss"],
})
export class ListTypeIndicateurSdlComponent implements OnInit {
	TypeAlert: any;
	data: data[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_SDL_URL; 
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
		'id',
		'libelle',
		'description',
		'actions',
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
		private excelService: ExcelAssociationService,
		private typeIndicSdlService: TypeIndicSdlService,
	) {
	}
	ngOnInit() {
		this.columns = ["id", "libelle", "description"];
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

		this.httpClient.get<any[]>(`${this.baseUrl}type-indicateur-sdl/paginate/${page}/${pageSize}`,{ headers: this.headers } ).subscribe((response: any) => {
			this.data = response.content;
			this.dataSource.data = response.content;
			this.totalRecords = response.totalElements;
			this.isLoadingResults = false;
		});
		console.log("page:", page, "pageSize:", pageSize);
	}

	

	addTypeIndicSdl(): void {
		this.router.navigate(['parametrage-sdl/add-type-indicateur-sdl']);
	}
	updateTypeIndicSdl(id: number): void {
		this.router.navigate(['parametrage-sdl/upd-type-indicateur-sdl/' +id]);
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	deleteDelegataire(id): void {
		this.httpClient.delete(`${this.baseUrl}type-indicateur-sdl/${id}`,{ headers: this.headers }).subscribe(
			(response) => {
			  console.log("delegatire Deleted successfuly");
			  this.ngOnInit();
			},
			(error) => {
			  console.error("Error remove delegatire", error);
			}
		  );
	}
	deleteTypeIndicSdl(id: number): void {
		Swal.fire({
			title: 'Voulez vous supprimer cet enregistrement ?',
			icon: 'question',
			iconHtml: '?',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: 'Oui',
			cancelButtonText: 'Non',
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				console.log(' supprimer ');
				this.deleteDelegataire(id)
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: this.translate.instant(
						'PAGES.GENERAL.MSG_DEL_CONFIRMED'
					),
					showConfirmButton: false,
					timer: 2500,
				});
			} else {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: this.translate.instant(
						'PAGES.GENERAL.MSG_DEL_ANNULER'
					),
					showConfirmButton: false,
					timer: 2500,
				});
			}
		});
	}

	createDataJson(i: number): excelData {
		return {
			id: this.TypeAlert[i].id,
			libelle: this.TypeAlert[i].libelle,
			description: this.TypeAlert[i].description,
		};
	}
}
export interface excelData {
	id: string;
	libelle: string;
	description: string;
}



