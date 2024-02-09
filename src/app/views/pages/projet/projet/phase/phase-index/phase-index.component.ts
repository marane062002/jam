import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ProjetService } from '../../../services/projet.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'kt-phase-index',
  templateUrl: './phase-index.component.html',
  styleUrls: ['./phase-index.component.scss']
})
export class PhaseIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'designation', 'projet', 'dateDebutPrevue','dateFinPrevue','budgetPhase','actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: ProjetService ,
             private translate: TranslateService,
             private notification: NotificationService,
    private router: Router) { this.getPhase();}

    

  ngOnInit() {
     
  
  }

  public getPhase(){
    this.service.getPhases()
    .subscribe(data => {this.dataSource =new MatTableDataSource(data);
      this.isLoadingResults = false;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
 
  // public phaseDelete(id: number) {
  //   this.service.deletePhase(id)
  //     .subscribe(
  //       data => {
  //         console.log(data),
  //         this.getPhase()
          
  //       },
  //       error => console.log(error));
  // }


  public phaseDelete(id: number) : void{
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))){
        this.service.deletePhase(id).subscribe(data =>{
            console.log("phase deleted : "+id);
        });
        this.notification.warn(
          this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
        );
        this.getPhase();
    }
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  phaseUpdate(id){
    this.router.navigate(['/phase/phase-edit'], { queryParams: { id: id } }) 
  }

}
