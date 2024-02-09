import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

 import  *  as _ from  "lodash";
import { MatSelect, MatSelectChange } from '@angular/material/select';
import Swal, { SweetAlertIcon } from 'sweetalert2';

import { ArticleService } from './../../../../core/_base/layout/services/gestionStock/article.service';
import { ArticleStockService } from './../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { EntityMagasinService } from './../../../../core/_base/layout/services/gestionStock/entity-magasin.service';
import { MagasinService } from './../../../../core/_base/layout/services/gestionStock/magasin.service';
import { Router } from '@angular/router';
import { EntityMagasin } from './../../../../core/_base/layout/models/entity-magasin';

@Component({
  selector: 'kt-add-magasin',
  templateUrl: './add-magasin.component.html',
  styleUrls: ['./add-magasin.component.scss']
})
export class AddMagasinComponent implements OnInit {
  formMagasin:FormGroup;
  listEntiryMagasin:EntityMagasin[];
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private entityMagasinService:EntityMagasinService,
    private magasinService:MagasinService) { 
   this.formMagasin = new FormGroup({
    id: new FormControl(''),
    actif: new FormControl('true'),
      adresse: new FormControl('',Validators.required),
      ville: new FormControl('',Validators.required),
      numeroMagasin: new FormControl('',Validators.required),
      entityMagasin: new FormGroup({
        id: new FormControl('',Validators.required),
      }),
})


 }

  ngOnInit() {
    this.allEntityMagasin();
  }
  allEntityMagasin(){
    this.entityMagasinService.all().subscribe(res=>{
      console.log(res)
      this.listEntiryMagasin=res;
    },err=>{
      console.log(err)
    })
  }
  createMagasin(value:any){
    
    this.magasinService.save(value).subscribe(res=>{
      
      console.log(res)
      this.alert('success',"Gestion des Magasins", "Magasin a été bien enregistré ")
      this.formMagasin.reset();
      this.ngOnInit();
    },err=>{
      console.log(err.status);
      if(err.status===409){
        this.alert('warning',"Gestion des Magasins  ", "Numéro magasin déja existe ");
      }else{

        this.alert('error',"Gestion des Magasins  ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
      }
      console.log(err)
    })
  }
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }
  public objectComparisonFunction = function(option, value) : boolean {
    return option.id === value.id;
  }

}
