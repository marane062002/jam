import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ReservationsService } from '../../shared/reservations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss']
})
export class ReservationsListComponent implements OnInit {
  displayedColumns = ['id', 'statut', 'dateDebut', 'dateFin','objet','typeObjet','espace','actions'];
  dataSource: MatTableDataSource<Reservation>;
  autorisations=[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('matPaginator7', {static: true}) paginator7: MatPaginator;
  @ViewChild('sort7', {static: true}) sort7: MatSort;
  isLoading=true;
autorisationsDatasource: Reservation[] = [];
  constructor(private service : ReservationsService,private router: Router) { this.populate();}
  ngOnInit() {
  }
   populate(){
     this.service.getallautorisation().then(data => {
    this.autorisationsDatasource = [];
    this.autorisations = data;
    for (let i = 0; i < this.autorisations.length; i++) { 
      this.autorisations[i].show=false;
      if(data[i].statutReservation.statutReservation>2 || data[i].statutReservation.libelle=='موافق عليها'){
        this.autorisations[i].show=true;
       }
      this.autorisationsDatasource.push(
        this.createNewAutorisation(i)
      ); }
      this.isLoading=false;
      this.dataSource = new MatTableDataSource(this.autorisationsDatasource);
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
    console.log(filterValue)
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  createNewAutorisation(i: number): Reservation {
    return {
      id: this.autorisations[i].id,
      statut: this.autorisations[i].statutReservation.libelle,
      dateDebut: this.autorisations[i].dateDebut,
      dateFin: this.autorisations[i].dateFin,
      objet:this.autorisations[i].espaceReservation.bienReservation.objetDemandeAutorisation,
      typeObjet:this.autorisations[i].espaceReservation.bienReservation.typebiendemandeReservation.libelle,
      espace:this.autorisations[i].espaceReservation.espace,
      show:this.autorisations[i].show,
    };
  }

  showAutorisation(rec){
    this.router.navigate(['/reservations/reservation-detail'], { queryParams: { reclam: rec } })
  } 
  editReservation(rec){
    this.router.navigate(['/reservations/reservation-edit'], { queryParams: { reclam: rec } })
  } 
  deleteAutorisation(recId){
    this.service.deleteAutorisation(recId).subscribe(res => {
      this.populate();
  })}

  nouvellepp(){
    this.router.navigate(['/reservations/reservation-form'])
  }
  traiterAutorisation(rec){
    this.router.navigate(['/reservations/reservation-traitement'], { queryParams: { reclam: rec } })
  }

  traiterPaiementReservation(rec){
    this.router.navigate(['/reservations/reservation-traitement-paiement'], { queryParams: { reclam: rec } })
  }

}
export interface Reservation {
  id: string;
  statut: string;
  dateDebut:string;
  dateFin: string;
  objet: string;
  typeObjet:string;
  espace:String;
  show:boolean;

}

