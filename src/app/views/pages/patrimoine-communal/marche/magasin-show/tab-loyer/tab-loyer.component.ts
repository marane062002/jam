import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BienscommunalService } from '../../../services/bienscommunal.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-tab-loyer',
  templateUrl: './tab-loyer.component.html',
  styleUrls: ['./tab-loyer.component.scss']
})
export class TabLoyerComponent implements OnInit {

   
  id:number;
  presences:any; 
  displayedColumns: string[] = ['id', 'numActeLocation', 'dateActe', 'montantLoyer', 'locataire','actions'];
  
  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private service:BienscommunalService,
    private translate: TranslateService,
    private router: Router,private route: ActivatedRoute) { 

      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
    
      this.getLoyers(this.id)
    }
 
  ngOnInit() {
    
  }

   getLoyers(id){
   
     this.service.getLoyersByMagasin(id)
    .then(data =>{ this.dataSource =new MatTableDataSource(data);
      this.isLoadingResults = false;
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
  show(id){
    this.router.navigate(['marche/loyer-show'] , { queryParams: { id: id, idParent : this.id } })
  }
  update(id){
    this.router.navigate(['marche/loyer-edit'] , { queryParams: { id: id, idParent : this.id } })
  }

}
