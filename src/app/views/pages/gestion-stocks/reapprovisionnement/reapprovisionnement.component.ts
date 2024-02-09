import { Component, OnInit } from '@angular/core';
import { MAgasin } from '../../../../core/_base/layout/models/magasin';
import { ArticleStockService } from '../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { MagasinService } from '../../../../core/_base/layout/services/gestionStock/magasin.service';

@Component({
  selector: 'app-reapprovisionnement',
  templateUrl: './reapprovisionnement.component.html',
  styleUrls: ['./reapprovisionnement.component.scss']
})
export class ReapprovisionnementComponent implements OnInit {

  headerData:any=[
    { name: "Référence", content: "article.numeroArticle" },
    { name: "Désignation", content: "article.designation" },
    { name: "Prix unitaire", content: "article.prix" },
    { name: "Quantité", content: "quantiteStock" },
    { name: "Montant", content: "montant" },
   /*  { name: "Temps avant réapprovisionnement(j)", content: "tempsAvantReappro" },
    { name: "Quantité à réapprovisionner", content: "quantiteRreappro" },
    { name: "Statut", content: "statut" }, */
  ]

  listReapprovisionnement:any[];

  constructor(private magasinService:MagasinService,private articleStockService:ArticleStockService) { }
  listMagasins:MAgasin[];
  dropdownSettings:{};

  ngOnInit() {
    this.allMagasins();
    this.dropdownSettings= {
      singleSelection: true,
      idField: 'id',
      textField: 'numeroMagasin',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }
  selectFournisseur(event:any){

    this.articleStockService.listArticleByMagasinAndQuantite(event.id).subscribe(res=>{
      console.log(res);
      this.listReapprovisionnement=res;
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

}
