import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PatrimoineService } from '../../../services/patrimoine.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'kt-tab-mvmlocation',
  templateUrl: './tab-mvmlocation.component.html',
  styleUrls: ['./tab-mvmlocation.component.scss']
})
export class TabMvmlocationComponent implements OnInit {

  id:number;
  presences:any;
  displayedColumns: string[] = ['id','datePaiement', 'dureeActe', 'montantLouer','actions'];

  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private patrimoineService:PatrimoineService,
    private translate: TranslateService,
    private notification:NotificationService,
    private router: Router,private route: ActivatedRoute) { 

      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
    }
 
  ngOnInit() {
    this.getMvmLocations(this.id);
  }

  async getMvmLocations(id){
   
    await this.patrimoineService.getMvmLbyPatrimoine(id)
    .subscribe(data =>{ this.dataSource =new MatTableDataSource(data[0]);
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
    this.router.navigate(['patrimoine/mvmlocation-show'] , { queryParams: { id: id, idParent : this.id } })
  }

  update(id){
    this.router.navigate(['/patrimoine/mvmlocation-edit'], { queryParams: { id: id, idParent : this.id } })
  }

  delete(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.patrimoineService
			.deleteMvmL( id)
			.subscribe((data) => {
        this.ngOnInit()   
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
  }
  
}
