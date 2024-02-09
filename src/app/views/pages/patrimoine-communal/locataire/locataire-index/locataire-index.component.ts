import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'kt-locataire-index',
  templateUrl: './locataire-index.component.html',
  styleUrls: ['./locataire-index.component.scss']
})
export class LocataireIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'prenom', 'cin','actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: BienscommunalService ,
             private translate: TranslateService,
    private router: Router, 
    private notification:NotificationService ) { }

    

  ngOnInit() {
    this.getLocataire();
  
  }

 public getLocataire(){
     this.service.getLocataires()
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
      this.service.deleteLocataire(id)
      .subscribe(
        data => {
          console.log('delete'),
          this.getLocataire();
        },
        error => console.log(error)); 
        this.notification.warn(
        	this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      	);
    }
     
  }

  show(id){
    this.router.navigate(['/locataire/locataire-show'], { queryParams: { id: id } })
  }
  update(id){
    this.router.navigate(['/locataire/locataire-edit'], { queryParams: { id: id } })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
