import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ExcelAssociationService } from '../../utils/excel-association.service';
import Swal from 'sweetalert2';
import {SdlService} from '../service/sdl/sdl.service';
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { data } from "../../audiences/saisir-facture/saisir-facture.component";
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'kt-sdl',
	templateUrl: './sdl.component.html',
	styleUrls: ['./sdl.component.scss'],
})

export class SdlComponent implements OnInit {
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
        'raisonSocial',
        'idFiscale',
        'ice',
        'tel',
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
		private httpClient: HttpClient,
		private translate: TranslateService,
		private router: Router,
		private datePipe: DatePipe,
		private excelService: ExcelAssociationService,
		private sdlService: SdlService,
		private sdlsService: SdlService,
	) {
	}
	getAllSdl(): void {
		// this.sdlsService.getAllSdl({ size: 1000 }).subscribe(
		// 	(res) => {
		// 		console.log(res.body);
		// 		this.sdls = res.body;
		// 		this.dataSource.data = res.body;
		// 	},
		// 	(error) => {
		// 		console.log(error);
		// 	}
		// );
	}

	ngOnInit() {
		this.columns = [ 'id', 'raisonSocial','idFiscale','ice','tel'];
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

		this.httpClient.get<any[]>(`${this.baseUrl}sdl/paginate/${page}/${pageSize}`,{ headers: this.headers } ).subscribe((response: any) => {
			this.data = response.content;
			this.dataSource.data = response.content;
			this.totalRecords = response.totalElements;
			this.isLoadingResults = false;
		});
		console.log("page:", page, "pageSize:", pageSize);
	}
	addSdl(): void {
		this.router.navigate(['delegataire/add-sdl']);
	}
	updateSdl(id: number): void {
		this.router.navigate(['delegataire/upd-sdl/' + id]);
	}
	detailSdl(id: number): void {
		this.router.navigate(['delegataire/detail-sdl/' + id]);
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	deleteDelegataire(id): void {
		this.httpClient.delete(`${this.baseUrl}sdl/${id}`,{ headers: this.headers }).subscribe(
			(response) => {
			  console.log("delegatire Deleted successfuly");
			  this.ngOnInit();
			},
			(error) => {
			  console.error("Error remove delegatire", error);
			}
		  );
	}
	deleteSdl(id: number): void {
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
					position: "center",
					icon: "success",
					title: this.translate.instant(
						"PAGES.GENERAL.MSG_DEL_CONFIRMED"
					),
					showConfirmButton: false,
					timer: 2500,
				});
			} else {
				Swal.fire({
					position: "center",
					icon: "error",
					title: this.translate.instant(
						"PAGES.GENERAL.MSG_DEL_ANNULER"
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
			raisonSocial: this.TypeAlert[i].raisonSocial,
			raisonCom: this.TypeAlert[i].raisonCom,
			idFiscale: this.TypeAlert[i].idFiscale,
			ice: this.TypeAlert[i].ice,
			numCnss: this.TypeAlert[i].numCnss,
			adresse: this.TypeAlert[i].adresse,
			tel: this.TypeAlert[i].tel,
			fax: this.TypeAlert[i].fax,
			email: this.TypeAlert[i].email,
			gerant: this.TypeAlert[i].gerant,
			structure: this.TypeAlert[i].structure,
			capital: this.TypeAlert[i].capital,
		};
	}
}
export interface excelData {
	id: string;
	raisonSocial: string;
	raisonCom: string;
	idFiscale: string;
	ice: string;
	numCnss: string;
	adresse: string;
	tel: string;
	fax: string;
	email: string;
	gerant: string;
	structure: string;
	capital: string;
}


