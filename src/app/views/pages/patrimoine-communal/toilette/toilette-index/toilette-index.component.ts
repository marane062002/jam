import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'kt-toilette-index',
  templateUrl: './toilette-index.component.html',
  styleUrls: ['./toilette-index.component.scss']
})
export class ToiletteIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'num', 'nbToilettes','dateDebut','actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: BienscommunalService ,
             private translate: TranslateService,
             private notification:NotificationService,
    private router: Router) { this.getToilettes();}

    

  ngOnInit() {
     
  
  }

  public getToilettes(){
    this.service.getToilettes()
    .then(data => {this.dataSource =new MatTableDataSource(data);
      console.log(JSON.stringify(data))
      
      this.isLoadingResults = false;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
 

  delete(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
			.deleteToilette( id)
			.subscribe((data) => {
				this.getToilettes();
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}


  show(id){
    this.router.navigate(['/toilette/toilette-show'], { queryParams: { id: id } })
  }

  update(id){
    this.router.navigate(['/toilette/toilette-edit'], { queryParams: { id: id } })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
