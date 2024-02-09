import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'kt-habitation-index',
  templateUrl: './habitation-index.component.html',
  styleUrls: ['./habitation-index.component.scss']
})
export class HabitationIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'num', 'nbAppt','dateDebut','actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: BienscommunalService ,
             private translate: TranslateService,
    private router: Router,
    private notification:NotificationService) { this.getHabitations();}

    

  ngOnInit() {
     
  
  }

  public getHabitations(){
    this.service.getHabitations()
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
      this.service.deleteHabitation(id)
      .subscribe(
        data => {
          console.log(data),
          this.getHabitations();
        },
        error => console.log(error)); 
        this.notification.warn(
        	this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      	);
    }
     
  }

  update(id){
    this.router.navigate(['/habitation/habitation-edit'], { queryParams: { id: id } })
  }

  show(id){
    this.router.navigate(['/habitation/habitation-show'], { queryParams: { id: id } })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
}
