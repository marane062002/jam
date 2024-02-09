import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../../../../core/_base/layout/services/transfer.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TransferArticleStock } from '../../../../core/_base/layout/models/transfer-article-stock';
import { Transfer } from '../../../../core/_base/layout/models/transfer';
import { ArticleService } from '../../../../core/_base/layout/services/gestionStock/article.service';
import { ArticleStockService } from '../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { MagasinService } from '../../../../core/_base/layout/services/gestionStock/magasin.service';


@Component({
  selector: 'app-transferts',
  templateUrl: './transferts.component.html',
  styleUrls: ['./transferts.component.scss']
})
export class TransfertsComponent implements OnInit {

  headerData:any=[
    { name: "N° Magasin livreur", content: "magasindestination.numeroMagasin"},
    { name: "N° Magasin destination", content: "magasinlivreur.numeroMagasin" },
    { name: "Date de transfert", content: "dateTransfet", pipe:"date: 'YYYY-MM-dd'" },
    { name: "Observations", content: "observation" }
  ]

  listTransferts:Transfer[];
  saveArticleWithQTEList:TransferArticleStock[]=[];
  listDetailTransfer:TransferArticleStock[]=[];
  actions: any = { canDetail: true ,canModify: false , canDelete:true,canAdd: true,withAction:true}
  transfer=new Transfer();
  listMagasins:any[];
  listMagasinDestination:any[];
   listArtickeStock:any[];
   currentPage=0;
   size=5;
   totalPages=1;
  formTransfer:FormGroup;
  quanitemin=0;
  
  constructor(private modalService: NgbModal,
    private fb:FormBuilder,
    private transferService:TransferService,
    private ArticleService:ArticleService,
    private articleStockService:ArticleStockService,
    private magasinService:MagasinService) {
      this.formTransfer= new FormGroup({
        magasinlivreur: new FormGroup({
          id: new FormControl('',Validators.required),
          numeroMagasin: new FormControl(''),
        }),
        magasindestination: new FormGroup({
          id: new FormControl('',Validators.required),
          numeroMagasin: new FormControl(''),
        }),
        article: new FormGroup({
          id: new FormControl('',Validators.required),
        }),
      //  numeroTransfert: new FormControl(this.transfer.numeroTransfert,Validators.required),
        disignation: new FormControl(''),
      //  unite: new FormControl('',Validators.required),
        rayannage: new FormControl('',Validators.required),
        quantite: new FormControl('',Validators.required),
        observation: new FormControl(''),
        dateTransfet: new FormControl('',Validators.required)
      })
     }
  
  ngOnInit() {

    
    this.allTransfer();
   
  }


  allTransfer(){
    this.transferService.pageable(this.currentPage, this.size).subscribe(res=>{
      console.log(res);
      let data:any=res;
      this.listTransferts=data.Content;
      this.totalPages=data.totalPages;
    },err=>{
      console.log(err)
    })
  }
  SlectedMagasinLivereur(event:any){
    console.log(event.target.value);
    let id=event.target.value;

    this.listMagasinDestination=this.listMagasins.filter(m=>m.id!=id)
    this.allArticleStockByMagasine(id);
    
  }
  selectArtilce(event:any){
    console.log(event.target.value);
    let id=event.target.value;

    this.listArtickeStock.forEach(article => {
      if(article.article.id == id) {
        console.log(article)
        this.quanitemin=article.quantiteStock;
      }
    })
    this.ArticleService.getById(id).subscribe(res=>{
      let  data=res;
      this.formTransfer.get("unite").setValue(data.unite);
      this.formTransfer.get("disignation").setValue(data.designation);
      console.log(res);
    },err=>{
      console.log(err);
    })

  }
  checkQuanititeMin(event:any){
    console.log(event.target.value);
    if(this.quanitemin!=0 && this.quanitemin<event.target.value){
          
  Swal.fire(
    ' ',
    'Quantité disponible sur le stock est :'+ this.quanitemin,
    'warning'
  )
      this.formTransfer.controls['quantite'].setValue(this.quanitemin);
    }
    
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
  saveArticleTransfer(){
    this.transferService.save(this.saveArticleWithQTEList).subscribe(res=>{
      console.log(res);   
      console.log(res);
      this.alert('success',"Gestion des Transfer ", "Transfer a été bien enregistré ");
      this.formTransfer.reset();
      this.close();
      this.ngOnInit();
    },err=>{
      this.alert('error',"Gestion des Articles ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
      console.log(err);
    })
  }
  supprimerArticle(index : any) : void {
    this.saveArticleWithQTEList.splice(index ,1);
    if(this.saveArticleWithQTEList.length ==0 ){
 /*      this.formTransfer.controls['magasin'].enable()
      this.formTransfer.controls['codeAnalytique'].enable();
      this.formTransfer.controls['numMarche'].enable(); */
     //this.dc.detectChanges();
   }
 }
  createTransfert(value:any){
    let transferArticleStock =new TransferArticleStock();
 
  transferArticleStock.transfer=value;
  /* transferArticleStock.article=this.formTransfer.get('article').value;
  transferArticleStock.quantite=this.formTransfer.get('quantite').value;
  transferArticleStock.rayonnage=this.formTransfer.get('rayannage').value; */
  this.saveArticleWithQTEList.push(transferArticleStock);

  console.log(this.saveArticleWithQTEList)
   /*  */
    console.log(value)
  }
  supprimerTransfert(data:any){
    Swal.fire({
      title: ' ',
      text: "voulez-vous vraiment supprimer ce  Transfert de stock  ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Fermer'
  
    }).then((result) => {
       if (result.isConfirmed) {
        this.transferService.delete(data).subscribe(res=>{
          this.ngOnInit();
          Swal.fire({
            title: 'Transfert de stock à été   supprimé avec succès !',
            icon: 'success',
          });
        },err=>{
          console.log(err)
        })
     
      } 
    })
  }



  allArticleStockByMagasine(id:number){
    this.articleStockService.AllArticleStockByMagasin(id).subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.listArtickeStock=data;
    },err=>{
      console.log(err)
    })
  }
  modalAjouterTransfert(content:any){
    this.allMagasins();
    this.modalService.open(content, {
      size: "lg",
    });
  }
  telechargeDoucument(id:number){
    this.transferService.getBonById(id);
    this.close();
    this.ngOnInit();
  
  }
  modalDetailTransfert(content:any,data:any){

    console.log(data)
    this.transfer=data;
    this.transferService.findArticlestock(data.id).subscribe(res=>{
      console.log(res)
      this.listDetailTransfer=res;
    },err=>{
      console.log(err)
    })
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierTransfert(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
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
}
