import { Component, OnInit } from '@angular/core';
import { BiensReservationService } from '../../shared/biens-reservation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-bien-reservatios-detail',
  templateUrl: './bien-reservatios-detail.component.html',
  styleUrls: ['./bien-reservatios-detail.component.scss']
})
export class BienReservatiosDetailComponent implements OnInit {
  constructor(private service : BiensReservationService, private activatedRoute: ActivatedRoute) { }
 reclam;
 bien={"objetDemandeAutorisation":"","typebiendemandeReservation":{"id":0,"libelle":""},
       "adresse":""}; 
 espaces;
 //variable not initialised
 /*bien:{

 }*/
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.reclam= params['reclam']; 
     });
     this.service.getbienById(this.reclam).subscribe(data => { 
       console.log(data)
     this.bien = data;

  });
  this.service.getEspaceByBien(this.reclam).subscribe(da => { 
    console.log(da)
    this.espaces=da;
});

}
}
