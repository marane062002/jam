import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../../../../core/_base/layout/models/article';
import { CategorieArticle } from '../../../../core/_base/layout/models/categorie-article';
import { Fournisseur } from '../../../../core/_base/layout/models/fournisseur';
import { MAgasin } from '../../../../core/_base/layout/models/magasin';
import { ArticleService } from '../../../../core/_base/layout/services/gestionStock/article.service';
import { CategorieArticleService } from '../../../../core/_base/layout/services/gestionStock/categorie-article.service';
import { FournisseursService } from '../../../../core/_base/layout/services/gestionStock/fournisseurs.service';
import { MagasinService } from '../../../../core/_base/layout/services/gestionStock/magasin.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Page } from '../../utils/pagination/page';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';




@Component({
  selector: 'kt-list-vignette',
  templateUrl: './list-vignette.component.html',
  styleUrls: ['./list-vignette.component.scss']
})
export class ListVignetteComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild('inputFile', { static: true }) inputFile: ElementRef;
  datasize: number = 0;
  page: Page<any> = new Page();
	dataSource = new MatTableDataSource<any>();
  isLoading=true;
  displayedColumns: string[] = [
		"id",
		"numero",
		"categorie",
		"designation",
		"unite",
		"prix",
		"actions",
	];
  

  listCategorieArticle:CategorieArticle[];
  FormVignette: FormGroup;
   article=new Article();
   listArticle:any[];
   listFournisseur:Fournisseur[];
   listMagasins:MAgasin[];
   inputSearch:number;
   currentPage=0;
   size=5;
   totalPages=1;
   dropdownList = [];
  selectedItems :any[];
  dropdownSettings = {};
  dropdownSettingsFor= {};
  constructor(
    private   router:Router,
    private ArticleService:ArticleService, 
    private modalService: NgbModal,
    private fb:FormBuilder,
    private  magasinService:MagasinService,
    private serviceFournisseur:FournisseursService,
    private translate:TranslateService,
    private categorieArticleService:CategorieArticleService) {

 
       }
       

  ngOnInit() {
    this.currentPage=0;
     this.allArticle();
     this.allMagasins();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'libelleFr',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.dropdownSettingsFor = {
      singleSelection: true,
      idField: 'id',
      textField: 'nom',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }
  applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
  addNow(){
    this.router.navigateByUrl("stock/Ajouter-vignette");
  }
  allMagasins(){
    this.magasinService.all().subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.listMagasins=data;
    },err=>{
      console.log(err)
    })
  }
  getFormVignettes() : FormArray {
    return this.FormVignette.get("vignettes") as FormArray
  }
  newVignette(type:string) {
     if(type=="v"){
      let v= this.fb.group({
        first: new FormControl("",[Validators.required,Validators.minLength(16), Validators.maxLength(16),Validators.pattern("^C[0-9]{7}[A-Z]{2}[0-9]{6}$")]),
        latest:  new FormControl("",[Validators.required,Validators.minLength(16), Validators.maxLength(16),Validators.pattern("^C[0-9]{7}[A-Z]{2}[0-9]{6}$")]),
      })
      this.getFormVignettes().push(v);
    }else{ 
      let v= this.fb.group({
        first: new FormControl("",[Validators.required,Validators.minLength(16), Validators.maxLength(16),Validators.pattern("^C[0-9]{7}[A-Z]{2}[0-9]{6}$")]),
        latest:  new FormControl(""),
     
      })
      this.getFormVignettes().push(v);
   }
   
    
    
}
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  allCategorieArticle(){
    this.categorieArticleService.all().subscribe(res=>{
      console.log(res)
      this.listCategorieArticle=res;
    },err=>{
      console.log(err)
    })
  }
  typesaisie=""
  selectTypeSaisie(event:any){

    this.typesaisie=event.target.value;
   
  }
  allFournisseur(){
    this.serviceFournisseur.all().subscribe(res=>{
      console.log(res)
      this.listFournisseur=res;
    },err=>{
      console.log(err)
    })
  }


  allArticle(){
    this.ArticleService.findAllVignete(this.currentPage, this.size).subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.listArticle=data.articles;
      this.totalPages=data.totalPages;
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
  allArticleKeyWord(keyWord:number){
    this.ArticleService.Keyword(this.currentPage, this.size,keyWord).subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.listArticle=data.articles;
      this.totalPages=data.totalPages;
    },err=>{
      console.log(err)
    })
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
    if(this.FormVignette.valid){
      console.log(this.article)
      this.ArticleService.save(this.article).subscribe(res=>{
        console.log(res);
        this.alert('success',"Gestion des Articles ", "Article a été bien enregistré ")
        this.close();
        this.article=new Article();
        this.FormVignette.reset();
        this.ngOnInit();
      },err=>{
        this.alert('error',"Gestion des Articles ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
        console.log(err)
      })
    }

    }
    UpdateArticle(value:Article){
        if(this.FormVignette.valid){
      this.ArticleService.update(value.id,value).subscribe(res=>{
        console.log(res)
        this.alert('success',"Gestion des articles", "article  a été bien modifier ");
        this.modalService.dismissAll();
        this.FormVignette.reset();
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

   async changeNumberSaisie(event:any){
    await  this.getFormVignettes().clear();
   console.log(event.target.value);
  console.log(this.FormVignette.value)
   for (let index = 0; index < event.target.value; index++) {
     this.newVignette(this.typesaisie);
  
   }
    }
   

  modalAjouterArticle(content:any){
    this.allCategorieArticle();
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
    //this.FormArticle.patchValue(data);
    this.selectedItems = [
      { id: data.categorieArticle.id, libelleFr:data.categorieArticle.libelleFr},
    ];
    this.allCategorieArticle();
   
    this.article=data;
    this.modalService.open(content, {
      size: "lg",
    });
  }



  close(){
    this.modalService.dismissAll();
  }
  onSubmit(value:any){
    console.log(value);
    if(value.vignettes.length!=0 && this.FormVignette.valid){
      this.ArticleService.saveVignette(value).subscribe(res=>{
        console.log(res);
        this.alert('success',"Gestion des Vignettes", "Vignette  a été bien enregistré ");
        this.FormVignette.reset();
        this.ngOnInit();
        this.close();
      },err=>{
          if(err.status===409){
            this.alert('warning',"Gestion des Vignette ", "code Bare  de vignette   déja existe ");
          }else{
        this.alert('error',"Gestion des Vignette  ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");

          }
     
        })
    }
 
  }
// event pagination 
pageCurrentChange(event :any){
  this.currentPage=event;

  console.log(this.currentPage, this.size)
  this.allArticle();
}
  sizeCurrentChange(event :any){
    this.size=event;
    console.log(this.currentPage, this.size)
    this.allArticle();
   }
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }
}
