import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'kt-domaine-index',
  templateUrl: './domaine-index.component.html',
  styleUrls: ['./domaine-index.component.scss']
})
export class DomaineIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'num', 'numAutorisation','dateAutorisation','actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: BienscommunalService ,
             private translate: TranslateService,
             private notification:NotificationService,
            private router: Router) { this.getDomaines();}

    

  ngOnInit() {
     
  
  }

  public getDomaines(){
    this.service.getDomaines()
    .then(data => {this.dataSource =new MatTableDataSource(data);
      this.isLoadingResults = false;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
 
  public delete(id: number) {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service.deleteDomaine(id)
      .subscribe(
        data => {
          console.log(data),
          this.getDomaines();
        },
        error => console.log(error)); 
        this.notification.warn(
        	this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      	);
    }
     
  }


  show(id){
    console.log(id)
    console.log(this.dataSource)
    this.router.navigate(['/domaine/domaine-show'], { queryParams: { id: id } })
  } 

  update(id){
    this.router.navigate(['/domaine/domaine-edit'], { queryParams: { id: id } })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
