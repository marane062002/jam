import { Component, OnInit, ViewChild } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'kt-commission-conseil-detail',
  templateUrl: './commission-conseil-detail.component.html',
  styleUrls: ['./commission-conseil-detail.component.scss']
})
export class CommissionConseilDetailComponent implements OnInit {
  
  idCommission;
  commission={"objectif":"","nomCommission":"","id":0};
  personnels;
  membresConseil;
  displayedColumns = ['nom','tele','role'];
  displayedColumns1 = ['nom','division','role','service'];
  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  
  constructor(private service1 : AffairesConseilService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idCommission= params['id'];
     }); 
     this.getData();
     
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  async getData(){
    await forkJoin(this.service1.getCommissionById(this.idCommission),
    this.service1.getMembreConseilCommissionByCommission(this.idCommission),
    this.service1.getPersonnelCommissionByCommission(this.idCommission))
    .subscribe(res=>{
      this.commission=res[0];
      this.dataSource = new MatTableDataSource(res[1]);
      this.dataSource1 = new MatTableDataSource(res[2]);
    })
  }

}
