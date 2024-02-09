import { Component, OnInit } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-remarques-audience',
  templateUrl: './remarques-audience.component.html',
  styleUrls: ['./remarques-audience.component.scss']
})
export class RemarquesAudienceComponent implements OnInit {
  
  idAudience;
  audience={"remarques":""};

  constructor(private service : AffairesConseilService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idAudience= params['id']; 
     });
     this.service.getAudienceById(this.idAudience).subscribe(res=>{
      this.audience=res;
     })    
  }

  send(){
    this.service.sendRemarqueAudience(this.audience).subscribe(res=>{
      this.router.navigate(['/affaires-conseil/evaluation-points-audience'], { queryParams: { id: this.idAudience } })
    })
  }

}
