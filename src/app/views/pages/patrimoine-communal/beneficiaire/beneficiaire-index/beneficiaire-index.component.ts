import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';
import { BienscommunalService } from '../../services/bienscommunal.service';

@Component({
  selector: 'kt-beneficiaire-index',
  templateUrl: './beneficiaire-index.component.html',
  styleUrls: ['./beneficiaire-index.component.scss']
})
export class BeneficiaireIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'prenom', 'cin','actions'];

  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private service: BienscommunalService ,
    private translate: TranslateService,
    private router: Router, 
    private notification:NotificationService 
  ) { }

  ngOnInit() {
    this.getBeneficiaire();
  }

  public getBeneficiaire(){
    this.service.getBeneficiaires()
   .then(data => {this.dataSource =new MatTableDataSource(data);
    
    //  this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
   
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   
   }, err => {
     console.log(err);
     this.isLoadingResults = false;
   });
 }

 public delete(id: number) {
  if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
    this.service.deleteBeneficiaire(id)
    .subscribe(
      data => {
        console.log('delete'),
        this.getBeneficiaire();
      },
      error => console.log(error)); 
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
  }
   
}

show(id){
  this.router.navigate(['/beneficiaire/beneficiaire-show'], { queryParams: { id: id } })
}
update(id){
  this.router.navigate(['/beneficiaire/beneficiaire-edit'], { queryParams: { id: id } })
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
