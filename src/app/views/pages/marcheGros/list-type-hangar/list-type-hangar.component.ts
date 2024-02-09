import { DialogComponent } from './dialog/dialog.component';
import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import { HangarService } from '../Service/hangar.service';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from '../../gestion-parc-auto/common/constants/pagination.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Hangar } from '../../../../core/_base/layout/models/Hangar';
import { combineLatest } from 'rxjs';

// export interface DialogData {
// 	animal: string;
// 	name: string;
// }
@Component({
	selector: "kt-list-type-Hangar",
	templateUrl: "./list-type-Hangar.component.html",
	styleUrls: ["./list-type-Hangar.component.scss"],
})

export class ListTypeHangarComponent implements OnInit {
	data: any[] = [];
	columns: any[];
	// totalItems = 0;

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

	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"NumHangar",
		"Libelle",
		"Description",
		"actions",
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;

	// isLoading = true;
	// private hangarService:HangarService


	// ============================================
	// Controles pagination
	// ============================================







	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(
		// dialog: MatDialog,
		private translate: TranslateService,
		private router: Router,
		public dialog: MatDialog,
		public dialog1: MatDialog,
		protected activatedRoute: ActivatedRoute,
		private hangarService: HangarService

		// private datePipe: DatePipe,
		// private excelService: ExcelAssociationService
	) {

	}




