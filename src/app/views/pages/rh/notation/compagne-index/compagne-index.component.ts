import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NotationService } from '../../services/notation.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { OrganisationService } from '../../../organisation/organisation.service';

@Component({
  selector: 'kt-compagne-index',
  templateUrl: './compagne-index.component.html',
  styleUrls: ['./compagne-index.component.scss']
})
export class CompagneIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'libelle', 'annee', 'moisD', 'moisF','actions'];
  

  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: NotationService ,
             
             private translate: TranslateService,
    private router: Router) { this.getCompagnes();}

    

  ngOnInit() {
     
  
  }

  async getCompagnes(){
    await this.service.getRessource('/compagneNotations/index')
    .subscribe(data => {this.dataSource =new MatTableDataSource(data[0]);
      console.log(data)
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
    this.service.deleteRessource(id,'/compagneNotations/delete/')
      .subscribe(
        data => {
         
          this.getCompagnes()
          
        },
        error => console.log(error));
  }

  update(id){
    this.router.navigate(['/notation/compagne-edit'], { queryParams: { id: id } })
  }
}
