import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Entree } from '../../../../core/_base/layout/models/entree';
import { EntreeArticleStock } from '../../../../core/_base/layout/models/entree-article-stock';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import * as _  from 'lodash'
import { Fournisseur } from '../../../../core/_base/layout/models/fournisseur';
import { ArticleStock } from '../../../../core/_base/layout/models/article-stock';
import { EntreeStockService } from '../../../../core/_base/layout/services/gestionStock/entree-stock.service';
import { FournisseursService } from '../../../../core/_base/layout/services/gestionStock/fournisseurs.service';
import { ArticleService } from '../../../../core/_base/layout/services/gestionStock/article.service';
import { ArticleStockService } from '../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { RefernceService } from '../../../../core/_base/layout/services/gestionStock/refernce.service';
import { MagasinService } from '../../../../core/_base/layout/services/gestionStock/magasin.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'kt-entree-stock',
  templateUrl: './entree-stock.component.html',
  styleUrls: ['./entree-stock.component.scss']
})
export class EntreeStockComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoading=true;
  datasize: number = 0;
  displayedColumns: string[] = [
		"id",
		"numMarche",
		"numeroMagasin",
		"codeAnalytique"
	];

 // listTransferts:Transfer[];
// fonctionnaire : FonctionnaireDTO = this.localStorege.retrieve("userInfo") as  FonctionnaireDTO ;
  actions: any = { canDetail: true ,canModify: true, canDelete:true ,canAdd: true,withAction:true}
  entree=new Entree();
  listMagasins:any[];
  listArticle:any[];
  saveArticleWithQTEList  :  EntreeArticleStock[] = [];
  articleDetail  :  EntreeArticleStock[] = [];
  entreeArticleUpdate:EntreeArticleStock[] = [];
  listFournisseur:Fournisseur[];
  listReference:any[]=[];
  dropdownSettingsFor= {};
  dropdownSettingsArt= {};
  currentPage=0;
  size=5;

  totalPages=1;
  listEntrees:any[];
  formEntree: FormGroup;
  formEntreeUpdate: FormGroup;
  articlesStocks:ArticleStock[]=[];
  constructor(
    private modalService: NgbModal,
    private entreeStockService:EntreeStockService,
    private fb:FormBuilder,
    private serviceFournisseur:FournisseursService,
    private ArticleService:ArticleService,
    private articleStockService:ArticleStockService,
    private refernceService:RefernceService,
    private translate:TranslateService,
    private dc :ChangeDetectorRef,
    private router:Router,
    private magasinService:MagasinService) {

 


  }
