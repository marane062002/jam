import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Reintegration } from '../../../../core/_base/layout/models/reintegration';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from '../../../../core/_base/layout/models/article';
import { ThrowStmt } from '@angular/compiler';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Sortie } from '../../../../core/_base/layout/models/sortie';
import { ILigneDemandeFournistureDTO } from '../../../../core/_base/layout/models/LigneDemandeFournistureDTO';
import { ReintegrationArticleStock } from '../../../../core/_base/layout/models/reintegration-article-stock';

import { SortieService } from '../../../../core/_base/layout/services/gestionStock/sortie.service';
import { LigneDemandeFournitureService } from '../../../../core/_base/layout/services/gestionStock/ligne-demande-fourniture.service';
import { ArticleService } from '../../../../core/_base/layout/services/gestionStock/article.service';
import { MagasinService } from '../../../../core/_base/layout/services/gestionStock/magasin.service';
import { ReintegrationService } from '../../../../core/_base/layout/services/gestionStock/reintegration.service';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'kt-reinetgration-stock',
  templateUrl: './reinetgration-stock.component.html',
  styleUrls: ['./reinetgration-stock.component.scss']
})
export class ReinetgrationStockComponent implements OnInit {

  datasize = 0
	isLoading2 = true;
  displayedColumns: string[] = [
		
		"numeroMagasin",
		"numeroDemande",
		"codeAnalytique",
		"date",
		"actions",
	];

  listReintegration:Reintegration[];
  saveArticleWithQTEList:ReintegrationArticleStock[]=[];
  listDetailReintegration:ReintegrationArticleStock[]=[];
  actions: any = { canDetail: true ,canModify: false , canDelete:true,canAdd: true,withAction:true}
  reintergation=new Reintegration();
  listMagasins:any[];
  listSorties:Sortie[];
  listArtickeStock:any[];
  listArticle:Article[];
  listCommande:Sortie[];
  listDemandesFourniture:ILigneDemandeFournistureDTO[];
  currentPage=0;
  size=5;
  totalPages=1;
  formReintegration:FormGroup;
  quanitieLivre:any=0;

  constructor(private modalService: NgbModal,
    private sortieService:SortieService,
  //  private localStorege:LocalStorageService,
    private demandeFournitureService:LigneDemandeFournitureService,
    private ArticleService:ArticleService,
    private dc :ChangeDetectorRef,
    private magasinService:MagasinService,
  private  reintegrationService:ReintegrationService) { 
    this.formReintegration= new FormGroup({
      magasin: new FormGroup({
        id: new FormControl('',Validators.required),
      }),
      article: new FormGroup({
        id: new FormControl('',Validators.required),
      }),
      sortie: new FormGroup({
        id: new FormControl('',Validators.required),
      }),
      codeAnalytique: new FormControl('',Validators.required),
        designation: new FormControl(''),
     //etat: new FormControl('',Validators.required),
     // rayannage: new FormControl('',Validators.required),
      quantite: new FormControl('',Validators.required),
      date: new FormControl('')
   
   })
  }

  ngOnInit() {
 
    this.allReintegration();
   
  }
  allReintegration(){
    this.reintegrationService.pageable(this.currentPage, this.size).subscribe(res=>{
      let data:any=res;
  
    this.listReintegration=data.content;
        this.totalPages=data.totalPages;

        this.isLoading2 = false
    },err=>{
      console.log(err)
    })
  }
  aLLCommande(){
    this.sortieService.all().subscribe(res=>{
      this.listCommande=res;
      console.log(res)
    },err=>{
      console.log(err)
    })
  }
  
  selectCommande(event:any){
    console.log(event.target.value)
    let id=event.target.value;
    this.demandeFournitureService.getLigneDemandeFournitureByIdDemande(id).subscribe(res=>{

      console.log(res)
      this.listDemandesFourniture = res.body;
      //this.formReintegration.controls['magasin'].disable({ onlySelf: true });;
      this.formReintegration.controls['magasin'].patchValue( this.listDemandesFourniture[0].magasin);
   
    //  this.formReintegration.controls['sortie'].patchValue( this.listDemandesFourniture[0].sortie);
    },err=>{
      console.log(err)
    })

  }
  selectArticle(event:any){
    
    let id=event.target.value;
    
   this.ArticleService.findAllByids(id).subscribe((res)=>{
    console.log(res)
    this.quanitieLivre = res
    
   },(err)=>{
    console.log(err)
   });

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
  telechargeDoucument(id:number){
    this.reintegrationService.getBonById(id);
   // this.close();
  //  this.ngOnInit();
  }

  allArticle(){
    this.ArticleService.all1().subscribe(res=>{
      console.log(res)
      this.listArticle=res;
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


  dataSource:any
  allSorties(){
    this.sortieService.all().subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.dataSource = new MatTableDataSource(data.content);
      this.listSorties=data;
      this.totalPages=data.totalPages;
      this.isLoading2 = false
    },err=>{
      console.log(err)
      this.isLoading2 = false
    })
  }

  
  createTransfert(value:any){
    let transferArticleStock =new ReintegrationArticleStock();
 
  transferArticleStock.reintegration=value;
  transferArticleStock.article=this.formReintegration.get('article').value;
  transferArticleStock.quantite=this.formReintegration.get('quantite').value;
  transferArticleStock.rayonnage=this.formReintegration.get('rayonnage').value;
  this.saveArticleWithQTEList.push(transferArticleStock);
  console.log(this.saveArticleWithQTEList)
   /*  */
    console.log(value)
  }
  createReintegration(){
  this.reintegrationService.save(this.saveArticleWithQTEList).subscribe(res=>{
    this.formReintegration.reset();
    this.close();
    this.ngOnInit();
    this.alert('success',"Gestion des Réintégration  ", "Réintégration a été bien enregistré ");
    console.log(res)
  },err=>{
    this.alert('error',"Gestion des Réintégration  ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
    console.log(err)
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

  modalAjouterReintegration(content:any){
    this.allArticle();
    this.allMagasins();
    this.aLLCommande();
    this.allSorties();
  //  this.formReintegration.controls['codeAnalytique'].setValue(this.fonctionnaire.codeAnalytique)
  //  this.formReintegration.controls['codeAnalytique'].disable();
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailReintegration(content:any,data:any){
    console.log(data);
    this.reintergation=data
    this.reintegrationService.findArticlestock(data.id).subscribe(res=>{
      console.log(res)
      this.listDetailReintegration=res;
    },err=>{
      console.log(err)
    })
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierReintegration(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerReintegration(data:any){
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
        this.reintegrationService.delete(data).subscribe(res=>{
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
    this.allReintegration();
  }
    sizeCurrentChange(event :any){
      this.size=event;
      console.log(this.currentPage, this.size)
      this.allReintegration();
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
