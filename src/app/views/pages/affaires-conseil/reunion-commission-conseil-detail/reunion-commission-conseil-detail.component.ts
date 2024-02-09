import { Component, OnInit } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-reunion-commission-conseil-detail',
  templateUrl: './reunion-commission-conseil-detail.component.html',
  styleUrls: ['./reunion-commission-conseil-detail.component.scss']
})
export class ReunionCommissionConseilDetailComponent implements OnInit {
  idReunion;
  reunion={"id":0,"commission":{"nomCommission":""},"session":{"nomSession":""},"heureFin":null,
  "heureDebut":null,"dateReunion":null,"libelleReunion":""};
  constructor(private service : AffairesConseilService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idReunion= params['id'];
     });
    this.service.getReunionById(this.idReunion).subscribe(data=>{
      this.reunion=data;  
     })
  }

  EditPoints(){
    this.router.navigate(['/affaires-conseil/reunion-commission-detail/points'], { queryParams: { id: this.idReunion } })
  }

  EditMembres(){
    this.router.navigate(['/affaires-conseil/reunion-commission-detail/presence'], { queryParams: { id: this.idReunion } })
  }

}
