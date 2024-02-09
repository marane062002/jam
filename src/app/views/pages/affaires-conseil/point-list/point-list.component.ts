import { Component, OnInit, ViewChild } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'kt-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.scss']
})
export class PointListComponent implements OnInit {
  
  displayedColumns = ['id', 'session','objet', 'budget','dateRealisation','statut','commission','actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service : AffairesConseilService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.service.getAllPoints().subscribe(data=>{
      console.log(data)
      this.dataSource=new MatTableDataSource(data);
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
