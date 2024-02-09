import { Component, OnInit, ViewChild } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'kt-point-reunion-commission',
  templateUrl: './point-reunion-commission.component.html',
  styleUrls: ['./point-reunion-commission.component.scss']
})
export class PointReunionCommissionComponent implements OnInit {
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  idReunion;
  displayedColumns = ['id', 'session','objet', 'budget','dateRealisation','statut','recommandations'];
  dataSource: MatTableDataSource<any>; 
  
  constructor(private service : AffairesConseilService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idReunion= params['id'];
     });
    this.service.getPointsByReunion(this.idReunion)
    .subscribe(data=>{console.log(data)
      this.dataSource=new MatTableDataSource(data);  })
  }
  }


