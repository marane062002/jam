import { Component, OnInit } from '@angular/core';
import { MAgasin } from '../../../../core/_base/layout/models/magasin';
import { ArticleStockService } from '../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { MagasinService } from '../../../../core/_base/layout/services/gestionStock/magasin.service';
import { TransferService } from '../../../../core/_base/layout/services/transfer.service';

import Swal from 'sweetalert2';
import { Page } from '../../utils/pagination/page';
import { MatTableDataSource } from '@angular/material';
import { Transfer } from '../../../../core/_base/layout/models/transfer';


@Component({
  selector: 'kt-referome-stock',
  templateUrl: './referome-stock.component.html',
  styleUrls: ['./referome-stock.component.scss']
})
export class ReferomeStockComponent implements OnInit {


  displayedColumns: string[] = [
		

		"numeroArticle",
		"quantiteStock",
		"rayonnage",

	];

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

  constructor( private transferService:TransferService,
    private articleStockService:ArticleStockService,
    private magasinService:MagasinService) { }

  ngOnInit() {
    this.allMagasins();
  this.allTransfert();
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


allTransfert(){
  
    this.transferService.pageable(this.currentPage, this.sizeData).subscribe(res=>{
      console.log(res);
      let data:any=res;
      this.dataSource=data.Content;
      this.totalPages=data.totalPages;
      this.datasize = data.totalItems
      this.isLoading = false
    },err=>{
      console.log(err)
      this.isLoading = false
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
  currentPage:any
   sizeData:any
   totalPages
  datasize: number = 0;
  page: Page<any> = new Page();
	dataSource = new MatTableDataSource<any>();
  columns = ['numeroArticle', "quantiteStock", "rayonnage"];
  isLoading = true;
  listTransferts:Transfer[];
  
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
