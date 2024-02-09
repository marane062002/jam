import { Component, OnInit } from '@angular/core';
import { GestionQualificationService } from '../../Services/gestion-qualification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.scss']
})
export class AddQualificationComponent implements OnInit {

  typeAo={ 
    libelle:''
  }
  constructor(private service:GestionQualificationService,private router: Router,) { }

  ngOnInit() {
  }
	onSubmit() {

	

		this.service.create(this.typeAo).subscribe((data) => {
			console.log(data);

		
			this.router.navigate(["/parametrage/list-qualification"]);
		
		});
	}
}
