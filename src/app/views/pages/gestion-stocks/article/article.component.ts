import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../../../core/_base/layout/models/article';
import { CategorieArticle } from '../../../../core/_base/layout/models/categorie-article';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Fournisseur } from '../../../../core/_base/layout/models/fournisseur';
import { ArticleService } from '../../../../core/_base/layout/services/gestionStock/article.service';
import { FournisseursService } from '../../../../core/_base/layout/services/gestionStock/fournisseurs.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Page } from '../../utils/pagination/page';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';
import { ExcelServiceService } from '../../utils/excel-service.service';
import { CustomPaginationService } from '../../utils/pagination/services/custom-pagination.service';
import { SpinnerService } from '../../utils/spinner.service';

@Component({
  selector: 'app-article',
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

	// ============================================
	// Constructeur
	// ============================================
 
  listCategorieArticle:CategorieArticle[];
  FormArticle: FormGroup;
   article=new Article();
   listArticle:any[];
   listFournisseur:Fournisseur[];
   inputSearch:number;
   currentPage=0;
   sizeData=5;
   totalPages=1;
   actions: any = { canDetail: true ,canModify:true,canDelete:true ,canAdd:true,withAction:true}
   dropdownList = [];
  selectedItems :any[];
  dropdownSettings = {};
  dropdownSettingsFor= {};

  constructor(
    private ArticleService:ArticleService, 
    private modalService: NgbModal,
    private serviceFournisseur:FournisseursService,
    private router: Router,
		private translate: TranslateService,
		private paginationService: CustomPaginationService) {

 
       }
       

  ngOnInit() {
    this.currentPage=0;
    this.sizeData=5
    this.allArticle();

  }
  
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  allFournisseur(){
    // this.serviceFournisseur.all().then(res=>{
    //   console.log(res)
    //   this.listFournisseur=res;
    // },err=>{
    //   console.log(err)
    // })


    // this.serviceFournisseur.all()
  }


  allArticle(){
    console.log("res")
    this.ArticleService.all1().subscribe(res=>{
      console.log(res)
      
      let data:any=res;
      this.datasize = data.length;
      this.dataSource = new MatTableDataSource(data);
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
  applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
  allArticleKeyWord(keyWord:number){
    // this.ArticleService.Keyword(this.currentPage, this.sizeData,keyWord).subscribe(res=>{
    //   console.log(res)
    //   console.log(res)
    //   let data:any=res;
    //   this.listArticle=data.articles;
    //   this.totalPages=data.totalPages;
    // },err=>{
    //   console.log(err)
    // })
  }


  searchBykeyWord(event:any){
    if(this.inputSearch==null || this.inputSearch ==0){
      this.ngOnInit();
    }else
    this.allArticleKeyWord(this.inputSearch);
    console.log(this.inputSearch)
  }
  createArticle(value:any){

    console.log(value)
    if(this.FormArticle.valid){
      console.log(this.article)
      this.ArticleService.save(this.article).subscribe(res=>{
        console.log(res);
        this.alert('success',"Gestion des Articles ", "Article a été bien enregistré ")
        this.close();
        this.article=new Article();
        this.FormArticle.reset();
        this.ngOnInit();
      },err=>{
        this.alert('error',"Gestion des Articles ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
        console.log(err)
      })
    }

    }
    UpdateArticle(value:Article){
        if(this.FormArticle.valid){
      this.ArticleService.update(value.id,value).subscribe(res=>{
        console.log(res)
        this.alert('success',"Gestion des articles", "article  a été bien modifier ");
        this.modalService.dismissAll();
        this.FormArticle.reset();
        this.ngOnInit();
      },err=>{
     
        this.alert('error',"Gestion des articles", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
      
   })
    }
  }
    supprimerArticle(data:any){
      Swal.fire({
        title: ' ',
        text: "voulez-vous vraiment supprimer ce article ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Fermer'
  
      }).then((result) => {
         if (result.isConfirmed) {
          this.ArticleService.delete(data).subscribe(res=>{
            this.ngOnInit();
            Swal.fire({
              title: 'article  supprimé avec succès !',
              icon: 'success',
            });
          },err=>{
            console.log(err)
          })
       
        } 
      })
    }
    selectFournisseur(event:any){
      console.log(event);
     // this.article.fournisseur=new Fournisseur();
      this.article.fournisseur=event;
    }
  selectedCatArticle(event:any){
console.log(this.listCategorieArticle)
  console.log(event)
 let id=event.id;
 let cat:CategorieArticle=this.listCategorieArticle.find(c=>c.id== event.id) || new CategorieArticle();
  this.article.categorieArticle=cat;
 this.ArticleService.getByCategorieArticle(id).subscribe(res=>{
   console.log(res)
   let num=res;

   console.log(num)
   if(null==0 || num==null){
    this.FormArticle.get("numeroArticle").setValue(cat.numero+'00001');
    this.FormArticle.get("id").setValue(cat.id);
   }else{ 
    var lastFive = num.substr(num.length - 5)
    var number=String((Number(lastFive)+1));
    //00000
    var StringComplet="";
    for (let index = 0; index < 5-number.length; index++) {
      StringComplet+="0";
      
    }

    this.FormArticle.get("numeroArticle").setValue( cat.numero+StringComplet+number);
    this.FormArticle.get("id").setValue(cat.id);
   }

 },err=>{
  this.FormArticle.get("numeroArticle").setValue(cat.numero+'00001');
    this.FormArticle.get("id").setValue(cat.id);
   console.log(err)
 })
  
  


  }

    keywordNumroArticle(event:any){
    console.log(event.target.value)
    if(event.target.value.length>3){

    }else{
      this.FormArticle.get("numeroArticle").setValue(this.article.categorieArticle.numero);
    }
  }

  modalAjouterArticle(content:any){
    this.allFournisseur();
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailFournisseur(content:any,data:any){
    this.article=data;
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierArticle(content:any,data:any){
    console.log(data)
    this.FormArticle.patchValue(data);
    this.selectedItems = [
      { id: data.categorieArticle.id, libelleFr:data.categorieArticle.libelleFr},
    ];
   
    this.article=data;
    this.modalService.open(content, {
      size: "lg",
    });
  }



  close(){
    this.modalService.dismissAll();
  }

// event pagination 
pageCurrentChange(event :any){
  this.currentPage=event;

  console.log(this.currentPage, this.sizeData)
  this.allArticle();
}
  sizeCurrentChange(event :any){
    this.sizeData=event;
    console.log(this.currentPage, this.sizeData)
    this.allArticle();
   }

   public getPageInNewSize(pageSize: number): void {
		this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    console.log(pageSize)
		this.isLoading = true;
		if (this.dataSource.filter == null) {
      this.allArticle();
		} 
    
	}
  public getNextPage(): void {
		//console.log("Filter : " + this.dataSource.filter)
		this.page.pageable = this.paginationService.getNextPage(this.page);
		this.isLoading = true;
		if (this.dataSource.filter == null) {
      this.allArticle();
		} 
	}
  public getPreviousPage(): void {
		this.page.pageable = this.paginationService.getPreviousPage(this.page);
		this.isLoading = true;
		if (this.dataSource.filter == null) {
	    this.allArticle();
      
	}}

  addNow(){
    this.router.navigateByUrl("/gestionStock/new-article");
  }

  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }

}
