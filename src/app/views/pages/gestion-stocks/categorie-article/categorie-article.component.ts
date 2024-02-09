import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieArticle } from '../../../../core/_base/layout/models/categorie-article';
import { CategorieArticleService } from '../../../../core/_base/layout/services/gestionStock/categorie-article.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-categorie-article',
  templateUrl: './categorie-article.component.html',
  styleUrls: ['./categorie-article.component.scss']
})
export class CategorieArticleComponent implements OnInit {
  displayedColumns: string[] = [
		"numero",
		"libelleFr",
		"libelleAr",
		"actions"
	];
  isLoading=true;
  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  datasize: number = 0;
   categorieArticle: FormGroup;
  listCategorieArticle:CategorieArticle[];
  categorieArticl=new CategorieArticle();
  currentPage=0;
  size=5;
  totalPages=1;
  inputSearch:string
  actions: any = { canDetail: true ,canModify:true ,canAdd:true,withAction:true,canDelete:true}
  
  constructor(private modalService: NgbModal, private router:Router,private translate:TranslateService,
    private categorieArticleService:CategorieArticleService) {
      this.categorieArticle= new FormGroup({
              id: new FormControl(''),
              libelleFr: new FormControl('',Validators.required),
              libelleAr: new FormControl('',Validators.required),
              numero: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(3)] )
    })
  }

  ngOnInit() {

    this.allCategorieArticle();
   
  }


  allCategorieArticle(){
    this.categorieArticleService.pageable(this.currentPage, this.size).subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.listCategorieArticle=data.Content;
      this.totalPages=data.totalPages;
      this.datasize = data.Content.length
      this.dataSource = new MatTableDataSource(this.listCategorieArticle);
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
  allArticleKeyWord(keyWord:string){
    this.categorieArticleService.Keyword(this.currentPage, this.size,keyWord).subscribe(res=>{
    console.log(res)
    let data:any=res;
    this.listCategorieArticle=data.Content;
    this.totalPages=data.totalPages;
  },err=>{
    console.log(err)
  })
}
searchBykeyWord(event:any){
  if(this.inputSearch==null || this.inputSearch==""){
this.ngOnInit();
  }else
  this.allArticleKeyWord(this.inputSearch);
  console.log(this.inputSearch)
}
  createCatArticle(value:CategorieArticle){
    if(this.categorieArticle.valid){
      this.categorieArticleService.save(value).subscribe(res=>{
        console.log(res)
        this.alert('success',"Gestion des Categories des  Articles ", "Catégorie d'article  a été bien enregistré ");
        this.modalService.dismissAll();
        this.categorieArticle.reset();
        this.ngOnInit();
      },err=>{
        if(err.status===409){
          this.alert('warning',"Gestion des Categories des  Articles ", "Numéro Catégorie d'article  déja existe ");
        }else{
        this.alert('error',"Gestion des Categories des  Articles  ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
        console.log(err)
       } })
    }
  }
  updateCategorieArticle(value:CategorieArticle){
    if(this.categorieArticle.valid){
      this.categorieArticleService.update(value.id,value).subscribe(res=>{
        console.log(res)
        this.alert('success',"Gestion des Categories des  Articles ", "Catégorie d'article  a été bien enregistré ");
        this.modalService.dismissAll();
        this.categorieArticle.reset();
        this.ngOnInit();
      },err=>{
        if(err.status===409){
          this.alert('warning',"Gestion des Categories des  Articles ", "Numéro Catégorie d'article  déja existe ");
        }else{
        this.alert('error',"Gestion des Categories des  Articles  ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
        console.log(err)
       } })
    }
  }
   supprimerCategorieArticle(data:any){
      Swal.fire({
        title: ' ',
        text: "voulez-vous vraiment supprimer cette catégorie d'article ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Fermer'
  
      }).then((result) => {
        if (result.isConfirmed) {
          this.categorieArticleService.delete(data).subscribe(res=>{
            this.ngOnInit();
            Swal.fire({
              title: "catégorie d'article  supprimé avec succès !",
              icon: 'success',
            });
          },err=>{
            console.log(err)
          })
       
        }
      })
  
    }
  modalAjoutercatArticle(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailFournisseur(content:any,data:any){
  this.categorieArticl=data;
    console.log(data)
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierCategorieArticle(content:any,data:any){ 
    this.categorieArticle.patchValue(data);
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

  console.log(this.currentPage, this.size)
  this.allCategorieArticle();
}
  sizeCurrentChange(event :any){
    this.size=event;
    console.log(this.currentPage, this.size)
    this.allCategorieArticle();
   }
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }
  addNow(){
    this.router.navigateByUrl("/gestionStock/new-categorie-article");
  } 

}