	onAddHangarAndOpenDialog(): void {
		// Fetch maxId from the API when the user clicks on the "Ajouter Hangar" button
		this.hangarService.getMaxId().subscribe(
			(res) => {
				this.maxId = res.body;
				this.openDialog(); // Open the dialog after fetching the maxId
			},
			(error: any) => {
				console.error('Error fetching max ID:', error);
			}
		);
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '850px',
			height: '500px',
			data: { maxId: this.maxId },
			// data: { name: this.name, animal: this.animal },
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			// this.animal = result;
		});
	}
	// openDialog(): void {
	// 	const dialogRef = this.dialog.open(DialogComponent, {
	// 		width: '850px',
	// 		height: '500px',
	// 		// data: { name: this.name, animal: this.animal },
	// 	});

	// 	dialogRef.afterClosed().subscribe(result => {
	// 		console.log('The dialog was closed');
	// 		// this.animal = result;
	// 	});
	// }
	openDialogEdit(id): void {
		const dialogRef = this.dialog.open(DialogEditComponent, {
			width: '850px',
			height: '500px',
			data: { id: id },
		});

		// dialogRef.afterClosed().subscribe(result => {
		// 	console.log('The dialog was closed');
		// 	// this.animal = result;
		// });
	}






	// addAssociation(): void {
	// 	// audianc
	// 	this.router.navigate(["pages/Marche/add-type-hangar"]);
	// }
	// DetailAssociation(): void {
	// 	// audianc
	// 	this.router.navigate(["pages/Marche/detail-type-hangar"]);
	// }
	// ModifierAssociation(): void {
	// 	// audianc
	// 	this.router.navigate(["pages/Marche/modification-type-hangar"]);
	// }
	deleteAssociation(id: number): void {
		Swal.fire({
			title: this.translate.instant('PAGES.HANGAR.MESSAGE_SUPPR'),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant('PAGES.PESEE.OUI'),
			cancelButtonText: this.translate.instant('PAGES.PESEE.NON'),
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.hangarService.deleteHangar(id).subscribe(result => {

					console.log("res ==> ", result.body)
					Swal.fire({
						position: "center",
						icon: "success",
						title: this.translate.instant('PAGES.HANGAR.MESSAGE_SUCCES_SUPPR'),
						showConfirmButton: false,
						timer: 2500,

					});
					location.reload()

				}, error => {
					console.log("error ===> ", error)
					Swal.fire({
						position: "center",
						icon: "error",
						title: this.translate.instant('PAGES.HANGAR.MESSAGE_ERROR'),
						showConfirmButton: false,
						timer: 2500,
					});
				});

			}
			else {
				Swal.fire({
					position: "center",
					icon: "error",
					title: this.translate.instant('PAGES.HANGAR.MESSAGE_ERROR_SUPPR'),
					showConfirmButton: false,
					timer: 2500,
				});
			}
		});

	}
	// pageChanged(event: PageEvent) {
	// 		this.itemsPerPage = event.pageSize;
	// 		this.loadPage(event.pageIndex, true);
	// 	  }

	public getHangars() {
		this.hangarService.getAllHangar()
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

	ngOnInit() {

		this.getHangars()

		// this.handleNavigation()

		this.columns = ["NumHangar", "Libelle", "Description"];
		this.dataSource = new MatTableDataSource(this.data);
		console.log("data ======>" + this.dataSource)
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	// 	createDataJson(i: number): excelData {
	// 		return {
	// 			NumHangar: this.TypeAudience[i].NumHangar,
	// 			Libelle: this.TypeAudience[i].Libelle,
	// 			Description: this.TypeAudience[i].Description,
	// 		};
	// 	}
	// }
	// export interface excelData {
	// 	NumHangar: string;
	// 	Libelle: string;
	// 	Description: string;
	// }



	// loadPage(page?: number, dontNavigate?: boolean): void {
	// 		this.isLoading = true;
	// 		let pageToLoad: number=0;
	// 		if(page){

	// 			pageToLoad=page

	// 		}else if(this.page){

	// 			pageToLoad=this.page
	// 		}else{

	// 			pageToLoad=0}
	// 		// const pageToLoad: number = page ?? this.page ?? 1;

	// 		this.hangarService
	// 		  .query({
	// 			page: pageToLoad,
	// 			size: this.itemsPerPage,
	// 			// sort: this.sort(),
	// 		  })
	// 		  .subscribe({
	// 			next: (res: HttpResponse<Hangar[]>) => {

	// 			  this.isLoading = false;
	// 			  console.log("res.body",res.body)
	// 			  console.log("res",res)
	// 			  this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
	// 			},
	// 			error: () => {

	// 			  this.isLoading = false;
	// 			  this.onError();
	// 			},
	// 		  });
	// 	  }
	//   protected onError(): void {
	// 	Swal.fire({
	// 	  position: "center",
	// 	  icon: "error",
	// 	//   title: this.translate.instant(
	// 	// 	"PAGES.GENERAL.MSG_DEL_NOFINDED_MESSAGE"
	// 	//   ),
	// 	  showConfirmButton: false,
	// 	  timer: 2500,
	// 	});
	//   }

	//   protected sort(): string[] {
	// 	const result = [this.predicate + "," + (this.ascending ? ASC : DESC)];
	// 	if (this.predicate !== "id") {
	// 	  result.push("id");
	// 	}
	// 	return result;
	//   }

	//   protected handleNavigation(): void {

	// 	combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {

	// 	  let page = params.get('page');
	// 	  let pageNumber=0;
	// 	if(page){

	// 		pageNumber=+page
	// 	}else{

	// 		pageNumber=+0
	// 	}

	// 	//   const pageNumber = +(page ?? 0);
	// 	  let sort=null;

	// 	  if(params.get(SORT)){

	// 		sort= params.get(SORT).split(',');
	// 	  }else{

	// 		sort= data['defaultSort'].split(',');
	// 	  }
	// 	//   const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
	// 	  const predicate = sort[0];
	// 	  const ascending = sort[1] === ASC;

	// 	  if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {

	// 		this.predicate = predicate;
	// 		this.ascending = ascending;
	// 		this.loadPage(pageNumber, true);
	// 	  }
	// 	});
	//   }


	//   protected onSuccess(data: Hangar[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {

	// 	this.totalItems = Number(headers.get('X-Total-Count'));
	// 	this.page = page;
	// 	if (navigate) {

	// 	  this.router.navigate(['marcheGros/list-type-hangar'], {
	// 		queryParams: {
	// 		  page: this.page,
	// 		  size: this.itemsPerPage,
	// 		  sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
	// 		},
	// 	  });
	// 	}

	// 	this.dataSource.data = data || [];
	// 	this.ngbPaginationPage = this.page;

	//   }


}
