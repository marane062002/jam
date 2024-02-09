// import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { HttpClientModule, HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';

import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicule } from '../../../../core/_base/layout/models/vehicule';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from '../../gestion-parc-auto/common/constants/pagination.constants';
import { VehiculeService } from '../Services/vehicule.service';
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { combineLatest } from "rxjs";
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';


@Component({
	selector: 'kt-list-vehicule',
	templateUrl: './list-vehicule.component.html',
	styleUrls: ['./list-vehicule.component.scss']
})
export class ListVehiculeComponent implements OnInit {

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	data: any[] = [];
	columns: any[];
	maxId: number;
	isLoading = false;
	page: number;
	itemsPerPage = ITEMS_PER_PAGE;
	ascending: boolean;
	totalItems = 0;
	date: Date;
	predicate: string;
	ngbPaginationPage = 1;
	pageSize: number = 5;
	pageIndex: number = 0;
	public vehicules: Vehicule[];
	public editvehicule: Vehicule
	public deleteVehicule: Vehicule
	showButton: boolean = false;
	displayedColumns: string[] = [
		"RefVehicule",
		"NumVehicule",
		"NomProprietaire",
		"PoidsVide",
		"Genre",
		"Tel",
		"message",
		"actions",
	];


	isLoadingResults = true;

	dataSource = new MatTableDataSource<any>();

	constructor(
		private router: Router,
		private vehiculeService: VehiculeService,
		protected activatedRoute: ActivatedRoute,
		private translate: TranslateService,
	) { }

	loadPage(page?: number, dontNavigate?: boolean): void {

		this.isLoading = true;
		let pageToLoad: number = 0;

		if (page) {

			pageToLoad = page

		} else if (this.page) {

			pageToLoad = this.page

		} else {


			pageToLoad = 0
		}

		this.vehiculeService
			.query({
				page: pageToLoad,
				size: this.itemsPerPage,
			})
			.subscribe({
				next: (res: HttpResponse<Vehicule[]>) => {

					this.isLoading = false;

					this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
				},
				error: () => {
					this.isLoading = false;

					this.onError();
				},
			});
	}
	protected onError(): void {

		Swal.fire({
			position: "center",
			icon: "error",

			showConfirmButton: false,
			timer: 2500,
		});

	}

	pageChanged(event: PageEvent) {
		this.itemsPerPage = event.pageSize;
		this.loadPage(event.pageIndex, true);
	}


	protected handleNavigation(): void {

		combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {

			let page = params.get('page');
			let pageNumber = 0;
			if (page) {

				pageNumber = +page

			} else {

				pageNumber = +0
			}

			let sort = null;

			if (params.get(SORT)) {

				sort = params.get(SORT).split(',');
			} else {

				sort = data['defaultSort'].split(',');
			}
			const predicate = sort[0];
			const ascending = sort[1] === ASC;

			if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {

				this.predicate = predicate;
				this.ascending = ascending;

				this.loadPage(pageNumber, true);
			}
		});
	}


	protected onSuccess(data: Vehicule[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
		this.totalItems = Number(headers.get('X-Total-Count'));

		this.page = page;

		if (navigate) {

			this.router.navigate(['pesee/list-vehicule'], {
				queryParams: {
					page: this.page,
					size: this.itemsPerPage,
					sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
				},
			});

		}
		this.dataSource.data = data || [];
		this.ngbPaginationPage = this.page;

	}


	addvehicule() {
		this.router.navigate(["pesee/add-vehicule"]);
	}

	ngOnInit() {
		this.getPesees()

		this.columns = [
			"RefVehicule",
			"NumVehicule",
			"NomProprietaire",
			"PoidsVide",
			"Genre",
			"Tel",
			"message"
		];
		this.dataSource = new MatTableDataSource(this.data);
		console.log("datasource=" + this.dataSource)
	}
	ModifierAssociation1(id: number) {

		this.router.navigate(['pesee/edit-vehicule/' + id])
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	deleteAssociation(id: number) {

		Swal.fire({

			title: this.translate.instant('PAGES.VEHICULE.MESSAGE_SUPPR'),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant('PAGES.PESEE.OUI'),
			cancelButtonText: this.translate.instant('PAGES.PESEE.NON'),
		}).then((result) => {

			if (result.isConfirmed) {

				this.vehiculeService.deleteVehicule(id).subscribe(result => {


					console.log("res ==> ", result.body)
					Swal.fire({
						position: "center",
						icon: "success",
						title: this.translate.instant('PAGES.VEHICULE.MESSAGE_SUCCES_SUPPR'),
						showConfirmButton: false,
						timer: 2500,

					});
					location.reload()

				}, error => {
					console.log("error ===> ", error)
					Swal.fire({
						position: "center",
						icon: "error",
						title: this.translate.instant('PAGES.VEHICULE.MESSAGE_ERROR'),
						showConfirmButton: false,
						timer: 2500,
					});
				});

			}
			else {
				Swal.fire({
					position: "center",
					icon: "error",
					title: this.translate.instant('PAGES.VEHICULE.MESSAGE_ERROR_SUPPR'),
					showConfirmButton: false,
					timer: 2500,
				});
			}
		});
	}
	public getPesees() {

		this.vehiculeService.getAllVehicules()
			.then(data => {
				this.dataSource = new MatTableDataSource(data.sort().reverse());
				for (let i = 0; i < this.dataSource.data.length; i++) {
					this.dataSource.data[i].numVehicule="\u202A"+
					this.dataSource.data[i].numVehiculeNumbers+"\u202A"+
					this.dataSource.data[i].numVehiculeAlphabet+"\u202C"+
					this.dataSource.data[i].numVehiculeTwoNumbers
				}

				this.isLoadingResults = false;
				this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;

			}, err => {
				console.log(err);
				this.isLoadingResults = false;
			});

	}


	printComponent(cmpName) {
		let printContents = document.getElementById(cmpName).innerHTML;
		let originalContents = document.body.innerHTML;

		document.body.innerHTML = printContents;

		window.print();

		document.body.innerHTML = originalContents;
	}

	print(): void {
		let printContents, popupWin;
		printContents = document.getElementById('component1').innerHTML;
		popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
		popupWin.document.open();
		popupWin.document.write(`
		<html>
			<head>
			<title>Print tab</title>
			<style>
			//........Customized style.......
			</style>
			</head>
		<body onload="window.print();window.close()">${printContents}</body>
		</html>`
		);
		popupWin.document.close();
	}

}

