import { Component, OnInit } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {
  idSession;
  session={"id":0,"mondat":{"id":0},"dateFinSession":null,"dateDebutSession":null,"type":"",
  "nomSession":"","statut":"","numSession":""};

  constructor(private service : AffairesConseilService, private router: Router,private activatedRoute: ActivatedRoute) { }
  
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idSession= params['id'];
     });
    this.service.getSessionById(this.idSession).subscribe(data=>{
      this.session=data;  
     })
  }

  EditPoints(){
    this.router.navigate(['/affaires-conseil/session-detail/point-list-session'], { queryParams: { id: this.session.id } })
  }

  EditMembres(){
    this.router.navigate(['/affaires-conseil/session-detail/mondat-detail'], { queryParams: { id: this.session.mondat.id } })
  }



}
