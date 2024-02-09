import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'kt-marche-index',
  templateUrl: './marche-index.component.html',
  styleUrls: ['./marche-index.component.scss']
})
export class MarcheIndexComponent implements OnInit {

// displayedColumns: string[] = ['id', 'nom', 'num', 'nbMagasins','dateDebut','actions'];
   displayedColumns: string[] = ['id', 'nom', 'nbMagasins','dateDebut','actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: BienscommunalService ,
             private translate: TranslateService,
    private router: Router,
    private notification:NotificationService) { this.getMarches();}

    

  ngOnInit() {
     
  
  }

  async getMarches(){
    await this.service.getMarches()
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
 
  show(id){
    this.router.navigate(['/marche/marche-show'], { queryParams: { id: id } })
  }

  update(id){
    this.router.navigate(['/marche/marche-edit'], { queryParams: { id: id } })
  }

  delete(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
			.deleteMarche( id)
			.subscribe((data) => {
				this.getMarches();
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
