import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BienscommunalService } from '../../../services/bienscommunal.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'kt-tab-ligneloyer',
  templateUrl: './tab-ligneloyer.component.html',
  styleUrls: ['./tab-ligneloyer.component.scss']
})
export class TabLigneloyerComponent implements OnInit {

  id:number;
 
  displayedColumns: string[] = ['id', 'annee', 'mois', 'montant', 'etat','numRecu','actions'];
  mois = [{'id':0,'libelle':'يناير'},{'id':1,'libelle':'فبراير'},{'id':2,'libelle':'مارس'},{'id':3,'libelle':'أبريل'},{'id':4,'libelle':'ماي'},{'id':5,'libelle':'يونيو'},{'id':6,'libelle':'يوليوز'},{'id':7,'libelle':'غشت'},{'id':8,'libelle':'شتنبر'},{'id':9,'libelle':'أكتوبر'},{'id':10,'libelle':'نونبر'},{'id':11,'libelle':'دجنبر'}];
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
    
      this.getLignesLoyer(this.id)
    }
 
  ngOnInit() {
    
  }

  getLignesLoyer(id){
   
     this.service.getLignesLoyerByIdLoyerDomaine(id)
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
    this.router.navigate(['domaine/ligneloyer-show'] , { queryParams: { id: id } })
  }
  update(id){
    this.router.navigate(['domaine/ligneloyer-edit'] , { queryParams: { id: id } })
  }
  
  // delete(id: number) {
  //   if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
  //     this.service.deleteLigneLoyerDomaine(id)
  //     .subscribe(
  //       data => {
  //         console.log(data),
  //         this.router.navigate(['domaine/loyer-show'] , { queryParams: { id: this.id } })
  //       },
  //       error => console.log(error)); 
  //       this.notification.warn(
  //       	this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
  //     	);
  //   }
     
  // }

}
