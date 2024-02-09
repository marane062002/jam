import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';

@Component({
  selector: 'kt-evaluation-point-audience',
  templateUrl: './evaluation-point-audience.component.html',
  styleUrls: ['./evaluation-point-audience.component.scss']
})
export class EvaluationPointAudienceComponent implements OnInit {
  
  idAudience;
  audience;
  constructor(private service : AffairesConseilService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idAudience= params['id'];
     });
    this.service.getAudienceById(this.idAudience).subscribe(data=>{
      this.audience=data; 
      console.log(this.audience.session.mondat.id)
      console.log(data) 
     })
  }

  EvaluerPoints(){
    this.router.navigate(['/affaires-conseil/evaluation-points-audience/points'], { queryParams: { id: this.idAudience } })
  }

  AjouterPresence(){
    this.router.navigate(['/affaires-conseil/evaluation-points-audience/presence'], { queryParams: { id: this.idAudience ,idMondat: this.audience.session.mondat.id}})
  }

  AjouterRemarques(){
    this.router.navigate(['/affaires-conseil/evaluation-points-audience/remarques'], { queryParams: { id: this.idAudience } })
  }

}
