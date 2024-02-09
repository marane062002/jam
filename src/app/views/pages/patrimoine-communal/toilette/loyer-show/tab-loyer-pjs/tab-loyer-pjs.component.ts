import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BienscommunalService } from '../../../services/bienscommunal.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'kt-tab-loyer-pjs',
  templateUrl: './tab-loyer-pjs.component.html',
  styleUrls: ['./tab-loyer-pjs.component.scss']
})
export class TabLoyerPjsComponent implements OnInit {

  id:number;
 
  displayedColumns: string[] = ['id', 'nom', 'type', 'download'];
  docs = [{'type':'DEC','libelle':'قرار'},{'type':'ACT','libelle':'عقد إجار'},{'type':'REC','libelle':'إصال الأداء'},{'type':'DOC','libelle':'وثيقة'}];
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
    
      this.getPjs(this.id)
    }
 
  ngOnInit() {
    
  }

  getPjs(id){
    console.log(id)
     this.service.getFilesById(id,'/PjLoyersToilettes/allById/')
    .then(data =>{ this.dataSource =new MatTableDataSource(data);
      console.log(data)
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
  
  findLibelleType(type){
    const resultat = this.docs.find( doc => doc.type === type);
    return resultat
  }

  onClickPjName(e,id) {
		//console.log('You clicked: '+e) ;
		var r=e.substring(0,e.length-4);
    
  
    window.open(environment.API_ALFRESCO_URL +'/PjLoyersToilettes/'+r);
    
    
	  }
 


}
