import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest } from "rxjs";
import { TranslateService } from '@ngx-translate/core';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from "../../../../core/_config/pagination.constants";
import { HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { ArreteFiscal } from '../../../../core/_base/layout/models/abattoir/arrete-fiscal';
import { IArreteFiscal } from '../../../../core/_base/layout/models/abattoir/arrete-fiscal';
import Swal from 'sweetalert2';
import { ArreteFiscalService } from '../service/arrete-fiscal.service';
import { filter } from 'lodash';

@Component({
	selector: 'kt-list-tarifs',
	templateUrl: './list-tarifs.component.html',
	styleUrls: ['./list-tarifs.component.scss']
})


export class ListTarifsComponent implements OnInit {
	//assoc: any;
	data: any[] = [];
	columns?: any[];
	footerData: any[][] = [];
	exportTable
	isLoading = false;
	page?: number;
	itemsPerPage = ITEMS_PER_PAGE;

	ascending!: boolean;
	totalItems = 0;

	expert!: string;

	ngbPaginationPage = 1;
	pageSize: number = 5;
	pageIndex: number = 0;

	public arreteFiscal: ArreteFiscal[];

	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"codeNature",
		"espece",
		"libelle",
		"tarif",
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
		private arreteFiscalService: ArreteFiscalService,
	) {

		this.getArretesFiscales();

		this.dataSource.filterPredicate = (data: ArreteFiscal, filter: string) => {
			return data.espece.espece.toLocaleLowerCase().includes(filter)
		}

	}

	ngOnInit() {
		this.columns = [
			"codeNature",
			"espece",
			"libelle",
			"tarif",];
	}

	public getArretesFiscales() {
		this.arreteFiscalService.getAllArretesFiscales()
			.then(data => {
				this.dataSource = new MatTableDataSource(data.sort().reverse());
				console.log("data ----->"+JSON.stringify(data))

				this.isLoadingResults = false;
				this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

				this.dataSource.paginator = this.paginator;

			}, err => {
				console.log(err);
				this.isLoadingResults = false;
			});
	}


	applyFilter(filterValue: string | any) {
		this.dataSource.filterPredicate = (data: IArreteFiscal, filterData: string) => {
            console.log('filter',filterData);
            console.log('data',data);
            return data.espece.espece.toLocaleLowerCase().includes(filterData) ||
			data.codeNature.toString().toLocaleLowerCase().includes(filterData) ||
			data.libelle.toLocaleLowerCase().includes(filterData) ||
			data.tarif.toString().toLocaleLowerCase().includes(filterData);
          }
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	updateArreteFiscal(id: number): void {
		this.router.navigate(["audiences/edit-tarifs"], { queryParams: { id: id } });
	}

	addArreteFiscal(): void {
		this.router.navigate(["audiences/add-tarifs"]);
	}


	delete(id: number): void {
		Swal.fire({
			title: this.translate.instant("PAGES.GESTION_ARRETES_FISCALS.MESSAGE_SUPPR"),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant("AUTH.GENERAL.OUI"),
			cancelButtonText: this.translate.instant("AUTH.GENERAL.NON"),
		}).then((result) => {
			if (result.isConfirmed) {
				this.arreteFiscalService.deleteArreteFiscal(id).subscribe(res => {
					console.log("res ==> ", res.body)
					Swal.fire({
						position: "center",
						icon: "success",
						title: this.translate.instant("PAGES.GESTION_ARRETES_FISCALS.MESSAGE_SUCCES_SUPPR"),
						showConfirmButton: false,
						timer: 2500,
					});
					this.getArretesFiscales();

				}, error => {
					console.log("error ===> ", error)
					Swal.fire({
						position: "center",
						icon: "error",
						title: this.translate.instant("PAGES.GESTION_ARRETES_FISCALS.MESSAGE_ERROR"),
						showConfirmButton: false,
						timer: 2500,
					});
				});

			}
			else {
				Swal.fire({
					position: "center",
					icon: "error",
					title: this.translate.instant("PAGES.GESTION_ARRETES_FISCALS.MESSAGE_ERROR_SUPPR"),
					showConfirmButton: false,
					timer: 2500,
				});
			}
		});
	}
}