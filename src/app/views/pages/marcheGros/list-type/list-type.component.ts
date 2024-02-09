import { DialogAddTypeComponent } from './dialog-add-type/dialog-add-type.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ExcelAssociationService } from '../../utils/excel-association.service';
import Swal from 'sweetalert2';
import { TypeServiceService } from '../Service/type-service.service';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from '../../gestion-parc-auto/common/constants/pagination.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { TypeProduit } from '../../../../core/_base/layout/models/type-produit';
import { combineLatest } from 'rxjs';
import { DialogEditTypeComponent } from './dialog-edit-type/dialog-edit-type.component';

@Component({
  selector: 'kt-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.scss']
})
export class ListTypeComponent implements OnInit {
  // animal: string;
  // name: string;
  data: any[] = [];
  columns: any[];

  footerData: any[][] = [];
  displayedColumns: string[] = [
    "RéfArticleProduit",
    "NomArticleProduit",
    "CategoriArticleProduit",
    "actions",
  ];
  dataSource = new MatTableDataSource<TypeProduit>();
  isLoadingResults = true;
  isLoading = true;
  searchTerm:string="";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(public dialog: MatDialog,
    private translate: TranslateService,
    private router: Router,
    private datePipe: DatePipe,
    private excelService: ExcelAssociationService,
    private typeService:TypeServiceService,
    protected activatedRoute: ActivatedRoute,

  ) {



  }
  page: number;
  itemsPerPage = ITEMS_PER_PAGE;
	predicate: string;
	ascending: boolean;

	totalItems = 0;
	ngbPaginationPage = 1;
	pageSize: number = 5;
	pageIndex: number = 0;
	// pageChanged(event: PageEvent) {
	// 	this.itemsPerPage = event.pageSize;
	// 	this.loadPage(event.pageIndex, true);
	//   }
	  public getTypes(){
		  this.typeService.getAllType()
		  .then(data => {this.dataSource =new MatTableDataSource(data.sort().reverse());

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

	this.getTypes()
	// this.handleNavigation();
    this.columns = ["RéfArticleProduit", "NomArticleProduit","CategoriArticleProduit"];
    this.dataSource = new MatTableDataSource(this.data);
  }
  openDialogAddType(): void {
    const dialogRef = this.dialog.open(DialogAddTypeComponent, {
      width: '850px',
      height: '500px',
      // data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });

  };
  deleteTypeProduit(id: number): void {

	Swal.fire({
		title: "Voulez vous supprimer cet enregistrement ?",
		icon: "question",
		iconHtml: "?",
		showCancelButton: true,
		showCloseButton: true,
		confirmButtonText: "Oui",
		cancelButtonText: "Non",
	  }).then((result) => {
		/* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {
		this.typeService.deleteType(id).subscribe(result => {

			console.log("res ==> ",result.body)
			Swal.fire({
			  position: "center",
			  icon: "success",
			  title:"Type supprimer",
			  showConfirmButton: false,
			  timer: 2500,

			});

			location.reload()

		},error => {

			console.log("error ===> ",error)
			Swal.fire({
			  position: "center",
			  icon: "error",
			  title:"error",
			  showConfirmButton: false,
			  timer: 2500,
			});
		});

			  }
		else{
		  Swal.fire({
					  position: "center",
					  icon: "error",
					  title:"Type non supprimer",
					  showConfirmButton: false,
					  timer: 2500,
				  });
		}
		  });
  }
  applyFilter(filterValue: string | any) {
	this.dataSource.filterPredicate = (data:TypeProduit, filter) => {

		return data.nomArticleProduit.toLocaleLowerCase().includes(filter) ||
		data.numArticleProduit.toString().toLocaleLowerCase().includes(filter) ||
		data.categorieProduit.nomCategori.toLocaleLowerCase().includes(filter);
	  }
	this.dataSource.filter = filterValue.target.value.trim().toLowerCase();

    // if (this.dataSource.paginator) {

    //   this.dataSource.paginator.firstPage();
    // }
  }



//   loadPage(page?: number, dontNavigate?: boolean): void {
// 		this.isLoading = true;
// 		let pageToLoad: number=0;
// 		if(page){
// 			pageToLoad=page

// 		}else if(this.page){
// 			pageToLoad=this.page
// 		}else{
// 			pageToLoad=0}
// 		// const pageToLoad: number = page ?? this.page ?? 1;

// 		this.typeService
// 		  .query({
// 			page: pageToLoad,
// 			size: this.itemsPerPage,
// 			sort: this.sort(),
// 		  })
// 		  .subscribe({
// 			next: (res: HttpResponse<TypeProduit[]>) => {
// 			  this.isLoading = false;
// 			  this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
// 			},
// 			error: () => {
// 			  this.isLoading = false;
// 			  this.onError();
// 			},
// 		  });
// 	  }
// 	  protected onError(): void {
// 		Swal.fire({
// 		  position: "center",
// 		  icon: "error",
// 		//   title: this.translate.instant(
// 		// 	"PAGES.GENERAL.MSG_DEL_NOFINDED_MESSAGE"
// 		//   ),
// 		  showConfirmButton: false,
// 		  timer: 2500,
// 		});
// 	  }

// 	  protected sort(): string[] {
// 		const result = [this.predicate + "," + (this.ascending ? ASC : DESC)];
// 		if (this.predicate !== "id") {
// 		  result.push("id");
// 		}
// 		return result;
// 	  }

// 	  protected handleNavigation(): void {

// 		combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {

// 		  let page = params.get('page');
// 		  let pageNumber=0;
// 		if(page){

// 			pageNumber=+page
// 		}else{

// 			pageNumber=+0
// 		}

// 		//   const pageNumber = +(page ?? 0);
// 		  let sort=null;

// 		  if(params.get(SORT)){

// 			sort= params.get(SORT).split(',');
// 		  }else{

// 			sort= data['defaultSort'].split(',');
// 		  }
// 		//   const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
// 		  const predicate = sort[0];
// 		  const ascending = sort[1] === ASC;

// 		  if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {

// 			this.predicate = predicate;
// 			this.ascending = ascending;
// 			this.loadPage(pageNumber, true);
// 		  }
// 		});
// 	  }


// 	  protected onSuccess(data: TypeProduit[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {

// 		this.totalItems = Number(headers.get('X-Total-Count'));
// 		this.page = page;
// 		if (navigate) {

// 		  this.router.navigate(['marcheGros/list-type'], {
// 			queryParams: {
// 			  page: this.page,
// 			  size: this.itemsPerPage,
// 			  sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
// 			},
// 		  });
// 		}
// 		this.dataSource.data = data || [];
// 		this.ngbPaginationPage = this.page;
// 	  }
edit(id){
	const dialogRef = this.dialog.open(DialogEditTypeComponent, {
		width: '850px',
		height: '500px',
		data:{id:id}

	  });
}

}
