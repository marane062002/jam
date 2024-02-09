import { Component, OnInit, ViewChild } from "@angular/core";
import { first, delay } from "rxjs/operators";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";
import { BoServiceService } from "../../../utils/bo-service.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../../shared/notification.service";

// Ar lang
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar-MA';
import Swal from "sweetalert2";
registerLocaleData(localeAr, 'ar');

@Component({
	selector: "kt-list-courriers-convocations",
	templateUrl: "./list-courriers-convocations.component.html",
	styleUrls: ["./list-courriers-convocations.component.scss"],
})
export class ListCourriersConvocationsComponent implements OnInit {

	displayedColumns: string[] = [
		"date",
		"heure",
		"lieu",
		// "membresCommission",
		"delai",
		"ordreJour",
		'actions'
	];

	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	courrier = [];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private service: BoServiceService,
		private router: Router,
		private translate: TranslateService,
		private notification: NotificationService,
		private fb: FormBuilder
	) {
		this.getCourriersConvocations();
	}
	
	ngOnInit() {
		this.getCourriersConvocations();
	}
	

	private getCourriersConvocations() {
		this.service
			.getAllObject("/courriersConvocations")
			.subscribe(
				(data) => {
					this.isLoading = false;
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
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);
	}


	deleteCourrierSortant(id: number): void {
		Swal.fire({
			title: this.translate.instant("PAGES.BUREAU_ORDRE.COURRIER_CONVOCATION.MESSAGE_SUPPRESSION"),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant("PAGES.BUREAU_ORDRE.COURRIER_CONVOCATION.OUI"),
			cancelButtonText: this.translate.instant("PAGES.BUREAU_ORDRE.COURRIER_CONVOCATION.NON"),
		}).then((result) => {
			if (result.isConfirmed) {
				this.service.deleteObject("/courrierConvocation/delete/", id).subscribe(
					(res) => {
						Swal.fire({
							position: "center",
							icon: "success",
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500,
						});
						this.ngOnInit();
					},
					(err) => {
						console.log(err);
					}
				);
			}
		});
	}

	editCourrierConvocation(courrier: any): void {
		window.localStorage.setItem("courrier_conv_id", courrier.id.toString());
		this.router.navigate(["courriers-convocations/edit-courriers-convocations"]);
	}

	showCourrierConvocation(courrier: any): void {
		window.localStorage.setItem("courrier_conv_id", courrier.id.toString());
		this.router.navigate(["courriers-convocations/show-courriers-convocations"]);
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	addNewCourrierConvocation(){
		this.router.navigate(["courriers-convocations/add-courriers-convocations"]);
	}

	destinataireCourrierConvocation(courrier: any): void {
		window.localStorage.setItem("courrier_conv_id", courrier.id.toString());
		this.router.navigate(["destinataire-courrier/add-destinataire-courrier-convocation"]);
	}
}
