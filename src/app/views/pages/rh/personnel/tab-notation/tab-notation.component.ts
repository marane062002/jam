import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotationService } from '../../services/notation.service';

@Component({
  selector: 'kt-tab-notation',
  templateUrl: './tab-notation.component.html',
  styleUrls: ['./tab-notation.component.scss']
})
export class TabNotationComponent implements OnInit {

  id:number;
  presences:any;
  displayedColumns: string[] = ['id', 'compagne', 'note'];
  
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private notationService:NotationService,
    private translate: TranslateService,
    private router: Router,private route: ActivatedRoute) { 

      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
    }

  ngOnInit() {
    this.notationService.getNotationByPersonnel(this.id)
    .subscribe(data =>{this.dataSource =new MatTableDataSource(data);
     
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
      this.paginator._intl.nextPageLabel = 'الصفحة التالية';
      this.paginator._intl.previousPageLabel = 'الصفحة السابقة';
      this.paginator._intl.lastPageLabel="الصفحة الأخيرة";
      this.paginator._intl.firstPageLabel="الصفحة الأولى";
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; } ,
      error => console.log(error))
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
