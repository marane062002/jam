import { DatePipe } from '@angular/common';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { Produit } from '../../../../core/_base/layout/models/produit';
import Swal from 'sweetalert2';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from '../../gestion-parc-auto/common/constants/pagination.constants';
import { ExcelAssociationService } from '../../utils/excel-association.service';
import { ProduitService } from '../Service/produit.service';

@Component({
  selector: 'kt-list-type-Produit',
  templateUrl: './list-type-Produit.component.html',
  styleUrls: ['./list-type-Produit.component.scss']
})
export class ListTypeProduitComponent implements OnInit {

  TypeAlert: any;
  data: any[] = [];
  columns: any[];
  footerData: any[][] = [];
  // ============================================
  // Presentation de datasource
  // ============================================
  displayedColumns: string[] = [
    "Id",
    "Type",
    "Libelle",
    "Tarif",
"Description",
// "Emballage",

    "actions",

  ];
  isLoading = false;
	page: number;
	itemsPerPage = ITEMS_PER_PAGE;
	ascending: boolean;
	totalItems = 0;
	date: Date;
	predicate: string;

	ngbPaginationPage = 1;
  // ============================================
  // Declarations
  // ============================================
  dataSource = new MatTableDataSource<any>();
  isLoadingResults = true;
  // isLoading = true;
  // ============================================
  // Controles pagination
  // ============================================
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private translate: TranslateService,
    private router: Router,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private excelService: ExcelAssociationService,
    protected activatedRoute: ActivatedRoute,
    private prodService:ProduitService
    ) {

  }
  pageSize: number = 5;
  pageIndex: number = 0;
  pageChanged(event: PageEvent) {
	  this.itemsPerPage = event.pageSize;
	  this.loadPage(event.pageIndex, true);
	}

	public getProduits(){
		this.prodService.getAllProduit()
		.then(data => {this.dataSource =new MatTableDataSource(data);

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
	this.getProduits()
    this.columns = [ "Id",
    "Type",
    "Libelle",
    "Tarif",
"Description",
// "Emballage",


      ""];
	//   this.handleNavigation()
    this.dataSource = new MatTableDataSource(this.data);

  }
  applyFilter(filterValue: string) {
	this.dataSource.filterPredicate = (data: Produit, filterData: string) => {
		console.log('filter',filterData);
		console.log('data',data);
		return data.refProduit.toString().toLocaleLowerCase().includes(filterData) ||
		data.typeProduit.nomArticleProduit.toString().toLocaleLowerCase().includes(filterData) ||
		data.lib.toString().toLocaleLowerCase().includes(filterData) ||
		data.description.toLocaleLowerCase().includes(filterData) ||
		data.tarif.toString().toLocaleLowerCase().includes(filterData);
	  }
	this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  addAssociation(): void {
    this.router.navigate(["marcheGros/add-type-produit"]);
  }
  DetailAssociation(id): void {

    this.router.navigate(["marcheGros/detail-type-produit/"+id]);
  }
  ModifierAssociation(id): void {
    this.router.navigate(["marcheGros/modification-type-produit/"+id]);
  }
  deleteAssociation(id: number): void {
    Swal.fire({
			title: this.translate.instant('PAGES.PRODUIT.MESSAGE_SUPPR'),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant('PAGES.PESEE.OUI'),
			cancelButtonText: this.translate.instant('PAGES.PESEE.NON')
		  }).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
			this.prodService.deleteProduit(id).subscribe(result => {

				console.log("res ==> ",result.body)
				Swal.fire({
				  position: "center",
				  icon: "success",
				  title:this.translate.instant('PAGES.PRODUIT.MESSAGE_SUCCES_SUPPR'),
				  showConfirmButton: false,
				  timer: 2500,

				});
				location.reload()

			},error => {
				console.log("error ===> ",error)
				Swal.fire({
				  position: "center",
				  icon: "error",
				  title:this.translate.instant('PAGES.PRODUIT.MESSAGE_ERROR'),
				  showConfirmButton: false,
				  timer: 2500,
				});
			});

				  }
			else{
			  Swal.fire({
						  position: "center",
						  icon: "error",
						  title:this.translate.instant('PAGES.PRODUIT.MESSAGE_ERROR_SUPPR'),
						  showConfirmButton: false,
						  timer: 2500,
					  });
			}
			  });
  }

  // createDataJson(i: number): excelData {
  //   return {
  //     Id: this.TypeAlert[i].Id,
  //     Categorie: this.TypeAlert[i].Categorie,
  //     Type: this.TypeAlert[i].Type,
  //     SousType: this.TypeAlert[i].SousType,
  //     Libelle: this.TypeAlert[i].Libelle,
  //     Description: this.TypeAlert[i].Description,

  //   };
  // }

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

		this.prodService
		  .getAllProduits({
			page: pageToLoad,
			size: this.itemsPerPage,
			// sort: this.sort(),
		  })
		  .subscribe({
			next: (res: HttpResponse<Produit[]>) => {

			  this.isLoading = false;
			  console.log("res.body",res.body)
			  console.log("res",res)
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


	  protected onSuccess(data: Produit[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {

		this.totalItems = Number(headers.get('X-Total-Count'));
		this.page = page;
		if (navigate) {

		  this.router.navigate(['marcheGros/list-type-produit'], {
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
}



