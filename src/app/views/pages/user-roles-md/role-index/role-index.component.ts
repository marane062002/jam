import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuthService } from '../../../../core/auth';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-role-index',
  templateUrl: './role-index.component.html',
  styleUrls: ['./role-index.component.scss']
})
export class RoleIndexComponent implements OnInit {

  displayedColumns: string[] = ['title','actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: AuthService ,
             private translate: TranslateService,
    private router: Router) { this.getRoles();}



  ngOnInit() {


  }

  async getRoles(){
   await this.service.getRoleIndex()
    .subscribe(data => {this.dataSource =new MatTableDataSource(data[0]);
      this.isLoadingResults = false;
	  this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
	  this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
	  this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
	  this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
	  this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
	  this.dataSource.paginator = this.paginator;
	  this.dataSource.sort = this.sort;

    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  public roleDelete(id: number) {
    this.service.deleteRole(id)
      .subscribe(
        data => {

          this.getRoles()

        },
        error => console.log(error));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
