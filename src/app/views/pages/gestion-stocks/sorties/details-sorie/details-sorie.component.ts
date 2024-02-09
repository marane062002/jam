import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DemandeFournitureService } from '../../../../../core/_base/layout/services/gestionStock/demande-fourniture.service';
import { LigneDemandeFournitureService } from '../../../../../core/_base/layout/services/gestionStock/ligne-demande-fourniture.service';
import { SortieService } from '../../../../../core/_base/layout/services/gestionStock/sortie.service';

@Component({
  selector: 'kt-details-sorie',
  templateUrl: './details-sorie.component.html',
  styleUrls: ['./details-sorie.component.scss']
})
export class DetailsSorieComponent implements OnInit {
  listDemandesFourniture
  sortie;
  id:number;
  displayedColumns: string[] = [ "numeroArticle", "quantity","rayonnage","prixMoyenPondere"]
  isLoading=true;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasize: number = 0;
    constructor(private activatedRoute: ActivatedRoute, 
      private demandeFournitureService:LigneDemandeFournitureService,
      private sortieService:SortieService, private translate:TranslateService) {
       
      }
  
    async ngOnInit() {
   
      //this.magasinService.
     await   this.activatedRoute.queryParams.subscribe((params) => {
        this.id = params["id"];
      });
    this.sortieService.getById(this.id).subscribe(
      res=>{
        this.sortie=res;
        this.demandeFournitureService.getLigneDemandeFournitureByIdDemande(res.demandeFourniture.id).subscribe(res=>{
          this.listDemandesFourniture = res.body 
        this.datasize = res.body .length
       // this.totalPages=data.totalPages;
        this.dataSource = new MatTableDataSource(res.body );
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
  
      })
    })
  }
  

  telechargeDoucument(id:number){
      this.sortieService.getBonSortieById(id);
    }
    livreSortie(id:number){
     // this.sortieService.(id);
    }
}
