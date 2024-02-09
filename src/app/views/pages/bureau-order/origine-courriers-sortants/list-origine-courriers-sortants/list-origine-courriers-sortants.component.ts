import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { BoServiceService } from "../../../utils/bo-service.service";
import { TranslateService } from '@ngx-translate/core';
import { delay, finalize } from 'rxjs/operators';
import { SpinnerService } from '../../../utils/spinner.service';
import Swal from 'sweetalert2';

@Component({
	selector: "kt-list-origine-courriers-sortants",
	templateUrl: "./list-origine-courriers-sortants.component.html",
	styleUrls: ["./list-origine-courriers-sortants.component.scss"],
})
export class ListOrigineCourriersSortantsComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	origin = [];
	isLoading = true;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"raisonSociale",
		"tel",
		"fax",
		"mail",
		"adresse",
		"actions",
	];
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: BoServiceService,
		private router: Router,
		private translate: TranslateService,
		private spinnerService: SpinnerService,
	) {
		this.getOriginCourriersSortants();
	}
	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() { }
	// ============================================
	//
	// ============================================
	private getOriginCourriersSortants() {
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.service
			.getAllObject("/origineCourierEntrants/type/pm")
			.pipe(finalize(() => {
				this.spinnerService.stop(spinnerRef);// stop spinner
			}))
			.subscribe((data) => {
				this.isLoading = false;
				this.dataSource = new MatTableDataSource(data);
				this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
				this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
				this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
				this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
				this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
				(err) => {
					this.isLoading = false;
					console.log(err);
				});
	}
	// ============================================
	//
	// ============================================
	applyFilter(filterValue: string) {
		console.log(filterValue);
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	}
	// ============================================
	//
	// ============================================
	addNewOriginCourrierSortant(): void {
		this.router.navigate([
			"origine-courriers-sortants/add-origine-courriers-sortants",
		]);
	}
	// ============================================
	//
	// ============================================
	detailsOriginCourrierSortant(courrier: any): void {
		window.localStorage.removeItem("personneMoralId");
		window.localStorage.setItem(
			"personneMoralId",
			courrier.id.toString()
		);
		this.router.navigate([
			"origine-courriers-sortants/show-origine-courriers-sortants",
		]);
	}
	// ============================================
	//
	// ============================================
	editOriginCourrierSortant(courrier: any): void {
		window.localStorage.removeItem("personneMoralId");
		window.localStorage.setItem("personneMoralId",courrier.id.toString());
		this.router.navigate([
			"origine-courriers-sortants/edit-origine-courriers-sortants",
		]);
	}
	// ============================================
	//
	// ============================================
	deleteOriginCourrierSortant(id): void {
		Swal.fire({
			title: 'هل تريد مسح هذه المعلومات ؟',
			icon: 'question',
			iconHtml: '؟',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: 'نعم',
			cancelButtonText: 'لا',
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service
					.deleteObject("/origineCourierEntrants/delete/", id)
					.subscribe(data => {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500
						})
						this.getOriginCourriersSortants();
					});
			}
		})
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.service.exportToExcel("exportData", this.translate.instant("PAGES.BUREAU_ORDRE.ORIGINE_COURRIER.TITRE_INDEX"));
	}
}
