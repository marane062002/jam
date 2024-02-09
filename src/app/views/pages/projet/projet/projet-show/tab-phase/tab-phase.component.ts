import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjetService } from '../../../services/projet.service';




@Component({
  selector: 'kt-tab-phase',
  templateUrl: './tab-phase.component.html',
  styleUrls: ['./tab-phase.component.scss']
})
export class TabPhaseComponent implements OnInit {

  id:number;
  presences:any; 
  displayedColumns: string[] = ['id', 'designation', 'dateDebutPrevue', 'dateFinPrevue', 'dureeEstimee','budgetPhase','actions'];
  
  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private service:ProjetService,
    private translate: TranslateService,
    private router: Router,private route: ActivatedRoute) { 

      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
     
      this.getPhases(this.id)
    }
 
  ngOnInit() {
    
  }

   getPhases(id){
   
     this.service.getPhaseByProjetId(id)
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
    this.router.navigate(['projet/phase-show'] , { queryParams: { id: id } })
  }
  update(id){
    this.router.navigate(['projet/phase-edit'] , { queryParams: { id: id, p: this.id }})
  }
  newPhase(id){
    this.router.navigate(['/projet/phase-new'], { queryParams: { id: id } })
  } 

  public delete(id: number) : void{
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))){
        this.service.deletePhase(id).subscribe(data =>{
            console.log("phase deleted : "+id);
        });
        this.getPhases(this.id);
    }
    
  }

}
