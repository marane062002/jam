import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuthService } from '../../../../core/auth';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'kt-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {

  displayedColumns: string[] = ['username', 'actif', 'actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private service: AuthService,
    private translate: TranslateService,
    private notification: NotificationService,
    private router: Router) { this.getUsers(); }



  ngOnInit() {


  }

  public getUsers() {
    this.service.getAllUsers()
      .then(data => {
        this.dataSource = new MatTableDataSource(data);
        console.log("All Users : " + JSON.stringify(data,null,2))
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

  // ============================================
  // Methode de suppression d'un compte
  // ============================================
  public delete(id: number) {

    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service.deleteUser(id)
        .subscribe(
          data => {

            this.getUsers()

          },
          error => console.log(error));

      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );

    }
  }

  show(id) {
    this.router.navigate(['/user/user-show'], { queryParams: { id: id } })
  }
  update(id) {
    this.router.navigate(['/user/user-edit'], { queryParams: { id: id } })
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
