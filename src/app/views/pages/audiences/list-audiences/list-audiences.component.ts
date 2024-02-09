import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest } from "rxjs";
import { TranslateService } from '@ngx-translate/core';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from "../../../../core/_config/pagination.constants";
import { HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Chevillard } from '../../../../core/_base/layout/models/abattoir/chevillard';
import { IChevillard } from '../../../../core/_base/layout/models/abattoir/chevillard';
import Swal from 'sweetalert2';
import { ChevillardService } from '../service/chevillard.service';
//import {  ASC, DESC, ITEMS_PER_PAGE,SORT } from 'src/app/core/_config/pagination.constants';
@Component({
	selector: "kt-list-audiences",
	templateUrl: "./list-audiences.component.html",
	styleUrls: ["./list-audiences.component.scss"],
})
 
export class ListAudiencesComponent implements OnInit {
	//assoc: any;
	data: any[] = [];
	columns?: any[];
	footerData: any[][] = [];

	isLoading = false;
	page?: number;
	itemsPerPage = ITEMS_PER_PAGE;

	ascending!: boolean;
	totalItems = 0;

	expert!: string;

	ngbPaginationPage = 1;
	pageSize: number = 5;
	pageIndex: number = 0;

	public chevillards: Chevillard[];

	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"nom",
		// "prenom",
		// "dateNaissance",
		"telephone",
		"cin",
		"adresse",
		"actions",
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;

	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort
	//@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private translate: TranslateService,
		private router: Router,
		protected activatedRoute: ActivatedRoute,
		private datePipe: DatePipe,
		private chevillardService: ChevillardService,
	) {
		this.getChevillards();
	}

	ngOnInit() {

		this.columns = [
			"nom",
			"prenom",
			"dateNaissance",
			"telephone",
			"cin",
			"adresse"];
	}


	public getChevillards() {
		
		this.chevillardService.getAllChevillards()
			.then(data => {
				this.dataSource = new MatTableDataSource(data.sort().reverse());
				console.log("data--->" + JSON.stringify(data));

				this.isLoadingResults = false;
				this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;

			}, err => {
				console.log(err);
				this.isLoadingResults = false;
			});
	}

	applyFilter(filterValue: string | any) {
		console.log("aaaa: " + filterValue.target.value);
		this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
		console.log("zzz: " + this.dataSource.filter);
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	updateChevillard(id: number): void {
		this.router.navigate(["audiences/edit-chevillard"], { queryParams: { id: id } });
	}

	addChevillard(): void {
		this.router.navigate(["audiences/add-type-chevillard"]);
	}

	delete(id: number): void {
		Swal.fire({
			title: this.translate.instant("PAGES.GESTION_CHEVILLARDS.MESSAGE_SUPPR"),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant("AUTH.GENERAL.OUI"),
			cancelButtonText: this.translate.instant("AUTH.GENERAL.NON"),
		}).then((result) => {
			if (result.isConfirmed) {
				this.chevillardService.deleteChevillard(id).subscribe(res => {
					console.log("res ==> ", res.body)
					Swal.fire({
						position: "center",
						icon: "success",
						title: this.translate.instant("PAGES.GESTION_CHEVILLARDS.MESSAGE_SUCCES_SUPPR"),
						showConfirmButton: false,
						timer: 2500,
					});
					this.getChevillards();

				}, error => {
					console.log("error ===> ", error)
					Swal.fire({
						position: "center",
						icon: "error",
						title: this.translate.instant("PAGES.GESTION_CHEVILLARDS.MESSAGE_ERROR"),
						showConfirmButton: false,
						timer: 2500,
					});
				});

			}
			else {
				Swal.fire({
					position: "center",
					icon: "error",
					title: this.translate.instant("PAGES.GESTION_CHEVILLARDS.MESSAGE_ERROR_SUPPR"),
					showConfirmButton: false,
					timer: 2500,
				});
			}
		});
	}
}
