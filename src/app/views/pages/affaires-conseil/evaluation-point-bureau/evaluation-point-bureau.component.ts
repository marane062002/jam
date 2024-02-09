import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-evaluation-point-bureau',
  templateUrl: './evaluation-point-bureau.component.html',
  styleUrls: ['./evaluation-point-bureau.component.scss']
})
export class EvaluationPointBureauComponent implements OnInit {

  displayedColumns = ['id', 'session','objet', 'budget','dateRealisation','statut','actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  idSession;
  showEval;
  statutsPoints;
  typesPoints;
  commissions;
  formData={"session":{"id":0},"division":1,"statut":{"id":1,"libelle":""},"type":{},"commission":{}};
  constructor(private service : AffairesConseilService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idSession= params['id']; 
     });
     this.service.getStatutsPoint(3).subscribe(data=>{
      this.statutsPoints=data;
      console.log(data)
    })
     this.service.getPointValideDivisionAffaireConseil(this.idSession).subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      console.log(data)
     for(var i=0;i<data.length;i++){
        if(data[i].commission==null){
          data[i].commission={}
        }
        if(data[i].type==null){
          data[i].type={}
        }
      }
      this.paginator._intl.itemsPerPageLabel = 'مصفوفة لكل صفحة';
      this.paginator._intl.nextPageLabel = 'الصفحة التالية';
      this.paginator._intl.previousPageLabel = 'الصفحة السابقة';
      this.paginator._intl.lastPageLabel="الصفحة الأخيرة";
      this.paginator._intl.firstPageLabel="الصفحة الأولى";
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      console.log(this.dataSource.data)
     })
  }

  onClickEvaluer(row){
    console.log(row)
    this.formData=row;
    this.showEval=true;
  }

  validerEvaluation(){
    console.log(this.formData);
    console.log(this.dataSource.data);
    this.showEval=false;
  }

  send(){
    for(var i=0;i<this.dataSource.data.length;i++){
      if(this.dataSource.data[i].commission.id==null){
        this.dataSource.data[i].commission=null;
    }
    if(this.dataSource.data[i].type.id==null){
      this.dataSource.data[i].type=null;
      }
  }
  this.service.sendPoints(this.dataSource.data).subscribe(data=>{
    this.router.navigate(['/affaires-conseil/session-detail/point-list-session'], { queryParams: { id: this.idSession } })
 
  })
}

applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

}
