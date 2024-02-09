import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Article } from '../../../../../core/_base/layout/models/article';
import { CategorieArticle } from '../../../../../core/_base/layout/models/categorie-article';
import { Fournisseur } from '../../../../../core/_base/layout/models/fournisseur';
import { MAgasin } from '../../../../../core/_base/layout/models/magasin';
import { ArticleService } from '../../../../../core/_base/layout/services/gestionStock/article.service';
import { CategorieArticleService } from '../../../../../core/_base/layout/services/gestionStock/categorie-article.service';
import { FournisseursService } from '../../../../../core/_base/layout/services/gestionStock/fournisseurs.service';
import { MagasinService } from '../../../../../core/_base/layout/services/gestionStock/magasin.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'kt-new-vigette',
  templateUrl: './new-vigette.component.html',
  styleUrls: ['./new-vigette.component.scss']
})
export class NewVigetteComponent implements OnInit {

  listCategorieArticle:CategorieArticle[];
  FormVignette: FormGroup;
   article=new Article();
   listMagasins:MAgasin[];
 
  constructor(
    private   router:Router,
    private articleService:ArticleService, 
    private fb:FormBuilder,
    private  magasinService:MagasinService,
    ) {
     this.FormVignette= new FormGroup({
      magasin: new FormControl('',Validators.required),
      rayonnage: new FormControl('',Validators.required),
       type: new FormControl('',Validators.required),
       numberSaisie: new FormControl('',Validators.required),
       vignettes: new FormArray([])
    }) 
  }

  ngOnInit() {
   this.allMagasins();
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
  getFormVignettes() : FormArray {
    return this.FormVignette.get("vignettes") as FormArray
  }
  newVignette(type:string) {
    console.log(type)
     if(type=="v"){
      let v= this.fb.group({
        first: new FormControl("",[Validators.required,Validators.minLength(16), Validators.maxLength(16),Validators.pattern("^C[0-9]{7}[A-Z]{2}[0-9]{6}$")]),
        latest:  new FormControl("",[Validators.required,Validators.minLength(16), Validators.maxLength(16),Validators.pattern("^C[0-9]{7}[A-Z]{2}[0-9]{6}$")]),
      })
      this.getFormVignettes().push(v);
    }else{ 
      let v= this.fb.group({
        first: new FormControl("",[Validators.required,Validators.minLength(16), Validators.maxLength(16),Validators.pattern("^C[0-9]{7}[A-Z]{2}[0-9]{6}$")]),
        latest:  new FormControl(""),
     
      })
      this.getFormVignettes().push(v);
   }
   
    
    
}
onSubmit(value:any){
  console.log(value);
  if(value.vignettes.length!=0 && this.FormVignette.valid){
    this.articleService.saveVignette(value).subscribe(res=>{
      console.log(res);
      this.alert('success',"Gestion des Vignettes", "Vignette  a été bien enregistré ");
      this.FormVignette.reset();
      this.ngOnInit();
     // this.close();
    },err=>{
        if(err.status===409){
          this.alert('warning',"Gestion des Vignette ", "code Bare  de vignette   déja existe ");
        }else{
      this.alert('error',"Gestion des Vignette  ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");

        }
   
      })
  }

}
typesaisie=""
selectTypeSaisie(event:any){
   console.log(event)
  this.typesaisie=event.value;
 
}
async changeNumberSaisie(event:any){
  await  this.getFormVignettes().clear();
 console.log(event.target.value);
console.log(this.FormVignette.value)
 for (let index = 0; index < event.target.value; index++) {
   this.newVignette(this.typesaisie);

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
