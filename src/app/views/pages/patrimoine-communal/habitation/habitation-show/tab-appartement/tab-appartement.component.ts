import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BienscommunalService } from '../../../services/bienscommunal.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'kt-tab-appartement',
  templateUrl: './tab-appartement.component.html',
  styleUrls: ['./tab-appartement.component.scss']
})
export class TabAppartementComponent implements OnInit {

 
  id:number;

  displayedColumns: string[] = ['id', 'numAppartement', 'debutExploitation', 'situation', 'superficie','actions'];
  
  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private service:BienscommunalService,
    private translate: TranslateService,
    private notification: NotificationService,
    private router: Router,private route: ActivatedRoute) { 

      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
    
      this.getAppartement(this.id)
    }
 
  ngOnInit() {
    
  }

   getAppartement(id){
   
     this.service.getAppartementByHabitation(id)
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
    this.router.navigate(['habitation/appartement-show'] , { queryParams: { id: id, idParent : this.id  } })
  }
  update(id){
    this.router.navigate(['habitation/appartement-edit'] , { queryParams: { id: id, idParent : this.id  } })
  }
  
  delete(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
			.deleteAppartement( id)
			.subscribe((data) => {
        console.log(data),
				this.router.navigate(['habitation/habitation-show'] , { queryParams: { id: this.id } })
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}


}
