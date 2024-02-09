import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestionTypeMarcheService } from '../../Services/gestion-type-marche.service';

@Component({
  selector: 'kt-add-type-marche',
  templateUrl: './add-type-marche.component.html',
  styleUrls: ['./add-type-marche.component.scss']
})
export class AddTypeMarcheComponent implements OnInit {
  typeMarche={ 
    libelle:''
  }
  constructor(private service:GestionTypeMarcheService,private router: Router,) { }

  ngOnInit() {
  }
	onSubmit() {

	

		this.service.create(this.typeMarche).subscribe((data) => {
			console.log(data);

		
			this.router.navigate(["/parametrage/list-type-marche"]);
		
		});
	}
}
