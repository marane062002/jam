import { environment } from './../../../../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BoServiceService } from '../../../utils/bo-service.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Observable } from 'rxjs';
import { delay } from 'lodash';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'kt-show-courriers-convocations',
	templateUrl: './show-courriers-convocations.component.html',
	styleUrls: ['./show-courriers-convocations.component.scss']
})
export class ShowCourriersConvocationsComponent implements OnInit {

	// =================================================================
	// declaration des Attributs
	// =================================================================
	courrier_conv_id: any;
	loading = false;
	btnloading = false;
	detailscourrier;
	pjs;
	_data;
	data_size: number;
	editForm: FormGroup;
	validate: number;
	// file varriable
	files: Observable<any>;
	start: boolean = true;
	isFile: boolean = false;

	displayedColumns: string[] = [
		"idDivision",
		"idPersonne",
		"typeDestinataire",
		"designation",
		"statutConvocation"
	];

	dataSource: MatTableDataSource<any>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private service: BoServiceService,
		private router: Router,
		private translate: TranslateService
	) {
		this.courrier_conv_id = parseInt(window.localStorage.getItem("courrier_conv_id"));
	}

	ngOnInit() {
		this.service
			.getObjectById("/courrierConvocation/show/", +this.courrier_conv_id)
			.subscribe(
				(data) => {
					this.detailscourrier = data;
				},
				(error) => console.log(error)
			);
		this.getData();
	}

	private getData() {
		this.courrier_conv_id = +window.localStorage.getItem("courrier_conv_id");
		if (!this.courrier_conv_id) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-entrants"]);
			return;
		}
		const _this = this;

		this.service
			.getAllObjectById("/destinataireCourriersConvocations/find/", this.courrier_conv_id)
			.subscribe(
				(data) => {
					_this.data_size = data.length;
					if (data.length > 0) {
						_this.validate = 1;
					} else {
						_this.validate = 0;
					}

					this.loading = false;
					this.dataSource = new MatTableDataSource(data);
					this.paginator._intl.itemsPerPageLabel = this.translate.instant(
						"PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
					);
					this.paginator._intl.nextPageLabel = this.translate.instant(
						"PAGES.GENERAL.NEXT_PAGE_LABEL"
					);
					this.paginator._intl.previousPageLabel = this.translate.instant(
						"PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
					);
					this.paginator._intl.lastPageLabel = this.translate.instant(
						"PAGES.GENERAL.LAST_PAGE_LABEL"
					);
					this.paginator._intl.firstPageLabel = this.translate.instant(
						"PAGES.GENERAL.FIRST_PAGE_LABEL"
					);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(error) => console.log(error)
			);
	}

	back() {
		this.router.navigate([
			"courriers-convocations/list-courriers-convocations",
		]);
	}
}
