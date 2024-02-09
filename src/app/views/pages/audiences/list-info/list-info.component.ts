import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest } from "rxjs";
import { TranslateService } from '@ngx-translate/core';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from "../../../../core/_config/pagination.constants";
import { HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Journee } from '../../../../core/_base/layout/models/abattoir/journee';
import { IJournee } from '../../../../core/_base/layout/models/abattoir/journee';
import Swal from 'sweetalert2';
import { JourneeService } from '../service/journee.service';
//import { ExcelAssociationService } from '../../utils/excel-association.service';
@Component({
	selector: "kt-list-audiences",
	templateUrl: "./list-info.component.html",
	styleUrls: ["./list-info.component.scss"],
})

export class ListInfoComponent implements OnInit {
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

	public journees: Journee[];

	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"dateJournee",
		"chevillards",
		"nombreT",
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
	pageSizes = [3, 5, 7];
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private translate: TranslateService,
		private router: Router,
		protected activatedRoute: ActivatedRoute,
		private datePipe: DatePipe,
		private journeeService: JourneeService,
	) {
		this.getJournees();
	}

	ngOnInit() {

		this.columns = [
			"dateJournee",
			"chevillards",
			"nombreT",
		];
		// this.handleNavigation()
	}

	public getJournees() {
		this.journeeService.getAllJournees()
			.then(data => {
				this.dataSource = new MatTableDataSource(data.sort().reverse());

				this.isLoadingResults = false;
				this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;

			}, err => {
				console.log(err);
				this.isLoadingResults = false;
			});
	}

	protected handleNavigation(): void {
		combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
			//const page = params.get('page');
			let page = params.get('page');
			//const pageNumber = +(page ?? 0);
			let pageNumber = 0;
			if (page) {
				pageNumber = +page
			} else {
				pageNumber = +0
			}
			//const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
			let sort = null;
			if (params.get(SORT)) {
				sort = params.get(SORT).split(',');
			} else {
				sort = data['defaultSort'].split(',');
			}

			const expert = sort[0];
			const ascending = sort[1] === ASC;
			if (pageNumber !== this.page || expert !== this.expert || ascending !== this.ascending) {
				this.expert = expert;
				this.ascending = ascending;
				this.loadPage(pageNumber, true);
			}
		});
	}

	loadPage(page?: number, dontNavigate?: boolean): void {
		this.isLoading = true;
		// const pageToLoad: number = page ?? this.page ?? 1;
		let pageToLoad: number = 0;
		if (page) {
			pageToLoad = page

		} else if (this.page) {
			pageToLoad = this.page
		} else { pageToLoad = 0 }

		this.journeeService
			.query({
				page: pageToLoad,
				size: this.itemsPerPage,
				// sort: this.sort(),
			})
			.subscribe({
				next: (res: HttpResponse<IJournee[]>) => {
					this.isLoading = false;
					this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
					console.log(JSON.stringify(res.body));
				},
				error: () => {
					this.isLoading = false;
					this.onError();
				},
			});
	}

	protected onError(): void { }
	/* protected sort(): string[] {
		const result = [this.expert + "," + (this.ascending ? ASC : DESC)];
		if (this.expert !== "id") {
			result.push("id");
		}
		return result;
	} */
	// ============================================
	// Methode de suppression des chevillards
	// ============================================


	// ============================================
	// Methode d'insertion des chevillards
	// ============================================

	protected onSuccess(data: IJournee[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
		this.totalItems = Number(headers.get('X-Total-Count'));
		this.page = page;
		if (navigate) {
			this.router.navigate(['audiences/list-info'], {
				queryParams: {
					page: this.page,
					size: this.itemsPerPage,
					sort: this.expert + ',' + (this.ascending ? ASC : DESC),
				},
			});
		}
		this.dataSource.data = data || [];
		this.ngbPaginationPage = this.page;

	}

	/* applyFilter(filterValue: string | any) {
		this.dataSource.filter = filterValue?.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
 */

	applyFilter(filterValue: string | any) {
		//console.log('value'+filterValue?.target?.value);
		// this.dataSource.filter = filterValue?.target?.value.trim().toLowerCase();
		this.dataSource.filterPredicate = (data: IJournee, filterData: string) => {
			console.log('filter', filterData);
			console.log('data', data);
			return data.chevillards[0].nom.toLocaleLowerCase().includes(filterData) ||
				// data.chevillards[0].prenom.toLocaleLowerCase().includes(filterData) ||
				data.dateJournee.toString().toLocaleLowerCase().includes(filterData) ||
				data.nombreT.toString().toLocaleLowerCase().includes(filterData);
		}
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}


	pageChanged(event: PageEvent) {
		this.itemsPerPage = event.pageSize;
		this.loadPage(event.pageIndex, true);
	}

	updateJournee(id: number): void {
		this.router.navigate(["audiences/edit-info"], { queryParams: { id: id } });
	}

	addJournee(): void {
		this.router.navigate(["audiences/saisir-info"]);
	}


	delete(id: number): void {
		Swal.fire({
			title: this.translate.instant('PAGES.GESTION_JOURNEE.MESSAGE_SUPPR'),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant('AUTH.GENERAL.OUI'),
			cancelButtonText: this.translate.instant('AUTH.GENERAL.NON'),
		}).then((result) => {
			if (result.isConfirmed) {
				this.journeeService.deleteJournee(id).subscribe(res => {
					console.log("res ==> ", res.body)
					Swal.fire({
						position: "center",
						icon: "success",
						title: this.translate.instant('PAGES.GESTION_JOURNEE.MESSAGE_SUCCES_SUPPR'),
						showConfirmButton: false,
						timer: 2500,
					});
					location.reload()

				}, error => {
					console.log("error ===> ", error)
					Swal.fire({
						position: "center",
						icon: "error",
						title: this.translate.instant('PAGES.GESTION_JOURNEE.MESSAGE_ERROR'),
						showConfirmButton: false,
						timer: 2500,
					});
				});

			}
			else {
				Swal.fire({
					position: "center",
					icon: "error",
					title: this.translate.instant('PAGES.GESTION_JOURNEE.MESSAGE_ERROR_SUPPR'),
					showConfirmButton: false,
					timer: 2500,
				});
			}
		});
	}

}
/*
export interface excelData {
	num: string;
	nom: string;


	typeAffaire: string;

}
*/
