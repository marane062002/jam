import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReparationServiceService } from '../../../../../../core/_base/layout/services/parcAuto/reparation-service.service';

@Component({
  selector: 'kt-details-reparation',
  templateUrl: './details-reparation.component.html',
  styleUrls: ['./details-reparation.component.scss']
})
export class DetailsReparationComponent implements OnInit {
  id:number;
  reparation:any;
  constructor(private  activatedRoute:ActivatedRoute,
    private reparationService :ReparationServiceService,) { }

  async ngOnInit() {
    await   this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
		});
    this.reparationService.getById(this.id).subscribe(res=>{
  this.reparation=res;
    })

  }

}
