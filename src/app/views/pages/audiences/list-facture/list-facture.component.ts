import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ExcelAssociationService } from '../../utils/excel-association.service';
import { MatRadioChange } from '@angular/material';
import { Espece } from '../../../../core/_base/layout/models/abattoir/espece';
import { EspeceService } from '../service/espece.service';
import { HttpResponse } from '@angular/common/http';
import { Facture, IFacture } from '../../../../core/_base/layout/models/abattoir/facture';
import { FactureService } from '../service/facture.service';
import { ArreteFiscalService } from '../service/arrete-fiscal.service';
import { ArreteFiscal, IArreteFiscal } from '../../../../core/_base/layout/models/abattoir/arrete-fiscal';
import { ITEMS_PER_PAGE } from '../../gestion-parc-auto/common/constants/pagination.constants';
@Component({
	selector: "kt-list-audiences",
	templateUrl: "./list-facture.component.html",
	styleUrls: ["./list-facture.component.scss"],
})
export class ListFactureComponent implements OnInit {
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

	public factures: Facture[];

	displayedColumns: string[] = [
		"numFacture",
		"espece",
		"montantTotal",
		"actions",
	];

	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	pageSizes = [3, 5, 7];
	
	constructor(
		private translate: TranslateService,
		private router: Router,
		protected activatedRoute: ActivatedRoute,
		private datePipe: DatePipe,
		private factureService: FactureService,
	) {
		this.getFactures();
	}

	ngOnInit() {
	}

	public getFactures() {
		this.factureService.getAllFactures()
			.then(data => {
				for(let i=0;i<data.length;i++){
					data[i].montanttotal=data[i].montanttotal.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
				}
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

	

	applyFilter(filterValue: string | any) {;
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	updateFacture(id: number): void {
		this.router.navigate(["audiences/update-facture"], { queryParams: { id: id } });
	}

	addFacture(): void {
		this.router.navigate(["audiences/saisir-facture"]);
	}


	delete(id: number): void {
		Swal.fire({
			title: this.translate.instant('PAGES.GESTION_FACTURE.MESSAGE_SUPPR'),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant('AUTH.GENERAL.OUI'),
			cancelButtonText: this.translate.instant('AUTH.GENERAL.NON'),
		}).then((result) => {
			if (result.isConfirmed) {
				this.factureService.deleteFacture(id).subscribe(res => {
					console.log("res ==> ", res.body)
					Swal.fire({
						position: "center",
						icon: "success",
						title: this.translate.instant('PAGES.GESTION_FACTURE.MESSAGE_SUCCES_SUPPR'),
						showConfirmButton: false,
						timer: 2500,
					});
					this.getFactures();

				}, error => {
					console.log("error ===> ", error)
					Swal.fire({
						position: "center",
						icon: "error",
						title: this.translate.instant('PAGES.GESTION_FACTURE.MESSAGE_ERROR'),
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

