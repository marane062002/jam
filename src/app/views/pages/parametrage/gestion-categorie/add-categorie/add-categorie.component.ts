import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestionCategorieService } from '../../Services/gestion-categorie.service';

@Component({
  selector: 'kt-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {

  categorie={ 
    libelle:''
  }
  constructor(private service:GestionCategorieService,private router: Router,) { }

  ngOnInit() {
  }
	onSubmit() {

	

		this.service.create(this.categorie).subscribe((data) => {
			console.log(data);

		
			this.router.navigate(["/parametrage/list-categorie"]);
		
		});
	}
}
