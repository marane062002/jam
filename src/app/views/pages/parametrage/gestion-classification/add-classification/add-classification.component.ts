import { Component, OnInit } from '@angular/core';
import { GestionClassificationService } from '../../Services/gestion-classification.service';
import { Router } from '@angular/router';
import { GestionQualificationService } from '../../Services/gestion-qualification.service';

@Component({
  selector: 'kt-add-classification',
  templateUrl: './add-classification.component.html',
  styleUrls: ['./add-classification.component.scss']
})
export class AddClassificationComponent implements OnInit {

  typeAo={ 
    libelle:'',
    qualificationAo: { id: 0},

  }
  qualificationAll
  constructor(private service:GestionClassificationService,private router: Router,private serviceQualififcation:GestionQualificationService) { }

  ngOnInit() {
    this.serviceQualififcation.getAll().then((data) => {
			this.qualificationAll = data;
		});
  }
	onSubmit() {

	

		this.service.create(this.typeAo).subscribe((data) => {
			console.log(data);

		
			this.router.navigate(["/parametrage/list-classification"]);
		
		});
	}
  selectedvalue(e){
    this.typeAo.qualificationAo.id=parseInt(e)
    
  }
}
