import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-ordre-jour-audience',
  templateUrl: './ordre-jour-audience.component.html',
  styleUrls: ['./ordre-jour-audience.component.scss']
})
export class OrdreJourAudienceComponent implements OnInit {
  
  displayedColumns = ['id', 'objet','type','commission','statut','actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  Commissions;
  Audiences;
  idAudience=-1;

  constructor(private service : AffairesConseilService, private router: Router) { }

  ngOnInit() {
    this.service.getAllAudience().subscribe(res=>{
      this.Audiences=res;
    })
  }

  onChangeofOptions(){
    this.getPoints(); 
  }

  async getPoints(){
    await this.service.getPointByAudience(this.idAudience)
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
