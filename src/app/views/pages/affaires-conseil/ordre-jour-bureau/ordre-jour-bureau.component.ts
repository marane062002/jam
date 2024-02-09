import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-ordre-jour-bureau',
  templateUrl: './ordre-jour-bureau.component.html',
  styleUrls: ['./ordre-jour-bureau.component.scss']
})
export class OrdreJourBureauComponent implements OnInit {
  
  displayedColumns = ['id', 'objet','statut','actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  Sessions;
  idSession=-1;
  
  constructor(private service : AffairesConseilService, private router: Router) { }

  ngOnInit() {
    this.service.getAllSession().subscribe(res=>{
      this.Sessions=res;
    })
  }

  onChangeofOptions(){
    this.getPoints(); 
      
    }

   async getPoints(){
    this.service.getPointBySessionForBureau(this.idSession)
    .subscribe(res=>{
      this.dataSource=new MatTableDataSource(res);
    this.paginator._intl.itemsPerPageLabel = 'مصفوفة لكل صفحة';
    this.paginator._intl.nextPageLabel = 'الصفحة التالية';
    this.paginator._intl.previousPageLabel = 'الصفحة السابقة';
    this.paginator._intl.lastPageLabel="الصفحة الأخيرة";
    this.paginator._intl.firstPageLabel="الصفحة الأولى";
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    }

    showPoint(id){
      this.router.navigate(['/affaires-conseil/point-detail'], { queryParams: { id: id } })
    }
  

}
