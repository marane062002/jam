import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { CategorieArticle } from '../../../../core/_base/layout/models/categorie-article';
import { CategorieArticleService } from '../../../../core/_base/layout/services/gestionStock/categorie-article.service';

@Component({
  selector: 'kt-add-categore-article',
  templateUrl: './add-categore-article.component.html',
  styleUrls: ['./add-categore-article.component.scss']
})
export class AddCategoreArticleComponent implements OnInit {

  categorieArticle: FormGroup;
  constructor(private router:Router,
    private categorieArticleService:CategorieArticleService) {
    this.categorieArticle= new FormGroup({
      id: new FormControl(''),
      libelleFr: new FormControl('',Validators.required),
      libelleAr: new FormControl('',Validators.required),
      numero: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(3)] )
})
  }

  ngOnInit() {
  }
  createCatArticle(value:CategorieArticle){
    if(this.categorieArticle.valid){
      this.categorieArticleService.save(value).subscribe(res=>{
        console.log(res)
        this.alert('success',"Gestion des Categories des  Articles ", "Catégorie d'article  a été bien enregistré ");
        this.categorieArticle.reset();
        this.ngOnInit();
      },err=>{
        if(err.status===409){
          this.alert('warning',"Gestion des Categories des  Articles ", "Numéro Catégorie d'article  déja existe ");
        }else{
        this.alert('error',"Gestion des Categories des  Articles  ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
        console.log(err)
       } })
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
