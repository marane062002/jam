import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, PageEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest } from "rxjs";
import { TranslateService } from '@ngx-translate/core';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from "../../../../core/_config/pagination.constants";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { Espece } from '../../../../core/_base/layout/models/abattoir/espece';
import { IEspece } from '../../../../core/_base/layout/models/abattoir/espece';
import Swal from 'sweetalert2';
import { ExcelAssociationService } from '../../utils/excel-association.service';
import { EspeceService } from '../service/espece.service';


@Component({
	selector: 'kt-list-espece',
	templateUrl: './list-espece.component.html',
	styleUrls: ['./list-espece.component.scss']
})
export class ListEspeceComponent implements OnInit {
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

	public especes: Espece[];

	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"espece",
		"description",
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
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private translate: TranslateService,
		private router: Router,
		protected activatedRoute: ActivatedRoute,
		private datePipe: DatePipe,
		private especeService: EspeceService,
	) {
		this.getEspeces();
	}
	ngOnInit() {
		this.columns = [
			"espece",
			"description"
		];
	}

	public getEspeces() {
		this.especeService.getAllEspeces()
		  .then(data => {
			this.dataSource = new MatTableDataSource(data.sort().reverse());
			console.log("data"+JSON.stringify(data));

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
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	editEspece(id: number): void {
		this.router.navigate(["audiences/edit-espece"], { queryParams: { id: id } });
	}

	addEspece(): void {
		this.router.navigate(["audiences/add-espece"]);
	}

	delete(id: number): void {
		Swal.fire({
			title: this.translate.instant("PAGES.GESTION_ESPECES.MESSAGE_SUPPR"),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant("AUTH.GENERAL.OUI"),
			cancelButtonText: this.translate.instant("AUTH.GENERAL.NON"),
		}).then((result) => {
			if (result.isConfirmed) {
				this.especeService.deleteEspece(id).subscribe(res => {
					console.log("res ==> ", res.body)
					Swal.fire({
						position: "center",
						icon: "success",
						title: this.translate.instant("PAGES.GESTION_ESPECES.MESSAGE_SUCCES_SUPPR"),
						showConfirmButton: false,
						timer: 2500,
					});
					this.getEspeces();

				}, error => {
					console.log("error ===> ", error)
					Swal.fire({
						position: "center",
						icon: "error",
						title: this.translate.instant("PAGES.GESTION_ESPECES.MESSAGE_ERROR"),
						showConfirmButton: false,
						timer: 2500,
					});
				});

			}
			else {
				Swal.fire({
					position: "center",
					icon: "error",
					title: this.translate.instant("PAGES.GESTION_ESPECES.MESSAGE_ERROR_SUPPR"),
					showConfirmButton: false,
					timer: 2500,
				});
			}
		});
	}


}

