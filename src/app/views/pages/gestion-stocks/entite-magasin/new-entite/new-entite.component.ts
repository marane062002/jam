import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntityMagasin } from './../../../../../core/_base/layout/models/entity-magasin';
import { CategorieArticleService } from './../../../../../core/_base/layout/services/gestionStock/categorie-article.service';
import { EntityMagasinService } from './../../../../../core/_base/layout/services/gestionStock/entity-magasin.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'kt-new-entite',
  templateUrl: './new-entite.component.html',
  styleUrls: ['./new-entite.component.scss']
})
export class NewEntiteComponent implements OnInit {
  entityMagasinForm: FormGroup;
  constructor(
    private entityMagasinService:EntityMagasinService,
    private router:Router,
    private categorieArticleService:CategorieArticleService) { 
    this.entityMagasinForm= new FormGroup({
      libelle: new FormControl('',Validators.required),
      id: new FormControl('')
})
  }

  ngOnInit() {
  }
  createEntityMagasin(value:EntityMagasin){
    if(this.entityMagasinForm.valid){
      this.entityMagasinService.save(value).subscribe(res=>{
        console.log(res)
        this.alert('success',"Gestion des organismes", "organisme a été bien enregistré ");

        this.entityMagasinForm.reset();
        this.ngOnInit();
      },err=>{
        if(err.status===409){
          this.alert('warning',"Gestion des organismes", "libelle organisme  déja existe ");
        }else{

          this.alert('error',"Gestion des organismes", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
        }
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
