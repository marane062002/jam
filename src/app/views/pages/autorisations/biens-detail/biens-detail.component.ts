import { Component, OnInit } from '@angular/core';
import { BiensService } from '../../shared/biens.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-biens-detail',
  templateUrl: './biens-detail.component.html',
  styleUrls: ['./biens-detail.component.scss']
})
export class BiensDetailComponent implements OnInit {

  constructor(private service : BiensService, private activatedRoute: ActivatedRoute) { }
 reclam;
 bien={"typeObjetReservation":{"id":0,"typeObjetAutorisation":""},"objetDemandeAutorisation":"","adresse":"",
};;
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

}}
