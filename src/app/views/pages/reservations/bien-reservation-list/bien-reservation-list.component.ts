import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { BiensReservationService } from '../../shared/biens-reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-bien-reservation-list',
  templateUrl: './bien-reservation-list.component.html',
  styleUrls: ['./bien-reservation-list.component.scss']
})
export class BienReservationListComponent implements OnInit {

  displayedColumns = ['id', 'nom', 'type','adresse','actions'];
  dataSource: MatTableDataSource<Bien>;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('matPaginator7', {static: true}) paginator7: MatPaginator;
  @ViewChild('sort7', {static: true}) sort7: MatSort;
  bienDatasource: Bien[] = [];
  constructor(private service : BiensReservationService,private router: Router) { }
  biens;
  ngOnInit() {
    this.populate();
   /* this.service.getAllBien().subscribe(data => {
      this.biens = data;
    });*/
  }

  populate(){
    this.service.getAllBien().subscribe(data => {
    this.bienDatasource = [];
    this.biens = data;
    console.log(this.biens)
    for (let i = 0; i < this.biens.length; i++) { 
      this.bienDatasource.push(
        this.createNewBien(i)
      ); }
      this.dataSource = new MatTableDataSource(this.bienDatasource);
      this.paginator._intl.itemsPerPageLabel = 'مصفوفة لكل صفحة';
	  this.paginator._intl.nextPageLabel = 'الصفحة التالية';
	  this.paginator._intl.previousPageLabel = 'الصفحة السابقة';
	  this.paginator._intl.lastPageLabel="الصفحة الأخيرة";
	  this.paginator._intl.firstPageLabel="الصفحة الأولى";
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //this.dataSource.filter = "1";
  });}
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  createNewBien(i: number): Bien {
    return {
      id: this.biens[i].id,
      nom: this.biens[i].objetDemandeAutorisation,
      type:this.biens[i].typebiendemandeReservation.libelle,
      adresse: this.biens[i].adresse,
      arrondissement: this.biens[i].arrondissement,
      quartier:this.biens[i].quartier,
     
    };
  }

  editbien(idrec){
    this.router.navigate(['/reservations/bienreservation-edit'], { queryParams: { reclam: idrec } })
  }

  nouvellepp(){
    this.router.navigate(['/reservations/bienreservation-form'])
  }

  showbien(rec){
    this.router.navigate(['/reservations/bienreservation-detail'], { queryParams: { reclam: rec } })
  }

  deletepp(bienId){
    this.service.deletebien(bienId).subscribe(res => {
      this.populate();
    });
  }

}
export interface Bien {
  id: string;
  nom: string;
  type:String;
  adresse:string;
  arrondissement: string;
  quartier: string;
}
