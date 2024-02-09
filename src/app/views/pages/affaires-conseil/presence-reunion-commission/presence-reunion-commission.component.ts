import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-presence-reunion-commission',
  templateUrl: './presence-reunion-commission.component.html',
  styleUrls: ['./presence-reunion-commission.component.scss']
})
export class PresenceReunionCommissionComponent implements OnInit {
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSourcePE: MatTableDataSource<any>;
  dataSourcePI: MatTableDataSource<any>;
  displayedColumnsPE = ['nom','tele','role', 'present','justif'];
  displayedColumnsPI = ['nom', 'division','service', 'role', 'present','justif'];
  idReunion;

  constructor(private service : AffairesConseilService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idReunion= params['id'];
     });
    this.service.getMembresByReunion(this.idReunion)
    .subscribe(data=>{console.log(data)
      this.dataSourcePE=new MatTableDataSource(data);  })
    this.service.getPersonnelsByReunion(this.idReunion)
    .subscribe(data=>{
      this.dataSourcePI=new MatTableDataSource(data);
      console.log(data)})
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourcePI.filter = filterValue;
  }

}
