import { Component, OnInit } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-decisions-point-form',
  templateUrl: './decisions-point-form.component.html',
  styleUrls: ['./decisions-point-form.component.scss']
})
export class DecisionsPointFormComponent implements OnInit {

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
  resultatDecision={"id":0,"statut":"","resultat":""};

  constructor(private service : AffairesConseilService, 
    private router: Router,private activatedRoute: ActivatedRoute) { }

  

  ngOnInit() { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.idDecision= params['id'];
     });

    

     this.service.getdecisionById(this.idDecision).subscribe(res => {
       this.service.getresultatByDecision(this.idDecision).subscribe(res1=>{
         console.log(res1)
         if(res1.length!=0){console.log("in here")
           this.resultatDecision=res1[0];}
        
       })
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

 

}
