import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { ConsultationArchitecturalService } from "../../shared/consultation-architectural.service";
import { TranslateService } from "@ngx-translate/core";
import { SpinnerService } from "../../utils/spinner.service";

import Swal from "sweetalert2";

@Component({
	selector: "kt-consultation-architecturale-list",
	templateUrl: "./consultation-architecturale-list.component.html",
	styleUrls: ["./consultation-architecturale-list.component.scss"],
})
export class ConsultationArchitecturaleListComponent implements OnInit {
	dataSize: number = 0;
	isLoading = false;
	sizeData = 0;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(
		private translate: TranslateService,
		private route: Router,
		private spinnerService: SpinnerService,
		private service: ConsultationArchitecturalService
	) {}
	displayedColumns = [
		"numCA",
		"objetFR",
		"objetAR",
		"budget",
		"type",
		"loi",
		"actions",
	];

	/*public populate() {
		const _this = this;
		var spinnerRef = this.spinnerService.start(
			this.translate.instant("PAGES.GENERAL.LOADING")
		); // start spinner
		this.loadData.then(
			(data) => {
				console.log("OUT DATA: " + JSON.stringify(data, null, 2));
				this.isLoading = false;
				_this.sizeData = data.length;
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
				this.spinnerService.stop(spinnerRef); // stop spinner
			},
			(err) => {
				console.log(err);
				this.isLoading = false;
				this.spinnerService.stop(spinnerRef); // stop spinner
			}
		);
	}*/

	dataSource;

	ngOnInit() {
		this.loadData();
	}

	loadData() {
		this.service.getAll().subscribe((res) => {
			this.dataSource = new MatTableDataSource(JSON.parse(res + ""));
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
		});
	}

	detailsConsultation(id) {
		this.route.navigate(["/marches/ca-detail"], {
			queryParams: { id: id },
		});
	}

	editConsultation(id) {
		this.route.navigate(["/marches/consultation-architecturale-edit", id]);
	}

	deleteConsultation(id) {
		/* Read more about isConfirmed, isDenied below */
		Swal.fire({
			title: this.translate.instant("PAGES.GENERAL.MSG_DELETED"),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			if (result.isConfirmed) {
				this.service.deleteConsultation(id).subscribe(
					(data) => {
						Swal.fire({
							position: "center",
							icon: "success",
							title: this.translate.instant(
								"PAGES.GENERAL.MSG_DEL_CONFIRMED"
							),
							showConfirmButton: false,
							timer: 1500,
						});
						this.loadData();
					},
					(err) => {
						console.log(err);
						Swal.fire({
							icon: "error",
							title: "Suppression interdite !!",
							text: "Ce numéro de consultation architecturale  est utilisé par d'outre module.",
						});
					}
				);
			}
		});
	}
	addConsultation() {
		this.route.navigate(["/marches/consultation-architecturale-add"]);
	}
}
