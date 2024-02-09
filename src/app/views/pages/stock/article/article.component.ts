import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Page } from '../../utils/pagination/page';
import { CategorieArticle } from '../../../../core/_base/layout/models/categorie-article';
import { FormGroup } from '@angular/forms';
import { Article } from '../../../../core/_base/layout/models/article';
import { Fournisseur } from '../../../../core/_base/layout/models/fournisseur';
import { ArticleService } from '../../../../core/_base/layout/services/gestionStock/article.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'kt-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
	
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild('inputFile', { static: true }) inputFile: ElementRef;
  datasize: number = 0;
  page: Page<any> = new Page();
	dataSource = new MatTableDataSource<any>();
  columns = ['id', "numeroArticle", "designation"];
  isLoading = true;
	isLoading2 = true;
  displayedColumns: string[] = [
		"id",
		"numero",
		"categorie",
		"designation",
		"unite",
		"prix",
		"actions",
	];

	addNow(){
		this.router.navigateByUrl("/stock/ajouter-article");
	  }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

	listCategorieArticle:CategorieArticle[];
  FormArticle: FormGroup;
   article=new Article();
   listArticle:any[];
   listFournisseur:Fournisseur[];
   inputSearch:number;
   currentPage=0;
   sizeData=5;
   totalPages=1;
  //  actions: any = { canDetail: true ,canModify:true,canDelete:true ,canAdd:true,withAction:true}
   dropdownList = [];
  selectedItems :any[];
  dropdownSettings = {};
  dropdownSettingsFor= {};
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }
  
  constructor( private router: Router,private translate: TranslateService,
    private ArticleService:ArticleService) {

 
       }


	   ngOnInit(){
	this.currentPage=0;
    this.sizeData=5
    this.allArticle();
}




deleteAutorisation(id:any){


  Swal.fire({
    title: ' ',
    text: "voulez-vous vraiment supprimer ce  entrées de stock  ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Supprimer',
    cancelButtonText: 'Fermer'

  }).then((result) => {
     if (result.isConfirmed) {
      this.ArticleService.delete(id).subscribe(res=>{
        this.alert('success',"Gestion des Articles ", "Article a été bien Suprimé ")
        window.location.reload()
      },err=>{
        this.alert('error',"Gestion des Articles ", "Article n'est pas Suprimé.");
    
      })

    }
  })


  // this.ArticleService.delete(id).subscribe(res=>{
  //   this.alert('success',"Gestion des Articles ", "Article a été bien Suprimé ")
  // },err=>{
  //   this.alert('error',"Gestion des Articles ", "Article n'est pas Suprimé.");

  // })

}

allArticle(){
    console.log("res")
    this.ArticleService.all3().subscribe(res=>{
      console.log(res)
      let data:any=res;
	  this.isLoading = false;
      this.datasize = data.articles.length;
      this.dataSource = new MatTableDataSource(data.articles);
      this.isLoading = false;
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
    },err=>{
      console.log(err)
    })
  }

}
