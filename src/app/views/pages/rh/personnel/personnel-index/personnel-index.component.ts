import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { PersonnelService } from '../../services/personnel.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { User, currentUser } from '../../../../../core/auth';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';

@Component({
  selector: 'kt-list',
  templateUrl: './personnel-index.component.html',
  styleUrls: ['./personnel-index.component.scss']
})
export class PersonnelIndexComponent implements OnInit {

  displayedColumns: string[] = ['matricule', 'nom', 'prenom', 'typePersonnel','actions'];
  user$: Observable<User>;
  liste=[];
  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: PersonnelService ,
             private translate: TranslateService,
             private store: Store<AppState>,
    private router: Router) { this.getPersonnel();}



  ngOnInit() {


  }

  getPersonnel(){
    this.user$ = this.store.pipe(select(currentUser));

    this.user$.subscribe(user =>{
      if(user){

      this.liste = [user.idDivision,user.idService]
      this.getPersonnels_user(this.liste)

  }
  })
  }

 async getPersonnels_user(liste){
  await this.service.getPersonnelsByDevisionAndService(liste).subscribe(data => {this.dataSource =new MatTableDataSource(data[0]);
    this.isLoadingResults = false;
    this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
    this.paginator._intl.nextPageLabel = 'الصفحة التالية';
    this.paginator._intl.previousPageLabel = 'الصفحة السابقة';
    this.paginator._intl.lastPageLabel="الصفحة الأخيرة";
    this.paginator._intl.firstPageLabel="الصفحة الأولى";
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
          this.getPersonnel()

        },
        error => console.log(error));
  }
  show(id){
    this.router.navigate(['/personnel/personnel-show'], { queryParams: { id: id } })
  }
  update(id){
    this.router.navigate(['/personnel/personnel-edit'], { queryParams: { id: id } })
  }

}
