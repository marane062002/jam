import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { AffairesConseilModule } from '../affaires-conseil.module';

@Component({
  selector: 'kt-point-edit',
  templateUrl: './point-edit.component.html',
  styleUrls: ['./point-edit.component.scss']
})
export class PointEditComponent implements OnInit {

  idPoint;
  typesPoints;
  statutsPoints;
  commissions;
  divisions=[{"id":1,"libelle":"division 1"},{"id":2,"libelle":"division 2"}];
  typesVote=["أغلبية مطلقة","أغلبية عادية","غير معني"];
  formData={ "id":0,"source":"","description":"","type":{"libelle":""}, "dateRealisation":null,"budget":0,
  "typeVote":"","objet":"","session":{"id":0,"nomSession":""},"division":1,"statut":{"id":1,"libelle":""},"commission":{},"pasVote":0,"voteNon":0,"voteOui":0,
  "observations":"","impacte":""};
 
 

  constructor(private service : AffairesConseilService , private router: Router ,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idPoint= params['id'];
     });

     this.service.getStatutsPoint(2).subscribe(data=>{
       this.statutsPoints=data;
       console.log(data)
     })
     this.service.getAllTypePoint().subscribe(data=>{
             this.typesPoints=data;
             console.log(data)
     })
     this.service.getAllCommissionActuelles().subscribe(data=>{
      console.log(data)
      this.commissions=data;
   })

   this.service.getPointById(this.idPoint).subscribe(data=>{
     this.formData=data;
   })
  }

  send(){
    this.service.editPoint(this.formData).subscribe(data=>{
      this.router.navigate(['/affaires-conseil/session-detail/point-list-session'], { queryParams: { id: this.formData.session.id } })
 
    })
  }

}
