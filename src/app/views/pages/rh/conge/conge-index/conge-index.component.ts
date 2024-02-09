import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PersonnelService } from '../../services/personnel.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-conge-index',
  templateUrl: './conge-index.component.html',
  styleUrls: ['./conge-index.component.scss']
})
export class CongeIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'matricule', 'nom', 'prenom', 'type','statut','actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private service: PersonnelService ,
             private translate: TranslateService,
    private router: Router) { this.getDemande();}

    

  ngOnInit() {
     
  
  }

  public getDemande(){
    this.service.getConges()
    .then(data => {this.dataSource =new MatTableDataSource(data);
      
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
    this.service.deleteRessource(id,'/demandeConges/delete/')
      .subscribe(
        data => {
         
          this.getDemande()
          
        },
        error => console.log(error));
  }

  show(id){
    this.router.navigate(['/conge/conge-show'], { queryParams: { id: id } })
  }
  update(id){
    this.router.navigate(['/conge/conge-edit'], { queryParams: { id: id } })
  }
  validate(id){
    this.router.navigate(['/conge/conge-validate'], { queryParams: { id: id } })
  }

}
