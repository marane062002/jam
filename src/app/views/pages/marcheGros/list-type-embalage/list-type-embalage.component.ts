import { DatePipe } from "@angular/common";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { Component, OnInit, Type, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { combineLatest } from "rxjs";
import { Emballage } from "../../../../core/_base/layout/models/emballage";
import Swal from "sweetalert2";
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from "../../gestion-parc-auto/common/constants/pagination.constants";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { EmballageService } from "../Service/emballage.service";

@Component({
	selector: "kt-list-type-embalage",
	templateUrl: "./list-type-embalage.component.html",
	styleUrls: ["./list-type-embalage.component.scss"],
})
export class ListTypeEmbalageComponent implements OnInit {
	TypeAlert: any;
	data: any[] = [];
	columns: any[];
	footerData: any[][] = [];
	page: number;
	predicate: string;
	ascending: boolean;

	itemsPerPage = ITEMS_PER_PAGE;

	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"Num",
		"categorie",
		"description",
		"poids",
		"actions",
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;
	totalItems = 0;
	ngbPaginationPage = 1;

	// ============================================
	// Controles pagination
	// ============================================
	isSelected:boolean=false
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private translate: TranslateService,
		private router: Router,
private emballageService :EmballageService,
protected activatedRoute: ActivatedRoute,
		// private datePipe: DatePipe,
		// private excelService: ExcelAssociationService
	) {
		// this.data = [
		// 	{
		// 		Num: "",
		// 		categorie: "",
		// 		description: "",
		// 		poids: "",
		// 	},
		// 	{
		// 		Num: "",
		// 		categorie: "",
		// 		description: "",
		// 		poids: "",
		// 	},
		// 	{
		// 		Num: "",
		// 		categorie: "",
		// 		description: "",
		// 		poids: "",
		// 	},
		// 	{
		// 		Num: "",
		// 		categorie: "",
		// 		description: "",
		// 		poids: "",
		// 	},
		// 	{
		// 		Num: "",
		// 		categorie: "",
		// 		description: "",
		// 		poids: "",
		// 	},
		// ];
	}
	pageSize: number = 5;
	pageIndex: number = 0;
	pageChanged(event: PageEvent) {
		this.itemsPerPage = event.pageSize;
		this.loadPage(event.pageIndex, true);
	  }
	deleteAssociation(id: number): void{
		Swal.fire({
		  title: this.translate.instant('PAGES.EMBALLAGE.MESSAGE_SUPPR'),
		  icon: "question",
		  iconHtml: "?",
		  showCancelButton: true,
		  showCloseButton: true,
		  confirmButtonText: this.translate.instant('PAGES.PESEE.OUI'),
		  cancelButtonText: this.translate.instant('PAGES.PESEE.NON'),
		}).then((result) => {
		  /* Read more about isConfirmed, isDenied below */
		  if (result.isConfirmed) {
		  this.emballageService.deleteEmballage(id).subscribe(result => {
	// localStorage.setItem("numEmballage", JSON.stringify(JSON.parse(localStorage.getItem("numEmballage"))-1));

			  console.log("res ==> ",result.body)
			  Swal.fire({
				position: "center",
				icon: "success",
				title:this.translate.instant('PAGES.EMBALLAGE.MESSAGE_SUCCES_SUPPR'),
				showConfirmButton: false,
				timer: 2500,

			  });
			  location.reload()

		  },error => {
			  console.log("error ===> ",error)
			  Swal.fire({
				position: "center",
				icon: "error",
				title:this.translate.instant('PAGES.EMBALLAGE.MESSAGE_ERROR'),
				showConfirmButton: false,
				timer: 2500,
			  });
		  });

				}
		  else{
			Swal.fire({
						position: "center",
						icon: "error",
						title:this.translate.instant('PAGES.EMBALLAGE.MESSAGE_ERROR_SUPPR'),
						showConfirmButton: false,
						timer: 2500,
					});
		  }
			});
	  }
	  public getEmb(){
		this.emballageService.getAllEmballage()
		.then(data => {this.dataSource =new MatTableDataSource(data.sort().reverse());

			// for(let i=0;i<this.dataSource.data.length;i++){
			// 	this.dataSource.data[i].numEmballage="\u202A"+this.dataSource.data[i].numEmballage1+"\u202A"+this.dataSource.data[i].numEmballageImm+"\u202C"+this.dataSource.data[i].numEmballage2;

			// }
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
		this.getEmb()
		// this.handleNavigation()
		this.columns = [
			"Num",
			"categorie",
			"description",
			"poids",
		];
		this.dataSource = new MatTableDataSource(this.data);
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	loadPage(page?: number, dontNavigate?: boolean): void {
		this.isLoading = true;
		let pageToLoad: number=0;
		if(page){
			pageToLoad=page

		}else if(this.page){
			pageToLoad=this.page
		}else{
			pageToLoad=0}
		// const pageToLoad: number = page ?? this.page ?? 1;

		this.emballageService
		  .getAllEmballages({
			page: pageToLoad,
			size: this.itemsPerPage,
			// sort: this.sort(),
		  })
		  .subscribe({
			next: (res: HttpResponse<Emballage[]>) => {
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
		//   title: this.translate.instant(
		// 	"PAGES.GENERAL.MSG_DEL_NOFINDED_MESSAGE"
		//   ),
		  showConfirmButton: false,
		  timer: 2500,
		});
	  }

	//   protected sort(): string[] {
	// 	const result = [this.predicate + "," + (this.ascending ? ASC : DESC)];
	// 	if (this.predicate !== "id") {
	// 	  result.push("id");
	// 	}
	// 	return result;
	//   }

	  protected handleNavigation(): void {

		combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {

		  let page = params.get('page');
		  let pageNumber=0;
		if(page){

			pageNumber=+page
		}else{

			pageNumber=+0
		}

		//   const pageNumber = +(page ?? 0);
		  let sort=null;

		  if(params.get(SORT)){

			sort= params.get(SORT).split(',');
		  }else{

			sort= data['defaultSort'].split(',');
		  }
		//   const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
		  const predicate = sort[0];
		  const ascending = sort[1] === ASC;

		  if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {

			this.predicate = predicate;
			this.ascending = ascending;
			this.loadPage(pageNumber, true);
		  }
		});
	  }


	  protected onSuccess(data: Emballage[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {

		this.totalItems = Number(headers.get('X-Total-Count'));
		this.page = page;
		if (navigate) {

		  this.router.navigate(['marcheGros/list-categorie-produit'], {
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




	addAssociation(): void {
		//Alert
		this.isSelected=false
		this.router.navigate(["marcheGros/add-type-embalage"]);
	}
	// DetailAssociation(): void {
	// 	//Alert
	// 	this.router.navigate(["pages/Marche/detail-type-embalage"]);
	// }
	ModifierAssociation(id): void {
		this.isSelected=true
		this.router.navigate(["marcheGros/modification-type-embalage/"+id]);
	}


}

