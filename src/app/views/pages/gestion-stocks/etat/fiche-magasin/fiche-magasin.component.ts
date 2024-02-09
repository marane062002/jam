import { Component, OnInit } from '@angular/core';
import { CategorieArticle } from '../../../../../core/_base/layout/models/categorie-article';
import { ArticleStockService } from '../../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { ArticleService } from '../../../../../core/_base/layout/services/gestionStock/article.service';
import { CategorieArticleService } from '../../../../../core/_base/layout/services/gestionStock/categorie-article.service';
import { MagasinService } from '../../../../../core/_base/layout/services/gestionStock/magasin.service';


@Component({
  selector: 'app-fiche-magasin',
  templateUrl: './fiche-magasin.component.html',
  styleUrls: ['./fiche-magasin.component.scss']
})
export class FicheMagasinComponent implements OnInit {
  listMagasins:any[];
  listArticles:any[];
  listCategorieArticle:any[];
  dropdownSettingsMagasin= {};
  dropdownSettingsArticle= {};
  dropdownSettingsCategorie= {};
  magasin_id:number;
  categorie_id:number;
  article_id:number;
  
  constructor(private magasinService:MagasinService, private categorieArticleService:CategorieArticleService,
    private articleStockService:ArticleStockService, private articleService:ArticleService) { }

  ngOnInit(): void {
    this.allCategorieArticle();
    this.allMagasins();
    this.dropdownSettingsMagasin = {
      singleSelection: true,
      idField: 'id',
      textField: 'numeroMagasin',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.dropdownSettingsArticle= {
      singleSelection: true,
      idField: 'id',
      textField: 'numeroArticle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.dropdownSettingsCategorie= {
      singleSelection: true,
      idField: 'id',
      textField: 'libelleFr',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }

  allCategorieArticle(){
    this.categorieArticleService.all().subscribe(res=>{
      console.log(res)
      this.listCategorieArticle=res;
    },err=>{
      console.log(err)
    })
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
  selectMagasin(event:any){
    this.magasin_id=event.id;
  }
  selectArticle(event:any){
this.article_id=event.id;
  }
  selectCategorie(event:any){
    this.categorie_id=event.id;
    this.articleStockService.findArticleStockByMagasinAndCategorieArtcile(this.magasin_id, this.categorie_id).subscribe(res=>{
     this.listArticles=res.map(e=>e.article)
    },err=>{
      console.log(err)
    })  
   }
   exportFiche(){
     console.log("export fiche")
     this.articleService.ficheMagasin(this.article_id, this.magasin_id)
   }
}
