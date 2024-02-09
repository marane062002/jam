import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ArticleService } from '../../../../core/_base/layout/services/gestionStock/article.service';
import { CategorieArticleService } from '../../../../core/_base/layout/services/gestionStock/categorie-article.service';
import { CategorieArticle } from '../../../../core/_base/layout/models/categorie-article';
import { Article } from '../../../../core/_base/layout/models/article';

@Component({
  selector: 'kt-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  listCategorieArticle:CategorieArticle[];
  FormArticle: FormGroup;
  unites:any[];
  article=new Article();
  checkLang:String
  constructor(   private ArticleService:ArticleService, 
    private router: Router,private Translete:TranslateService,
    private categorieArticleService:CategorieArticleService) { 
      this.checkLang = window.localStorage.getItem("language");
    }

  ngOnInit() {
    this.FormArticle= new FormGroup({
 
      id: new FormControl('',),
       numeroArticle: new FormControl({ value: '', disabled: 'true' },[Validators.required,Validators.minLength(8),Validators.maxLength(8)] ),
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

  ajouter(){
    console.log(this.FormArticle.value)
    //if(this.FormArticle.valid){
      this.ArticleService.save(this.FormArticle.value).subscribe(res=>{
        console.log(res);
        this.alert('success',"Gestion des Articles ", "Article a été bien enregistré ")
        this.back();
        this.FormArticle.reset();
        this.ngOnInit();
      },err=>{
        this.alert('error',"Gestion des Articles ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
        console.log(err)
      })
  }


  selectedCatArticle(event:any){
      console.log(event)
     let id=event;
     let cat:CategorieArticle=this.unites.find(c=>c.id== event) || new CategorieArticle();
      this.article.categorieArticle=cat;
      this.ArticleService.getByCategorieArticle(id).subscribe(res=>{
       console.log(res)
       let num=res;
       console.log(num)
       if(null==0 || num==null){
        this.FormArticle.get("numeroArticle").setValue(cat.numero+'00001');
        this.FormArticle.get("id").setValue(cat.id);
       }else{ 
        var lastFive = num.substr(num.length - 5)
        var number=String((Number(lastFive)+1));
        //00000
        var StringComplet="";
        for (let index = 0; index < 5-number.length; index++) {
          StringComplet+="0";
        }
    
        this.FormArticle.get("numeroArticle").setValue( cat.numero+StringComplet+number);
        this.FormArticle.get("id").setValue(cat.id);
       }
     },err=>{
      this.FormArticle.get("numeroArticle").setValue(cat.numero+'00001');
        this.FormArticle.get("id").setValue(cat.id);
       console.log(err)
     })
      }
      
      select(event:any){
        console.log(event)
      }


  createArticle(value:any){
    console.log(value)
    //if(this.FormArticle.valid){
      this.FormArticle.value.id =""
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
      let data = res
      this.unites= data.Content ;


    },err=>{
      console.log(err)
    })}

    back(){
      this.router.navigateByUrl('stock/list-article');
    }

}
