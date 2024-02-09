import { Component, OnInit } from '@angular/core';
import { MAgasin } from '../../../../core/_base/layout/models/magasin';
import { ArticleStockService } from '../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { MagasinService } from '../../../../core/_base/layout/services/gestionStock/magasin.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-Reforme',
  templateUrl: './Reforme.component.html',
  styleUrls: ['./Reforme.component.scss']
})
export class ReformeComponent implements OnInit {

  headerData:any=[
    { name: "N article", content: "article.numeroArticle" },
    { name: "Stock final", content: "quantiteStock" },
    { name: "Rayonnage", content: "rayonnage" },
  /*   { name: "Stock moyen en quantité", content: "stockMoyenEnQuantite" },
    { name: "Taux de rotation du stock", content: "tauxRotationStock" },
    { name: "Durée moyenne de stockage", content: "dureeMoyenneStockage" } */
  ]
  dropdownSettingsMagasin = {};
  listMagasins:MAgasin[];
  listReforme:any[];
  actions: any = { deleteALL:true, withCheckbox:true}

  constructor(private articleStockService:ArticleStockService,
    private magasinService:MagasinService) { }

  ngOnInit() {
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
  deleteArticle(event:any){
console.log(event)
Swal.fire({
  title: 'voulez-vous vraiment supprimer ces Articles ?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Supprimer',
  cancelButtonText: 'fermer'
}).then((result) => {
  if (result.isConfirmed) {
    this.articleStockService.deleteALL(event).subscribe(res=>{
      console.log(res);
      Swal.fire(
        'Supprimé !',
        ' Articles a été supprimé.',
        'success'
      )
      this.ngOnInit();
      this.listReforme=[];
    },err=>{
      console.log(err)
    })
   
  }
})

  }
  selectMagasin(event:any){
console.log(event)
this.articleStockService.findAllWithCreationDateTimeBefore(event.id).subscribe(res=>{
  console.log(res)
  this.listReforme=res;
},err=>{
  console.log(err)
})

  }

}
