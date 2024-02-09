import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../core/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-role-show',
  templateUrl: './role-show.component.html',
  styleUrls: ['./role-show.component.scss']
})
export class RoleShowComponent implements OnInit {

  id:number;
  role:any;
  displayedColumns: string[] = ['id', 'title','name','path'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service:AuthService,
    private translate: TranslateService,
    private router: Router,private route: ActivatedRoute) { 

      this.id = this.route.snapshot.params['id'];
      this.getRole();
    }

  ngOnInit() {
   
    
  }
  public getRole(){
    this.service.getRoleById(this.id)
    .subscribe(data => {
      this.role = data,
      this.dataSource =new MatTableDataSource(data.permissions);
      this.isLoadingResults = false;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
    
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
          console.log(data),
          this.router.navigate(['role/role-index']) 
          
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
