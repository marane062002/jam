import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AttestationService } from '../../services/attestation.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-attestation-index',
  templateUrl: './attestation-index.component.html',
  styleUrls: ['./attestation-index.component.scss']
})
export class AttestationIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'matricule', 'nom', 'prenom', 'type','statut','actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: AttestationService ,
             private translate: TranslateService,
    private router: Router) { this.getData();}



  ngOnInit() {


  }

  async  getData(){
    await this.service.getRessource('/demandes/index')
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
    this.service.deleteRessource(id,'/demandes/delete/')
      .subscribe(
        data => {

          this.getData()

        },
        error => console.log(error));
  }
  show(id){
    this.router.navigate(['/attestation/attestation-show'], { queryParams: { id: id } })
  }
  update(id){
    this.router.navigate(['/attestation/attestation-edit'], { queryParams: { id: id } })
  }
  validate(id){
    this.router.navigate(['/attestation/attestation-validate'], { queryParams: { id: id } })
  }

  print(id){}

}
