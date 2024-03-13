import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { sousThemeService } from "../../../../../shared/sous-theme.service";

@Component({
	selector: "kt-list-sous-theme",
	templateUrl: "./list-sous-theme.component.html",
	styleUrls: ["./list-sous-theme.component.scss"],
})
export class ListSousThemeComponent implements OnInit {
	language = localStorage.getItem("language");

	columns: any[];
	sizeData = 0;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"Id",
		"libelleFrançais",
		"libelleArabe",
		"theme",
		"actions",
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	data



	// ============================================
	// Controles pagination
	// ============================================

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	pageIndex = 0
	constructor(private route: ActivatedRoute,
		private translate: TranslateService,
		private router: Router,
		private service: sousThemeService,
		private datePipe: DatePipe,
	) {

	}

	ngOnInit() {
		this.service.findAllByPages().then((res) => {
			this.data = res.content
			this.sizeData = res.totalElements;
			this.dataSource = new MatTableDataSource(this.data);
			this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
			this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
			this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
			this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
			this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		})





	}


	addNew(): void {
		this.router.navigate(["/programme/add-sous-theme"], {
			queryParams: { id: 0 },
		});

	}

	update(value): void {
		console.log(value);
		this.router.navigate(["/programme/add-sous-theme"], {
			queryParams: { id: value.id },
		});
	}
	Details(value) {
		console.log(value);
		this.router.navigate(["/programme/show-sous-theme"], {
			queryParams: { id: value.id },
		});
	}

	delete(id: number): void {
		Swal.fire({
			title: this.translate.instant("PAGES.PROGRAMME.MESSAGE_SUPPRESSION"),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant("PAGES.PROGRAMME.OUI"),
			cancelButtonText: this.translate.instant("PAGES.PROGRAMME.NON"),
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service.delete(id).subscribe(
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
						Swal.fire({
							position: "center",
							icon: "error",
							title:"Enregistrement non supprimer car il est lié à un autre enregistrement",
							showConfirmButton: false,
							timer: 1500,
						});
						console.log(err);
					}
				);
			}
		});
	}



	handlePageEvent(event: PageEvent) {
		let pageSize = event.pageSize;
		let pageIndex = event.pageIndex;
		this.service.Pagination(pageIndex, pageSize).subscribe((res: any) => {
			this.data = res.content
			this.sizeData = res.totalElements;
			this.dataSource = new MatTableDataSource(this.data);
			// this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
			// this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
			// this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
			// this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
			// this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
			// this.dataSource.paginator = this.paginator;
			// this.dataSource.sort = this.sort;
		})

	}


}
