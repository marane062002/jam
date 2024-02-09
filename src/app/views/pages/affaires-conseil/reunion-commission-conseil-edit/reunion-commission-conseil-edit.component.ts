import { Component, OnInit } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-reunion-commission-conseil-edit',
  templateUrl: './reunion-commission-conseil-edit.component.html',
  styleUrls: ['./reunion-commission-conseil-edit.component.scss']
})
export class ReunionCommissionConseilEditComponent implements OnInit {

  idReunion;
  formData={"session":{"id":0},"commission":{"id":0},heureDebut:null,heureFin:null,
  "dateReunion":null,"libelleReunion":""}; 
  timeDebutReunion ={hour:10 , minute:10};
  timeFinReunion ={hour:10 , minute:10};
  sessionIds=[];
  commissions={};
  constructor(private service : AffairesConseilService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idReunion= params['id'];
     });
     this.service.getSessionOperationnelle().subscribe(data=>{
      for(var i=0;i<data.length ; i++){
        this.sessionIds.push(data[i])
      }
    })
    this.service.getAllCommissionActuelles().subscribe(data=>{
      console.log(data)
      this.commissions=data;
    })
    this.service.getReunionById(this.idReunion).subscribe(data=>{
      this.formData=data; 
      var m=new Date(data.heureDebut);
      var m1=new Date(data.heureFin);
      this.timeDebutReunion={hour:m.getHours(),minute:m.getMinutes()};
      this.timeFinReunion={hour:m1.getHours(),minute:m1.getMinutes()};
     })
     
  }

  send(){
    this.formData.heureDebut=new Date('2000/12/12'+' '+this.timeDebutReunion.hour+':'+this.timeDebutReunion.minute);
    this.formData.heureFin=new Date('2000/12/12'+' '+this.timeFinReunion.hour+':'+this.timeFinReunion.minute);
  this.service.editReunion(this.formData)
    .subscribe((resfork) => { 
      this.router.navigate(['/affaires-conseil/reunion-commission-list'] )
    })
 
  }

}
