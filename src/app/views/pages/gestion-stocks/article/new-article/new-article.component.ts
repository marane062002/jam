import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ArticleService } from '../../../../../core/_base/layout/services/gestionStock/article.service';
import { CategorieArticleService } from '../../../../../core/_base/layout/services/gestionStock/categorie-article.service';
@Component({
  selector: 'kt-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
  FormArticle: FormGroup;
  unites:any[];
  checkLang:String
  constructor(   private ArticleService:ArticleService, 
    private router: Router,private Translete:TranslateService,
    private categorieArticleService:CategorieArticleService) { 
      this.checkLang = window.localStorage.getItem("language");
    }

  ngOnInit() {
    this.FormArticle= new FormGroup({
 
      id: new FormControl('',),
       numeroArticle: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)] ),
       unite: new FormControl('',Validators.required),
       designation: new FormControl('',Validators.required),
       prix: new FormControl('',Validators.required),
       quantiteMin: new FormControl('',Validators.required), 
       longueur: new FormControl('',),
       largeur: new FormControl('',),
       profondeur: new FormControl('',),
       poid: new FormControl('',),
       datePeremption: new FormControl(''),
       categorieArticle: new FormGroup({
         id: new FormControl('')
        }),
    })
    this.allCategorieArticle();
  }

  createArticle(value:any){

    console.log(value)
    //if(this.FormArticle.valid){
      this.ArticleService.save(value).subscribe(res=>{
        console.log(res);
        this.alert('success',"Gestion des Articles ", "Article a été bien enregistré ")
        this.back();
        this.FormArticle.reset();
        this.ngOnInit();
      },err=>{
        this.alert('error',"Gestion des Articles ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
        console.log(err)
      })
  //  }

    }
    alert(icon:SweetAlertIcon, title:string, message:string){
      Swal.fire({
        icon: icon,
        title: title,
        text: message,
      })
    }
    
  allCategorieArticle(){
    this.categorieArticleService.all().subscribe(res=>{
      this.unites=res;

    },err=>{
      console.log(err)
    })}

    back(){
      this.router.navigateByUrl('/');
    }
}