entreArticle:EntreeArticleStock=new EntreeArticleStock();
  ngOnInit() {
 //   console.log(this.fonctionnaire)
   this.allEntreeStock();
 //  this.formEntree.controls['codeAnalytique'].setValue(this.fonctionnaire.codeAnalytique)
   this.dropdownSettingsFor = {
    singleSelection: true,
    idField: 'id',
    textField: 'nom',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };
  this.dropdownSettingsArt= {
    singleSelection: true,
    idField: 'id',
    textField: 'numeroArticle',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };
  }

  articleStockArray() : FormArray {
    return this.formEntreeUpdate.get("entreeArticleSotck") as FormArray
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  newArticle() {
    let article= this.fb.group({
      id: new FormControl(),
      article: new FormGroup({
        id: new FormControl('',Validators.required),
      }),
      fournisseur: new FormGroup({
        id: new FormControl('')
      }),
      rayonnage: new FormControl('',Validators.required),
      quantite: new FormControl('',Validators.required),
      tva: new FormControl('',Validators.required),
      unite: new FormControl('',Validators.required),
      designation: new FormControl('',Validators.required),
      prixAchat: new FormControl('',Validators.required),
    })

    this.articleStockArray().push(article)

}
deleteArticle(index:number){
  this.articleStockArray().removeAt(index);
}
setEntreArticleStock(services:any[]): FormArray
  {
    const formArray = new FormArray([]);
    services.forEach(item => {
      console.log(item)
    let articlevalue=  { id: item.article.id, numeroArticle: item.article.numeroArticle}
      formArray.push(this.fb.group({
        id:item.id,
        article:new FormControl(articlevalue),
        rayonnage: item.rayonnage,
        quantite: item.quantite,
        tva: item.tva,
        unite: item.article.unite,
        designation: item.article.designation,
        prixAchat: item.prixAchat,
      }));
    });

    return formArray;
  }

  allEntreeStock(){
      this.entreeStockService.pageable(this.currentPage,this.size).subscribe(res=>{
        console.log(res)
        let data:any=res;
        //this.listFornisseurs=data.content;
        this.totalPages=data.totalPages;
        this.dataSource = new MatTableDataSource(data.content);
        this.isLoading = false;
        this.datasize = data.length;
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
  createEntree(value:any){
    console.log(value)

   if(this.formEntree.valid){
     this.entreArticle.entree=_.cloneDeep(value);
     this.entreArticle.quantite=_.cloneDeep(this.formEntree.get('quantite').value);
     this.entreArticle.rayonnage=_.cloneDeep(this.formEntree.get('rayonnage').value);
     this.entreArticle.tva=_.cloneDeep(this.formEntree.get('tva').value);
     this.entreArticle.prixAchat=_.cloneDeep(this.formEntree.get('prixAchat').value);
     this.saveArticleWithQTEList.push(_.cloneDeep(this.entreArticle));
     this.formEntree.patchValue({
      magasin:this.formEntree.controls['magasin'].value,
      codeAnalytique:this.formEntree.controls['codeAnalytique'].value,
      article: null,
      quantite : null,
      tva : null,
      rayonnage :  null,
      unite: "",
      designation:"",
      prixAchat:"",

     })
     console.log(this.saveArticleWithQTEList);
   this.formEntree.controls['magasin'].disable({ onlySelf: true });;
  //  this.formEntree.controls['codeAnalytique'].disable({ onlySelf: true });;
   //this.formEntree.controls['numMarche'].disable({ onlySelf: true });;
    this.formEntree.controls['reference'].disable({ onlySelf: true });;
      this.dc.detectChanges();
   /*   this.entreeStockService.save(value).subscribe(res=>{
        console.log(res)
        this.alert('success',"Gestion des entrées de stock ", "entrées de stock a été bien enregistré ")
        this.close();
        this.formEntree.reset();
        this.ngOnInit();
      },err=>{
        console.log(err);
        this.alert('error',"Gestion des Articles ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
      }) */
    }
  }
  updateEntree(value:any){
    console.log(value)

    }

  supprimerArticle(index : any) : void {
    this.saveArticleWithQTEList.splice(index ,1);
    if(this.saveArticleWithQTEList.length ==0 ){
      this.formEntree.controls['magasin'].enable()
      this.formEntree.controls['codeAnalytique'].enable();
      this.formEntree.controls['numMarche'].enable();
     this.dc.detectChanges();
   }
 }
 addNewArtcileStock(){
   this.entreeArticleUpdate.push(new EntreeArticleStock());
   console.log(this.entreeArticleUpdate)
 }
 selectFournisseur(event:any){
  console.log(event);
  this.entree.fournisseur=event;
  this.formEntree.get('fournisseur').patchValue(event);


}
allFournisseur(){
  this.serviceFournisseur.all().subscribe(res=>{
    console.log(res)
    this.listFournisseur=res;
  },err=>{
    console.log(err)
  })
}
allRefernce(){
  this.refernceService.all().subscribe((res:any[])=>{
    console.log(res)
    this.listReference=res;
  },err=>{
    console.log(err)
  })
}
 createEntreeWithAtcle(){
   console.log(this.saveArticleWithQTEList)
   this.entreeStockService.saveArticlewithQte(this.saveArticleWithQTEList).subscribe(res=>{
    this.alert('success',"Gestion des Entrées ", "entrée  a été bien enregistré ");
    this.saveArticleWithQTEList=[];
    this.formEntree.reset();
    this.formEntree.controls['magasin'].enable()
    this.formEntree.controls['codeAnalytique'].enable();
    this.formEntree.controls['numMarche'].enable();
    this.formEntree.controls['reference'].enable();
    this.close();
    this.ngOnInit();
   },err=>{
    this.alert('error',"Gestion des Entrées", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");

   })
 }
  SlectedMagasinLivereur(event:any){
    console.log(event.target.value);
    let id=event.target.value;
   // this.allArticleStockByMagasine(id);

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
  telechargeDoucument(id:any){
    console.log(id);
    this.entreeStockService.getBonReceptionById(id);/* .subscribe(res=>{
      console.log(res)
    },err=>{
      console.log(err)
    }) */
  }
  allArticle(){
    this.ArticleService.all1().subscribe(res=>{
      console.log(res)
      this.listArticle=res;
    },err=>{
      console.log(err)
    })
  }
  selectArtilce(event:any){
    console.log(event);
    let id=event.id;

    this.ArticleService.getById(id).subscribe(res=>{
      console.log(res)
      let  data=res;
      this.entreArticle.article=_.cloneDeep(data);
      this.formEntree.get("unite").setValue(data.unite);
      this.formEntree.get("designation").setValue(data.designation);
      this.formEntree.get("prixAchat").setValue(data.prix);
      this.formEntree.get("date").setValue(new Date());
      console.log(res);
    },err=>{
      console.log(err);
    })

  }
  selectArtilceFromArray(event:any,index:number){
    console.log(event);
        let id=event.id;
    this.ArticleService.getById(id).subscribe(res=>{

      let  data=res;
      this.entreArticle.article=_.cloneDeep(data);
      this.articleStockArray().at(index).get("unite").setValue(data.unite);
      this.articleStockArray().at(index).get("designation").setValue(data.designation);
    },err=>{
      console.log(err);
    })
  }
  ajouterArticle(value:any) : void {

    console.log(value)

  }


  modalAjouterEntree(content:any){
    this.allMagasins();
     this.allArticle();
    this.allFournisseur();
    this.allRefernce();
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailEntree(content:any,data:any){
    console.log(data);
    this.entree=data;
    this.entreeStockService.allArticleByEntree(data.id).subscribe(res=>{
      this.articleDetail=res;
      console.log(res)
    },err=>{
      console.log(err)
    })
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierEntree(content:any,data:any){

    this.allMagasins();
    this.allArticle();
   this.allFournisseur();
   this.allRefernce();
    this.entree=data;
    console.log(data);
    this.entreeStockService.allArticleByEntree(data.id).subscribe(res=>{
     this.entreeArticleUpdate=res;
     this.formEntreeUpdate.setControl('entreeArticleSotck', this.setEntreArticleStock(this.entreeArticleUpdate));
     //this.setEntreArticleStock(res);
      console.log(res)
    },err=>{
      console.log(err)
    })
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerEntree(data:any){
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
        this.entreeStockService.delete(data).subscribe(res=>{
          this.ngOnInit();
          Swal.fire({
            title: 'entrées de stock à été   supprimé avec succès !',
            icon: 'success',
          });
        },err=>{
          console.log(err)
        })

      }
    })
  }
  pageCurrentChange(event :any){
    this.currentPage=event;

    console.log(this.currentPage, this.size)
    this.allEntreeStock();
  }
    sizeCurrentChange(event :any){
      this.size=event;
      console.log(this.currentPage, this.size)
      this.allEntreeStock();
     }

  close(){
    this.modalService.dismissAll();
  }
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }
  addNow(){
    this.router.navigateByUrl("/stock/ajouter-entree-stock")
  }


}
