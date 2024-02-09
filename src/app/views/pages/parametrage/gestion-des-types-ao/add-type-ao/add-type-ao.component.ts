import { Component, OnInit } from '@angular/core';
import { GestionDesTypesAoService } from '../../Services/gestion-des-types-ao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-add-type-ao',
  templateUrl: './add-type-ao.component.html',
  styleUrls: ['./add-type-ao.component.scss']
})
export class AddTypeAoComponent implements OnInit {
  typeAo={ 
    libelle:''
  }
  constructor(private service:GestionDesTypesAoService,private router: Router,) { }

  ngOnInit() {
  }
	onSubmit() {

	

		this.service.create(this.typeAo).subscribe((data) => {
			console.log(data);

		
			this.router.navigate(["/parametrage/list-type-ao"]);
		
		});
	}
}
