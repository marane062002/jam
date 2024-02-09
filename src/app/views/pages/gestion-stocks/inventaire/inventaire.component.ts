import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import _ from 'lodash';
import { ArticleStock } from '../../../../core/_base/layout/models/article-stock';
import { Inventaire } from '../../../../core/_base/layout/models/inventaire';
import { MAgasin } from '../../../../core/_base/layout/models/magasin';
import { Transfer } from '../../../../core/_base/layout/models/transfer';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { MagasinService } from '../../../../core/_base/layout/services/gestionStock/magasin.service';
import { ArticleStockService } from '../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { InventaireService } from '../../../../core/_base/layout/services/gestionStock/inventaire.service';


@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.scss']
})
export class InventaireComponent implements OnInit {

  headerData:any=[
    { name: "N° d'article", content: "article.numeroArticle" },
    { name: "Description", content: "article.designation" },
    { name: "Unité", content: "article.unite" },
    { name: "Q.TH", content: "quantiteStock" },
    { name: "Q.PH", content: "quantiteTh" },
    { name: "ECART", content: "ecart" },
  //  { name: "Observation", content: "observation" },
  ]
  dropdownSettingsMagasin = {};
  dropdownSettingsartilce= {};
  listArticles:ArticleStock[]=[];
  listMagasins:MAgasin[];
  InventaireForm:FormGroup;
  actions: any = { canDetail: true ,canModify: false ,canAdd: true,withAction:true}
  transfer=new Transfer();
  listArtickeStock:any[];
  currentPage=0;
  size=5;
    // filter article
    numArticle='';
  totalPages=1;
  constructor(private modalService: NgbModal,private magasinService:MagasinService,
    private articleStockService:ArticleStockService,
    private inventaireService:InventaireService) { 
      this.InventaireForm= new FormGroup({
        obsevations: new FormControl(''),
        quantitePh: new FormControl('',Validators.required),
        quaniteTh: new FormControl('',Validators.required),
        ecart: new FormControl('',Validators.required),
        magasin: new FormGroup({
         id: new FormControl('')
       }),
        article: new FormGroup({
        id: new FormControl('')
      })
    })
    }
 


  
  ngOnInit() {
    this.allMagasins();
    this.dropdownSettingsMagasin= {
      singleSelection: true,
      idField: 'id',
      textField: 'numeroMagasin',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
   /*  this.dropdownSettingsartilce= {
      singleSelection: true,
      idField: 'id',
      textField: 'article.numeroArticle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.listArticles=[
    ] */
  }
  searchArticle(event:any){
 console.log(event.target.value)
 this.listArticles=_.filter(this.listArticles, (a)=>{return a.article.numeroArticle.includes(this.numArticle)});
  }
  updateStock(article :ArticleStock){
    console.log(article)
    this.articleStockService.update(article.id, article).subscribe(res=>{
      console.log(res);
      this.alert('success',"Gestion des Inventaires  ", "article  a été modifié avec succés");
    },err=>{
      this.alert('error',"Gestion des Inventaires" , "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");

      console.log(err)
    })
  }
  selectMagasin(event:any){

    this.articleStockService.AllArticleStockByMagasin(event.id).subscribe(res=>{
      console.log(res);
    this.listArticles=res;
    },err=>{
      console.log(err)
    })

  }
  selectArticleStock(event:any){

    this.articleStockService.ArticleStockById(event.target.value).subscribe(res=>{
      console.log(res)
      this.InventaireForm.get('quantitePh').setValue(res.quantiteStock);
    },err=>{
      console.log(err)
    })
console.log(event)
  }
  CalculeEcart(event:any, article:ArticleStock){
  article.ecart=article.quantiteStock-event
    console.log(event)
    this.InventaireForm.get('ecart').setValue(this.InventaireForm.get('quantitePh').value-event);
  }
  selectArticle(event:any){
console.log(event)
  }
  

  allMagasins(){
    this.magasinService.all().subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.listMagasins=data;
    },err=>{
      console.log(err)
    })
  }createInventaire(value:Inventaire){
    console.log(value)
  }
  modalAjouterInventaire(content:any){
    this.allMagasins();
   // this.allArticle();
   // this.allFournisseur();
    this.modalService.open(content, {
      size: "lg",
    });
  }
  modalDetailInventaire(content:any,data:any){
    console.log(data)
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierInventaire(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerInventaire(data:any){

  }

  close(){
    this.modalService.dismissAll();
  }
  /* modalDetailInventaire(data:any){
    this.router.navigateByUrl('/home/gestion-stocks/detail-inventaire')
    this.modalService.open(content, {
      size: "lg",
    });
  } */
  pageCurrentChange(event :any){
    this.currentPage=event;
  
    console.log(this.currentPage, this.size)
  }
    sizeCurrentChange(event :any){
      this.size=event;
      console.log(this.currentPage, this.size)
      //this.allSorties();
     }
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }
}
