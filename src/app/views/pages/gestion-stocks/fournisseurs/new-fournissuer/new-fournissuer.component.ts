import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fournisseur } from '../../../../../core/_base/layout/models/fournisseur';
import { FournisseursService } from '../../../../../core/_base/layout/services/gestionStock/fournisseurs.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'kt-new-fournissuer',
  templateUrl: './new-fournissuer.component.html',
  styleUrls: ['./new-fournissuer.component.scss']
})
export class NewFournissuerComponent implements OnInit {

  FormFournisseur: FormGroup;
   fournisseur=new Fournisseur();
   listArticle:any[];
   inputSearch:number;
   currentPage=0;
   size=5;
   totalPages=1;
   actions: any = { canDetail: true ,canModify:true, canDelete:true ,canAdd:true,withAction:true}

  constructor(private modalService: NgbModal,
    private router :Router,
    private fournisseursService:FournisseursService) {
      this.FormFournisseur= new FormGroup({
        id: new FormControl(''),
        nom: new FormControl('',Validators.required),
       email: new FormControl(''),
       adresse: new FormControl('',Validators.required),
       telephone: new FormControl(''),
       siteWeb: new FormControl(''),
       ville: new FormControl('',Validators.required),
       province: new FormControl(''),
       codePostal: new FormControl(''),
       infoBancaire: new FormControl(''),
       tauxRemise: new FormControl(''),
      })

     }

  ngOnInit() {
  }

  createFournisseur(value:Fournisseur){

    console.log(value)
    if(this.FormFournisseur.valid){
      this.fournisseursService.save(value).subscribe(res=>{
        this.alert('success',"Gestion des fournisseurs ", "fournisseur a été bien enregistré ")
          
        this.FormFournisseur.reset();
        this.ngOnInit();
        console.log(res)
      },err=>{
        this.alert('error',"Gestion des fournisseurs ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
        console.log(err)
      })
    }
  }
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }
}
