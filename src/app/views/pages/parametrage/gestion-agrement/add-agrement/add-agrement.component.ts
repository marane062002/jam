import { Component, OnInit } from '@angular/core';
import { AoService } from '../../../shared/ao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-add-agrement',
  templateUrl: './add-agrement.component.html',
  styleUrls: ['./add-agrement.component.scss']
})
export class AddAgrementComponent implements OnInit {

  agrement={ 
    agrement:'',
    dateAgrement:'',
    observation:''

  }
  constructor(private service:AoService,private router: Router,) { }

  ngOnInit() {
  }
	onSubmit() {

	

		this.service.sendAgrementData(this.agrement).subscribe((data) => {
			console.log(data);

		
			this.router.navigate(["/parametrage/list-agrement"]);
		
		});
	}
}
