import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from '../../../../core/_base/layout/models/article';
import { MAgasin } from '../../../../core/_base/layout/models/magasin';
import { ArticleStock } from '../../../../core/_base/layout/models/article-stock';
 import  *  as _ from  "lodash";
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { EntityMagasin } from '../../../../core/_base/layout/models/entity-magasin';
import { ArticleStockService } from '../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { EntityMagasinService } from '../../../../core/_base/layout/services/gestionStock/entity-magasin.service';
import { MagasinService } from '../../../../core/_base/layout/services/gestionStock/magasin.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'kt-list-magasin',
  templateUrl: './list-magasin.component.html',
  styleUrls: ['./list-magasin.component.scss']
})
export class ListMagasinComponent implements OnInit {

  
  displayedColumns: string[] = [ "entite", "numeroMagasin","ville","adresse", "actions"]
  isLoading=true;
  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  datasize: number = 0;
  articlesStocks:ArticleStock[]=[];
   magasin=new MAgasin();
   articlesStocksDeatil:any[]=[];
   magasinDetail=new MAgasin();

  listMagasins:any[];
  listArticle:Article[];
  listEntiryMagasin:EntityMagasin[];
  inputSearch:number;
  currentPage=0;
  size=5;
  totalPages=1;
  currentPageArticle=0;
  sizeArticle=5;
  totalPagesArticle=1;


  constructor(private modalService: NgbModal,
    private router:Router,
    private translate:TranslateService,
    private magasinService:MagasinService) {  }


  ngOnInit() {
    this.allMagasins();
  }

	detailsMegasin(id:number){
 this.router.navigate(
  ["/stock/detalle-magasin"],
  {queryParams: { id: id } }
    );
	  }

  supprimerEmplacement(data:any){
  Swal.fire({
    title: ' ',
    text: "voulez-vous vraiment supprimer ce magasin  ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Supprimer',
    cancelButtonText: 'Fermer'

  }).then((result) => {
     if (result.isConfirmed) {
      this.magasinService.delete(data).subscribe(res=>{
        this.ngOnInit();
        Swal.fire({
          title: 'magasin  supprimé avec succès !',
          icon: 'success',
        });
        window.location.reload()
      },err=>{
        console.log(err)
      })

    }
  })
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

  allMagasins(){
    this.magasinService.pageable(this.currentPage, this.size).subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.datasize = data.magasines.length
      this.listMagasins=data.magasines;
      this.totalPages=data.totalPages;
      this.dataSource = new MatTableDataSource(this.listMagasins);
      this.isLoading = false;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant(
        "PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
      );
      this.paginator._intl.nextPageLabel = this.translate.instant(
        "PAGES.GENERAL.NEXT_PAGE_LABEL"
      );
      this.paginator._intl.previousPageLabel = this.translate.instant(
        "PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
      );
      this.paginator._intl.lastPageLabel = this.translate.instant(
        "PAGES.GENERAL.LAST_PAGE_LABEL"
      );
      this.paginator._intl.firstPageLabel = this.translate.instant(
        "PAGES.GENERAL.FIRST_PAGE_LABEL"
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    },err=>{
      console.log(err)
    })
  }


  allMagasinKeyWord(keyWord:number){
    this.magasinService.Keyword(this.currentPage, this.size,keyWord).subscribe(res=>{
    console.log(res)
    let data:any=res;
    this.listMagasins=data.magasines;
    this.totalPages=data.totalPages;
  },err=>{
    console.log(err)
  })
}
searchBykeyWord(event:any){
  if(this.inputSearch==null || this.inputSearch==0){
    this.ngOnInit();
  }else
  this.allMagasinKeyWord(this.inputSearch);

}


  modalAjouterEmplacement(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  articleWithnum(item1:any,item2:any):boolean{
    console.log("compart item")
    console.log(item1)
      return item1.id ===item2.id;
    }

  close(){
    this.modalService.dismissAll();
    this.articlesStocks=[];

  }
  // event pagination
pageCurrentChange(event :any){
  this.currentPage=event;

  console.log(this.currentPage, this.size)
  this.allMagasins();
}
  sizeCurrentChange(event :any){
    this.size=event;
    console.log(this.currentPage, this.size)
    this.allMagasins();
   }
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }
  addNow(){
    this.router.navigateByUrl("/stock/ajouter-magasin")
  }

}
