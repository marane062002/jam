import { DatePipe } from '@angular/common';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { CategorieProduit } from '../../../../core/_base/layout/models/categorie-produit';
import Swal from 'sweetalert2';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from '../../gestion-parc-auto/common/constants/pagination.constants';
import { ExcelAssociationService } from '../../utils/excel-association.service';
import { DialogEditComponent } from '../list-type-hangar/dialog-edit/dialog-edit.component';
import { CatService } from '../Service/cat-service.service';
import { DialogAddCategorieComponent } from './dialog-add-categorie/dialog-add-categorie.component';
import { DialogEditCategorieComponent } from './dialog-edit-categorie/dialog-edit-categorie.component';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-list-categorie-produit',
  templateUrl: './list-categorie-produit.component.html',
  styleUrls: ['./list-categorie-produit.component.scss']
})
export class ListCategorieProduitComponent implements OnInit {
  data: any[] = [];
	columns: any[];
	// totalItems = 0;

	isLoading = false;
	page: number;
	itemsPerPage = ITEMS_PER_PAGE;
	ascending: boolean;
	totalItems = 0;
	 date: Date;
	predicate: string;

	 ngbPaginationPage = 1;
	//  pageSize: number = 2;
	 pageIndex: number = 0;

  public categoris:CategorieProduit[]=[];
  displayedColumns: string[] = [
    "RéfCatégorie",
    "NomCatégorie",

    "actions",
  ];
  dataSource = new MatTableDataSource<any>();
//   isLoadingResults = true;
  // isLoading = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
    private translate: TranslateService,
    private router: Router,
    // private datePipe: DatePipe,
    protected activatedRoute: ActivatedRoute,
    private catService:CatService,
    // private excelService: ExcelAssociationService,
	// private modalService: NgbModal,

  ) {

  }
//   pageSize: number = 5;
//   pageChanged(event: PageEvent) {

// 	  this.itemsPerPage = event.pageSize;
// 	  console.log('aaaaaaaaaaaaa',event);

// 	  this.loadPage(event.pageIndex, true);
// 	}
	isLoadingResults=true
	public getCat(){
		this.catService.getAllCat()
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
	this.getCat()
    // this.handleNavigation()

    this.columns = ["RéfCatégorie", "NomCatégorie"];
    this.dataSource = new MatTableDataSource(this.data);
  }
//   autoEcole: FormGroup;

//   isSelected: boolean;

  ouvrirModalModifier(id) {
	// this.autoEcole.reset()
   //this.isSelected = true;
   const dialogRef = this.dialog.open(DialogEditCategorieComponent, {
	width: '850px',
	height: '500px',
	data:{id:id}

  });
}
//    this.catService.getById( id).subscribe((res) => {
// 	console.log('res=========>',res);

// 	 this.autoEcole.patchValue({
// 	   id: res.body["id"],
// 	   refCategori: res.body["refCategori"],
// 	   nomCategori: res.body["nomCategori"],

// 	 });
//    });

//  }


  openDialogAdd(): void {
    const dialogRef = this.dialog.open(DialogAddCategorieComponent, {
      width: '850px',
      height: '500px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  deleteAssociation(id: number): void {
    Swal.fire({
      title: this.translate.instant('PAGES.CATEGORIE.MESSAGE_SUPPR'),
      icon: "question",
      iconHtml: "?",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: this.translate.instant('PAGES.PESEE.OUI'),
      cancelButtonText: this.translate.instant('PAGES.PESEE.NON'),
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
      this.catService.deleteCat(id).subscribe(result => {

          console.log("res ==> ",result.body)
          Swal.fire({
            position: "center",
            icon: "success",
            title:this.translate.instant('PAGES.CATEGORIE.MESSAGE_SUCCES_SUPPR'),
            showConfirmButton: false,
			timer: 2500,

          });
          location.reload()

      },error => {
          console.log("error ===> ",error)
          Swal.fire({
            position: "center",
            icon: "error",
            title:this.translate.instant('PAGES.CATEGORIE.MESSAGE_ERROR'),
            showConfirmButton: false,
            timer: 2500,
          });
      });

			}
      else{
        Swal.fire({
					position: "center",
					icon: "error",
					title:this.translate.instant('PAGES.CATEGORIE.MESSAGE_ERROR_SUPPR'),
					showConfirmButton: false,
					timer: 2500,
				});
      }
		});
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }






//   loadPage(page?: number, dontNavigate?: boolean): void {
// 	console.log("page=========>",page);

// 		this.isLoading = true;
// 		let pageToLoad: number=0;
// 		if(page){
// 			pageToLoad=page

// 		}else if(this.page){
// 			pageToLoad=this.page
// 		}else{
// 			pageToLoad=0}
// 		// const pageToLoad: number = page ?? this.page ?? 1;

// 		this.catService
// 		  .query({
// 			page: pageToLoad,
// 			size: this.itemsPerPage,
// 			sort: this.sort(),
// 		  })
// 		  .subscribe({
// 			next: (res: HttpResponse<CategorieProduit[]>) => {
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


// 	  protected onSuccess(data: CategorieProduit[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {

// 		this.totalItems = Number(headers.get('X-Total-Count'));
// 		this.page = page;
// 		if (navigate) {

// 			console.log('bbbbbbbbbbbbb===============>', this.itemsPerPage);

// 		  this.router.navigate(['marcheGros/list-categorie-produit'], {
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




	ModifierAssociation1(id: number){
		//
		// this._service.updateVehicule(vehicule).subscribe(data => console.log(data), error => console.log(error));
		// this.router.navigate(["/marcheGros/list-categorie-produit/dialog-edit-categorie/"+id]);



    const dialogRef = this.dialog.open(DialogEditCategorieComponent, {
      width: '850px',
      height: '500px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
	}
	ngAfterViewInit() {


		this.dataSource.paginator = this.paginator;

	  }

}
