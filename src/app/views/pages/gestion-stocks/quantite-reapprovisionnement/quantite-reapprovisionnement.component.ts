import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieArticle } from '../../../../core/_base/layout/models/categorie-article';
import { EntityMagasin } from '../../../../core/_base/layout/models/entity-magasin';
import { QuantiteReapprovisionnement } from '../../../../core/_base/layout/models/quantite-reapprovisionnement';
import { CategorieArticleService } from '../../../../core/_base/layout/services/gestionStock/categorie-article.service';
import { QuantiteReapprovisionnementService } from '../../../../core/_base/layout/services/gestionStock/quantite-reapprovisionnement.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-quantite-reapprovisionnement',
  templateUrl: './quantite-reapprovisionnement.component.html',
  styleUrls: ['./quantite-reapprovisionnement.component.scss']
})
export class QuantiteReapprovisionnementComponent implements OnInit {

  headerData:any=[
    { name: "id", content: "id" },
    { name: "Période de retation (mois)", content: "periode" }
    //{ name: "libelle", content: "libelle" },
  ]
  FormQuantiteReapprovisionnement: FormGroup;
  ListeReapprovinnement:QuantiteReapprovisionnement[];
  quantiteReapprovision=new QuantiteReapprovisionnement();
  currentPage=0;
  size=5;
  totalPages=1;
  inputSearch:number
  actions: any = { canDetail: true ,canModify:true ,canAdd:true,withAction:true}
  
  constructor(private modalService: NgbModal, 
    private quantiteReapprovisionnementService:QuantiteReapprovisionnementService,
    private categorieArticleService:CategorieArticleService) {
      this.FormQuantiteReapprovisionnement= new FormGroup({
        periode  : new FormControl('',Validators.required),
              id: new FormControl('')
    })
  }

  ngOnInit() {

    this.allQuantiteReapprovision();
   
  }


  allQuantiteReapprovision(){
    this.quantiteReapprovisionnementService.all().subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.ListeReapprovinnement=data;
      if(this.ListeReapprovinnement.length!=0){
        this.actions.canAdd=false;
      }
    //  this.totalPages=data.totalPages;
    },err=>{
      console.log(err)
    })
  }
  allEntityMagasisearch(keyWord:number){
    this.quantiteReapprovisionnementService.Keyword(this.currentPage, this.size,keyWord).subscribe(res=>{
    console.log(res)
   // let data:any=ListeReapprovinnement=data.Content;
   // this.totalPages=data.totalPages;
  },err=>{
    console.log(err)
  })
}
searchBykeyWord(event:any){
  this.allEntityMagasisearch(this.inputSearch);
  console.log(this.inputSearch)
}
createEntityMagasin(value:QuantiteReapprovisionnement){
    if(this.FormQuantiteReapprovisionnement.valid){
      this.quantiteReapprovisionnementService.save(value).subscribe(res=>{
        console.log(res)
        this.alert('success',"Gestion des périodes de rotation", "période de rotation a été bien enregistré ");
        this.modalService.dismissAll();
        this.FormQuantiteReapprovisionnement.reset();
        this.ngOnInit();
      },err=>{
       /*  if(err.status===409){
          this.alert('warning',"Gestion des entitées de magasin", "libelle entitée de magasin  déja existe ");
        }else{ */

          this.alert('error',"Gestion des périodes de rotation", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
     //   }
        console.log(err)
      })
    }
  }

  updateQuantiteReapprovisionnement(value:QuantiteReapprovisionnement){
    if(this.FormQuantiteReapprovisionnement.valid){
        this.quantiteReapprovision.id=value.id;
        this.quantiteReapprovision.periode=value.periode;
        console.log(this.quantiteReapprovision)
      this.quantiteReapprovisionnementService.update(value.id,value).subscribe(res=>{
        console.log(res)
        this.alert('success',"Gestion des périodes de rotation ", "périodes de rotation  a été modifié avec succés");
        this.modalService.dismissAll();
        this.FormQuantiteReapprovisionnement.reset();
        this.ngOnInit();
      },err=>{
      /*   if(err.status===409){
          this.alert('warning',"Gestion des entitées de magasin", "libelle entitée de magasin  déja existe ");
        }else{ */

          this.alert('error',"Gestion des quantites de Réapprovisionnement", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
     //   }
        console.log(err)
      })
    }
    console.log(value)
  }
  modalAjouterEntityMagasin(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailFournisseur(content:any,data:any){
  this.quantiteReapprovision=data;
    console.log(data)
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierFournisseur(content:any,data:any){

    this.FormQuantiteReapprovisionnement.patchValue(data);
    console.log(data);
      this.modalService.open(content, {
        size: "lg",
      }); 
  }

  supprimerFournisseur(data:any){

  }

  close(){
    this.modalService.dismissAll();
  }
  // event pagination 
pageCurrentChange(event :any){
  this.currentPage=event;

  console.log(this.currentPage, this.size)
  this.allQuantiteReapprovision();
}
  sizeCurrentChange(event :any){
    this.size=event;
    console.log(this.currentPage, this.size)
    this.allQuantiteReapprovision();
   }
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }

}
