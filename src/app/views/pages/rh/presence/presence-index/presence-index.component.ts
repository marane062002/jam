import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PresenceService } from '../../services/presence.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-presence-index',
  templateUrl: './presence-index.component.html',
  styleUrls: ['./presence-index.component.scss']
})
export class PresenceIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'libelle', 'date', 'heuraire','actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: PresenceService ,
             private translate: TranslateService,
    private router: Router) { this.getPresence();}

    

  ngOnInit() {
     
  
  }

  public getPresence(){
    this.service.getRessource('/presences/index')
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
 
  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public delete(id: number) {
    this.service.deleteRessource(id,'/presences/delete/')
      .subscribe(
        data => {
         
          this.getPresence()
          
        },
        error => console.log(error));
  }

  show(id){
    this.router.navigate(['/presence/presence-show'], { queryParams: { id: id } })
  } 
  update(id){
    this.router.navigate(['/presence/presence-edit'], { queryParams: { id: id } })
  }
  

}
