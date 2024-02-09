import { Component, OnInit } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-decisions-point-edit',
  templateUrl: './decisions-point-edit.component.html',
  styleUrls: ['./decisions-point-edit.component.scss']
})
export class DecisionsPointEditComponent implements OnInit {

  decision={"id":0,"numDecision":"","decision":""};
  point={"id":0,"source":"","type":{"libelle":""}, "dateRealisation":null,"budget":0,"typeVote":"","objet":"",
  "statut":{"libelle":""},"pasVote":0,"voteNon":0,"voteOui":0,
  "observations":"","impacte":"","commission":{"nomCommission":""},
 "session":{"id":0}};
 idDecision;
 choix1=false;
  choix2=false;
  choix4=false;
  nomCommissions;
  resultatDecision={"id":0,"statut":"","resultat":"","decision":{"id":0}};
  statutResultat=["أنجز","لم ينجز","في طور الإنجاز"];

  constructor(private service : AffairesConseilService, 
    private router: Router,private activatedRoute: ActivatedRoute) { }

  

  ngOnInit() { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.idDecision= params['id'];
     });

     this.service.getdecisionById(this.idDecision).subscribe(res => {
     this.service.getCommByPoint(res.point.id).subscribe(data=>{
       this.nomCommissions=data;
     })
      this.decision=res;
      this.point=res.point;
      if(this.point.source=="داخلي"){
       this.choix1=true;
    }
    if(this.point.source=="المكتب"){
        this.choix2=true;
    }
    if(this.point.source=="مصدر آخر"){
      this.choix4=true;
    }
    })

    
  }

  send(){
    this.resultatDecision.decision.id=this.idDecision;
    this.service.sendresultat(this.resultatDecision).subscribe(data=>{
      console.log(data)
      this.router.navigate(['/affaires-conseil/decisions-points-list'])})
  }

}
