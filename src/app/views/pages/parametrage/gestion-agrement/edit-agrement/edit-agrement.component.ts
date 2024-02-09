import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionAgrementService } from '../../Services/gestion-agrement.service';
import { AoService } from '../../../shared/ao.service';

@Component({
  selector: 'kt-edit-agrement',
  templateUrl: './edit-agrement.component.html',
  styleUrls: ['./edit-agrement.component.scss']
})
export class EditAgrementComponent implements OnInit {
id

// agrement={ 
//   id:'',
//   agrement:'',
//   dateAgrement:'',
//   observation:''

// }
agrement 
observation
date
  constructor(private activatedRoute: ActivatedRoute,private service:AoService,private router: Router,) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
			// this.idConsultation = params["idC"];
		});
    this.service.getAgrementMarcheById(this.id).subscribe((res)=>{
      this.agrement=res.agrement
      
      this.observation=res.observation
      
      
      this.date = new Date(res.dateAgrement).toISOString();
      
    })
  }
  onSubmit() {
let agrement={
  id:this.id,
  agrement:this.agrement,
  observation:this.observation,
  dateAgrement:this.date
}
	

		this.service.editAgrementData(agrement).subscribe((data) => {
			console.log(data);

		
			this.router.navigate(["/parametrage/list-agrement"]);
		
		});
	}
} 
