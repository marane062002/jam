import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';

@Component({
  selector: 'kt-affectation-point',
  templateUrl: './affectation-point.component.html',
  styleUrls: ['./affectation-point.component.scss']
})
export class AffectationPointComponent implements OnInit {
  
  idPoint;
  typesPoints;
  commissions;
  formData={"commission":{"id":0},"type":{"id":0},"session":{"id":0}};
  constructor(private service : AffairesConseilService , private router: Router ,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idPoint= params['id'];
     });

    this.service.getAllTypePoint().subscribe(data=>{
      this.typesPoints=data;
      console.log(data)
})
    this.service.getAllCommissionActuelles().subscribe(data=>{
    console.log(data)
    this.commissions=data;
    })

    this.service.getPointById(this.idPoint).subscribe(data=>{
    console.log(data)
    if(data.commission==null){
      data.commission={"nomCommission":""}
    }
    if(data.type==null){
      data.type={"libelle":""}
    }
    this.formData=data;
    })
  }

  send(){

    this.service.affecterPoint(this.formData).subscribe(data=>{
      this.router.navigate(['/affaires-conseil/session-detail/point-list-session'], { queryParams: { id: this.formData.session.id } })
 
    })
  }

}
