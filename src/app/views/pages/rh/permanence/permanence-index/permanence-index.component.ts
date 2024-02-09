import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { PermanenceService } from '../../services/permanence.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-permanence-index',
  templateUrl: './permanence-index.component.html',
  styleUrls: ['./permanence-index.component.scss']
})
export class PermanenceIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'matricule', 'nom', 'prenom', 'date','actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: PermanenceService ,
             private translate: TranslateService,
    private router: Router) { this.getPermanence();}

    

  ngOnInit() {
     
  
  }

  async getPermanence(){
    await this.service.getRessource('/permanences/index')
    .subscribe(data => {this.dataSource =new MatTableDataSource(data[0]);
      this.isLoadingResults = false;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
 
  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public delete(id: number) {
    this.service.deleteRessource(id,'/personnels/delete/')
      .subscribe(
        data => {
          console.log(data),
          this.getPermanence()
          
        },
        error => console.log(error));
  }
  show(id){
    this.router.navigate(['/permanence/permanence-show'], { queryParams: { id: id } })
  } 
  update(id){
    this.router.navigate(['/permanence/permanence-edit'], { queryParams: { id: id } })
  }
  
}
