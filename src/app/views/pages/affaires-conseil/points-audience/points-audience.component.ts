import { Component, OnInit, ViewChild } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'kt-points-audience',
  templateUrl: './points-audience.component.html',
  styleUrls: ['./points-audience.component.scss']
})
export class PointsAudienceComponent implements OnInit {
  
  displayedColumns = ['id', 'objet', 'voteOui','voteNon','pasVote','numDecision','decision'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort; 
  idAudience;
  statuts;

  constructor(private service : AffairesConseilService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idAudience= params['id']; 
     });
    this.service.getPointByAudience(this.idAudience).subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      for(var i=0;i<this.dataSource.data.length;i++){
        this.getDecisoins(i);
        }
     
    });
   
  
  }

  getDecisoins(i){
   
    this.service.getdecisionByPoint(this.dataSource.data[i].id)
    .subscribe(data =>{ 
      console.log(data)
      this.dataSource.data[i].numDecision=data[0].numDecision;
      this.dataSource.data[i].decision=data[0].decision;
     })
    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  send(){
    var decisions=[];
    for(var i=0;i<this.dataSource.data.length;i++){
      decisions.push({"numDecision":this.dataSource.data[i].numDecision,
        "decision":this.dataSource.data[i].decision,
        "point":{"id":this.dataSource.data[i].id}})
    }
    this.service.sendDecisions(decisions).subscribe(res=>{
     console.log(res);
    })
    this.service.sendPoints1(this.dataSource.data).subscribe(res=>{
      this.router.navigate(['/affaires-conseil/evaluation-points-audience'], { queryParams: { id: this.idAudience } })
    })
  }

}
