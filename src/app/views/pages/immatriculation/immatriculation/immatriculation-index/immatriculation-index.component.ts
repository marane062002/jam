import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ImmatriculationService } from '../../services/immatriculation.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'kt-immatriculation-index',
  templateUrl: './immatriculation-index.component.html',
  styleUrls: ['./immatriculation-index.component.scss']
})
export class ImmatriculationIndexComponent implements OnInit {

  
  displayedColumns: string[] = ['id', 'numDossierInterne', 'type', 'etat','actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: ImmatriculationService ,
             private translate: TranslateService,
    private router: Router,
    private notification : NotificationService) { this.getImmatriculation();}

    

  ngOnInit() {
     
  
  }

  async  getImmatriculation(){
    await this.service.getImmatriculations()
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
    this.router.navigate(['/immatriculation/immatriculation-show'], { queryParams: { id: id } })
  }

  update(id){
    this.router.navigate(['/immatriculation/immatriculation-edit'], { queryParams: { id: id } })
  }

  delete(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
			.deleteImmatriculation( id)
			.subscribe((data) => {
        this.getImmatriculation();
        
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
