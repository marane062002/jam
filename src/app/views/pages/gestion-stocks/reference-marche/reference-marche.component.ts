import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reference } from '../../../../core/_base/layout/models/reference';
import { CategorieArticleService } from '../../../../core/_base/layout/services/gestionStock/categorie-article.service';
import { RefernceService } from '../../../../core/_base/layout/services/gestionStock/refernce.service';

import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-reference-marche',
  templateUrl: './reference-marche.component.html',
  styleUrls: ['./reference-marche.component.scss']
})
export class ReferenceMarcheComponent implements OnInit {

  headerData:any=[
    { name: "id", content: "id" },
    { name: "libelle", content: "libelle" }
    //{ name: "libelle", content: "libelle" },
  ]
  FormReference: FormGroup;
  liseRefernce:Reference[];
  reference=new Reference();
  currentPage=0;
  size=5;
  totalPages=1;
  inputSearch:number
  actions: any = { canDetail: true ,canModify:true ,canAdd:true,withAction:true,canDelete:true}
  
  constructor(private modalService: NgbModal, 
    private refernceService:RefernceService,
    private categorieArticleService:CategorieArticleService) {
      this.FormReference= new FormGroup({
        libelle: new FormControl('',Validators.required),
              id: new FormControl('')
    })
  }

  ngOnInit() {

    this.allQuantiteReapprovision();
   
  }


  allQuantiteReapprovision(){
    this.refernceService.all().subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.liseRefernce=data;
    
    //  this.totalPages=data.totalPages;
    },err=>{
      console.log(err)
    })
  }
  allEntityMagasisearch(keyWord:number){
    this.refernceService.Keyword(this.currentPage, this.size,keyWord).subscribe(res=>{
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
createEntityMagasin(value:Reference){
    if(this.FormReference.valid){
      this.refernceService.save(value).subscribe(res=>{
        console.log(res)
        this.alert('success',"Gestion des Référentiels", "Référentiel a été bien enregistré ");
        this.modalService.dismissAll();
        this.FormReference.reset();
        this.ngOnInit();
      },err=>{
         if(err.status===409){
          this.alert('warning',"Gestion des Référentiels", "libelle Référentiel  déja existe ");
        }else{ 

          this.alert('error',"Gestion des Référentiels", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
        }
        console.log(err)
      })
    }
  }

  updateQuantiteReapprovisionnement(value:Reference){
    if(this.FormReference.valid){
        this.reference.id=value.id;
        this.reference.libelle=value.libelle;
        console.log(this.reference)
      this.refernceService.update(value.id,value).subscribe(res=>{
        console.log(res)
        this.alert('success',"Gestion des Référentiels", "Référentiel  a été modifié avec succés");
        this.modalService.dismissAll();
        this.FormReference.reset();
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
  this.reference=data;
    console.log(data)
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierRefernce(content:any,data:any){

    this.FormReference.patchValue(data);
    console.log(data);
      this.modalService.open(content, {
        size: "lg",
      }); 
  }

  deleteRefernce(data:any){
    Swal.fire({
      title: ' ',
      text: "voulez-vous vraiment supprimer ce Référentiel ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Fermer'

    }).then((result) => {
      if (result.isConfirmed) {
        this.refernceService.delete(data).subscribe(res=>{
          this.ngOnInit();
          Swal.fire({
            title: 'Référentiel  supprimé avec succès !',
            icon: 'success',
          });
        },err=>{
          console.log(err)
        })
     
      }
    })

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
