import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MagasinService } from '../../../../../core/_base/layout/services/gestionStock/magasin.service';

import { ArticleStockService } from '../../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { MAgasin } from '../../../../../core/_base/layout/models/magasin';

@Component({
  selector: 'kt-details-magasin',
  templateUrl: './details-magasin.component.html',
  styleUrls: ['./details-magasin.component.scss']
})
export class DetailsMagasinComponent implements OnInit {
id:number;
magasin:MAgasin;
displayedColumns: string[] = [ "numeroArticle", "quantity","rayonnage","prixMoyenPondere"]
isLoading=true;
dataSource: MatTableDataSource<any>;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
datasize: number = 0;
  constructor(private activatedRoute: ActivatedRoute, private magasinService:MagasinService,
    private articleStockService:ArticleStockService, private translate:TranslateService) {
     
    }

  async ngOnInit() {
 
    //this.magasinService.
   await   this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
		});
  this.magasinService.getMagasin(this.id).subscribe(
    res=>{
      this.magasin=res;
      

    },err=>{
      console.log(err)
      
    }
  );
    this.articleStockService.AllArticleStockByMagasin(this.id).subscribe(data=>{
      console.log(data)
      
      this.datasize = data.length
     // this.totalPages=data.totalPages;
      this.dataSource = new MatTableDataSource(data);
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
  }

}
