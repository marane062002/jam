import { Component, OnInit } from '@angular/core';
import { GestionTypePieceJointService } from '../../Services/gestion-type-piece-joint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-add-type-piece-joint',
  templateUrl: './add-type-piece-joint.component.html',
  styleUrls: ['./add-type-piece-joint.component.scss']
})
export class AddTypePieceJointComponent implements OnInit {

  typeAo={ 
    libelle:''
  }
  constructor(private service:GestionTypePieceJointService,private router: Router,) { }

  ngOnInit() {
  }
	onSubmit() {

	

		this.service.create(this.typeAo).subscribe((data) => {
			console.log(data);

		
			this.router.navigate(["/parametrage/list-type-piece-joint"]);
		
		});
	}
}
